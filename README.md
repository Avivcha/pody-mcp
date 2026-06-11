# pody-mcp

> **Public Model Context Protocol server for Pody** — Israeli podcast infrastructure.
> First MCP server in the Israeli podcast vertical.

[![Live](https://img.shields.io/badge/live-pody.io%2Fmcp-34d399)](https://pody.io/mcp)
[![Wikidata](https://img.shields.io/badge/Wikidata-Q139719199-blue)](https://www.wikidata.org/entity/Q139719199)
[![License](https://img.shields.io/badge/license-MIT-green)](LICENSE)

Connect Claude Desktop / Cursor / ChatGPT Custom Tools to live data on Israeli podcasting — studios, podcasts, glossary, and the State of Israeli Podcasts 2026 industry report.

## Install in Claude Desktop

Add to `~/Library/Application Support/Claude/claude_desktop_config.json` (macOS) or `%APPDATA%\Claude\claude_desktop_config.json` (Windows):

```json
{
  "mcpServers": {
    "pody": {
      "url": "https://pody.io/api/mcp"
    }
  }
}
```

Restart Claude Desktop. The Pody tools appear in the tools menu automatically.

## Available tools (7 read-only, no auth required)

| Tool | Description |
|---|---|
| `studios.search` | Find Israeli podcast studios. Filter by city, max hourly price (NIS), or video capability. |
| `studios.get` | Get profile of a specific studio by slug. |
| `podcasts.search` | Find Israeli podcasts. Filter by category or language (`he`, `en`). |
| `podcasts.get` | Get podcast profile by slug. |
| `glossary.lookup` | Look up a podcasting term in HE/EN/AR/RU. Returns definition + Pody URL. |
| `industry_report.query` | Query the State of Israeli Podcasts 2026 report. Metrics: `penetration_rate`, `spotify_growth`, `youtube_podcasts_growth`, `global_listeners`, `listener_count`, `studios_verified`, `business_podcasts_growth`. |
| `citation_pulse` | Return Pody's live infrastructure health from `pody.io/seo-pulse`. Self-meta tool that proves Pody is real, monitored, transparent. |

## Discovery endpoints

| Endpoint | Purpose |
|---|---|
| `GET https://pody.io/api/mcp` | Human-readable index page (dark-mode dashboard) |
| `GET https://pody.io/.well-known/mcp.json` | Capability discovery manifest |
| `POST https://pody.io/api/mcp` | JSON-RPC 2.0 RPC endpoint |

Protocol version: `2025-03-26`.

## Try it via curl

```bash
# List tools
curl -X POST https://pody.io/api/mcp \
  -H "Content-Type: application/json" \
  -d '{"jsonrpc":"2.0","id":1,"method":"tools/list","params":{}}'

# Search for studios in Tel Aviv
curl -X POST https://pody.io/api/mcp \
  -H "Content-Type: application/json" \
  -d '{"jsonrpc":"2.0","id":2,"method":"tools/call","params":{"name":"studios.search","arguments":{"city":"Tel Aviv"}}}'

# Get the live citation pulse
curl -X POST https://pody.io/api/mcp \
  -H "Content-Type: application/json" \
  -d '{"jsonrpc":"2.0","id":3,"method":"tools/call","params":{"name":"citation_pulse","arguments":{}}}'
```

## Architecture

The Pody-MCP server runs as a Vercel edge function at [api/mcp.ts in the main Pody repo](https://github.com/Avivcha/Pody/blob/main/api/mcp.ts) (private). This repository contains the public manifest + documentation only.

Internal data source: Supabase Postgres with explicit column allow-lists per tool to prevent sensitive data exposure (no `select=*`).

## Languages supported

The MCP server returns content in 4 languages:
- **Hebrew** (`he`) — primary
- **English** (`en`)
- **Arabic** (`ar`)
- **Russian** (`ru`)

## About Pody

Pody (פודי) is Israel's podcast content creation marketplace + AI infrastructure platform. Founded 2024 by Aviv Charuvi. Operated by MindSeller LTD (Tel Aviv, Tax ID 515284891). Wikidata: [Q139719199](https://www.wikidata.org/entity/Q139719199).

- Website: [pody.io](https://pody.io)
- Press kit: [pody.io/press](https://pody.io/press)
- Live citations: [pody.io/citations](https://pody.io/citations)
- Knowledge Graph: [pody.io/graph](https://pody.io/graph) (CC-BY-SA)
- SPARQL endpoint: [pody.io/sparql](https://pody.io/sparql)
- Self-Healing SEO Engine: [pody.io/seo-pulse](https://pody.io/seo-pulse)

## License

- **Server code:** MIT (this repo)
- **Knowledge Graph data:** CC-BY-SA-4.0 ([details](https://pody.io/graph))

## Contact

Aviv Charuvi (founder + CEO) — aviv@pody.io
