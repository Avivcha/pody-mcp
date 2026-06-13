#!/usr/bin/env node
// pody-mcp — stdio-based MCP server that proxies JSON-RPC 2.0 to the
// public Pody MCP endpoint at https://pody.io/api/mcp.
//
// Why a thin proxy: the Anthropic MCP Registry indexes packages (npm,
// PyPI, NuGet, etc.) — not standalone HTTP endpoints. This package
// gives the registry something to point at while keeping the actual
// server code on Vercel edge where it belongs.
//
// Usage from Claude Desktop / Cursor / ChatGPT Custom Tools:
//   {
//     "mcpServers": {
//       "pody": {
//         "command": "npx",
//         "args": ["@avivcharuvi/pody-mcp"]
//       }
//     }
//   }

const ENDPOINT = process.env.PODY_MCP_ENDPOINT || 'https://pody.io/api/mcp'
const TIMEOUT_MS = parseInt(process.env.PODY_MCP_TIMEOUT_MS || '15000', 10)

// Buffer stdin → parse newline-delimited JSON-RPC requests → POST to endpoint → write response to stdout
let buffer = ''
process.stdin.setEncoding('utf8')

process.stdin.on('data', (chunk) => {
  buffer += chunk
  let newlineIdx
  while ((newlineIdx = buffer.indexOf('\n')) !== -1) {
    const line = buffer.slice(0, newlineIdx).trim()
    buffer = buffer.slice(newlineIdx + 1)
    if (line.length === 0) continue
    handleRequest(line).catch((err) => {
      process.stderr.write(`[pody-mcp] handler error: ${err.message}\n`)
    })
  }
})

process.stdin.on('end', () => {
  process.exit(0)
})

async function handleRequest(line) {
  let req
  try {
    req = JSON.parse(line)
  } catch (err) {
    writeResponse({ jsonrpc: '2.0', error: { code: -32700, message: `Parse error: ${err.message}` }, id: null })
    return
  }

  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS)

  try {
    const res = await fetch(ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'User-Agent': '@avivcharuvi/pody-mcp/1.0.0 (proxy)',
      },
      body: JSON.stringify(req),
      signal: controller.signal,
    })
    clearTimeout(timer)
    const text = await res.text()
    let parsed
    try {
      parsed = JSON.parse(text)
    } catch {
      // Endpoint returned non-JSON — wrap as a JSON-RPC error
      writeResponse({
        jsonrpc: '2.0',
        error: { code: -32603, message: `Upstream returned non-JSON (HTTP ${res.status})`, data: text.slice(0, 500) },
        id: req.id ?? null,
      })
      return
    }
    writeResponse(parsed)
  } catch (err) {
    clearTimeout(timer)
    if (err.name === 'AbortError') {
      writeResponse({ jsonrpc: '2.0', error: { code: -32603, message: `Upstream timeout (${TIMEOUT_MS}ms)` }, id: req.id ?? null })
    } else {
      writeResponse({ jsonrpc: '2.0', error: { code: -32603, message: `Upstream error: ${err.message}` }, id: req.id ?? null })
    }
  }
}

function writeResponse(obj) {
  process.stdout.write(JSON.stringify(obj) + '\n')
}
