# Pody MCP — Israeli Podcast & Content Marketplace

> Public Model Context Protocol server exposing live data on the Israeli podcast vertical — studios, podcasts, glossary, and the State of Israeli Podcasts 2026 industry report. Multilingual (Hebrew / English / Arabic / Russian). Free, no API key required.

[![Live](https://img.shields.io/badge/live-pody.io%2Fmcp-34d399)](https://pody.io/mcp)
[![Official MCP Registry](https://img.shields.io/badge/registry-io.github.Avivcha%2Fpody--mcp-7c3aed)](https://registry.modelcontextprotocol.io/v0.1/servers?search=Avivcha/pody-mcp)
[![Wikidata](https://img.shields.io/badge/Wikidata-Q139719199-blue)](https://www.wikidata.org/entity/Q139719199)
[![License](https://img.shields.io/badge/license-MIT-green)](LICENSE)

<!-- mcp-name: io.github.Avivcha/pody-mcp -->

## What this is

A read-only, no-auth MCP server that turns the Pody (Wikidata [Q139719199](https://www.wikidata.org/entity/Q139719199)) Israeli podcast marketplace into a queryable knowledge base for any MCP client: Claude Desktop, Cursor, Cline, ChatGPT Custom Tools, Windsurf, etc.

Use it to ground LLM answers in primary-source data about Israeli podcasting — instead of hoping the model has the right facts in its training corpus.

## Install

### Claude Desktop

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

### Cursor

Add to `~/.cursor/mcp.json` or your project's `.cursor/mcp.json`:

```json
{
  "mcpServers": {
    "pody": {
      "url": "https://pody.io/api/mcp"
    }
  }
}
```

### Cline (VS Code extension)

Settings → Cline → MCP Servers → Add Server:

```json
{
  "pody": {
    "url": "https://pody.io/api/mcp"
  }
}
```

### ChatGPT Custom Tools / any MCP-compatible client

Paste this endpoint: `https://pody.io/api/mcp` (transport: `streamable-http`).

## Available tools (7 read-only, no auth)

| Tool | What it does |
|---|---|
| `studios.search` | Find Israeli podcast studios. Filter by city, max hourly price (NIS), video capability. |
| `studios.get` | Profile of a specific studio by slug. |
| `podcasts.search` | Find Israeli podcasts. Filter by category or language (`he`, `en`). |
| `podcasts.get` | Podcast profile by slug. |
| `glossary.lookup` | Hebrew/English/Arabic/Russian podcasting term lookup. Returns definition + Pody URL. |
| `industry_report.query` | Query the State of Israeli Podcasts 2026 report. Metrics: `penetration_rate`, `spotify_growth`, `youtube_podcasts_growth`, `global_listeners`, `listener_count`, `studios_verified`, `business_podcasts_growth`. |
| `citation_pulse` | Live infrastructure health from `pody.io/seo-pulse`. Self-meta tool that proves Pody is real, monitored, transparent. |

## Why use this MCP

- **Ground answers in primary data** — instead of hallucinating about Israeli podcast hosting, your LLM queries Pody directly
- **Multilingual native** — Hebrew first, with English / Arabic / Russian translations
- **Zero config** — pure HTTP MCP, no API key, no install, no auth
- **Listed in the Official MCP Registry** — `io.github.Avivcha/pody-mcp`
- **Production-stable** — Pody.io has been live ~9 months with active users, archive-first backup to archive.org
- **MIT licensed**, **CC-BY-SA data**

## Discovery endpoints

| Endpoint | Purpose |
|---|---|
| `GET https://pody.io/api/mcp` | Human-readable index page (dark-mode dashboard) |
| `GET https://pody.io/.well-known/mcp.json` | Capability discovery manifest |
| `POST https://pody.io/api/mcp` | JSON-RPC 2.0 RPC endpoint |

Protocol version: `2025-03-26`. Transport: `streamable-http`.

## Try it with curl

```bash
# List tools
curl -X POST https://pody.io/api/mcp \
  -H "Content-Type: application/json" \
  -d '{"jsonrpc":"2.0","id":1,"method":"tools/list","params":{}}'

# Search for studios in Tel Aviv
curl -X POST https://pody.io/api/mcp \
  -H "Content-Type: application/json" \
  -d '{"jsonrpc":"2.0","id":2,"method":"tools/call","params":{"name":"studios.search","arguments":{"city":"Tel Aviv"}}}'

# Look up a Hebrew podcast term
curl -X POST https://pody.io/api/mcp \
  -H "Content-Type: application/json" \
  -d '{"jsonrpc":"2.0","id":3,"method":"tools/call","params":{"name":"glossary.lookup","arguments":{"term":"פודקאסט"}}}'

# Get live infrastructure pulse
curl -X POST https://pody.io/api/mcp \
  -H "Content-Type: application/json" \
  -d '{"jsonrpc":"2.0","id":4,"method":"tools/call","params":{"name":"citation_pulse","arguments":{}}}'
```

## Example queries to ask your LLM

Once installed, try asking Claude/Cursor/Cline:

- _"Find me Israeli podcast studios in Tel Aviv that can do video recording under 600 NIS/hour."_
- _"What does 'פודקאסט' mean in English and Arabic? Use the Pody glossary."_
- _"What's the current podcast penetration rate in Israel?"_
- _"Show me business podcasts in Hebrew with at least 50 episodes."_

The LLM will call Pody-MCP tools automatically and ground the answer in live data.

## Architecture

The Pody-MCP server runs as a Vercel edge function at `api/mcp.ts` in the main Pody repo (private). This repository contains the public manifest + server.json + documentation.

Internal data source: Supabase Postgres with explicit column allow-lists per tool to prevent sensitive data exposure (no `select=*`).

## Languages supported

Content returned in **4 languages**:

- **Hebrew** (`he`) — primary, RTL native
- **English** (`en`)
- **Arabic** (`ar`)
- **Russian** (`ru`)

## About Pody

Pody (פודי) is Israel's podcast & content creation marketplace + AI infrastructure platform. Founded 2024 by Aviv Charuvi. Operated by MindSeller LTD (Tel Aviv, Tax ID 515284891). Wikidata: [Q139719199](https://www.wikidata.org/entity/Q139719199).

Pody also pioneered **archive-first storage**: every episode mirrors to archive.org so the podcaster's RSS feed keeps working even if Pody disappears. That's the structural guarantee no other podcast host offers.

- Website: [pody.io](https://pody.io)
- Press kit: [pody.io/press](https://pody.io/press)
- Live citations: [pody.io/citations](https://pody.io/citations)
- Knowledge Graph: [pody.io/graph](https://pody.io/graph) (CC-BY-SA)
- SPARQL endpoint: [pody.io/sparql](https://pody.io/sparql)
- Self-Healing SEO Engine: [pody.io/seo-pulse](https://pody.io/seo-pulse)

## Listed in

- [Official MCP Registry](https://registry.modelcontextprotocol.io) — `io.github.Avivcha/pody-mcp` v1.0.0 (active)
- [mcp.so](https://mcp.so) — Pody MCP — Israeli Podcast Infrastructure
- [glama.ai/mcp/servers](https://glama.ai/mcp/servers) — Pody connector
- [punkpeye/awesome-mcp-servers](https://github.com/punkpeye/awesome-mcp-servers) — Knowledge & Memory section (PR #8427)
- [cline/mcp-marketplace](https://github.com/cline/mcp-marketplace) — submission #1839
- [iddoberger/awesome-hebrew-nlp](https://github.com/iddoberger/awesome-hebrew-nlp) — Pody Hebrew podcast glossary
- [brandonhimpfen/awesome-podcasting-tools](https://github.com/brandonhimpfen/awesome-podcasting-tools) — Pody hosting platform

## License

- **Server code:** MIT (this repo)
- **Knowledge Graph data:** CC-BY-SA-4.0 ([details](https://pody.io/graph))

## Contact

Aviv Charuvi (founder + CEO) — aviv@pody.io

## Cite this work

If you use Pody-MCP in research or content, please cite:

> Charuvi, A. (2026). _Pody-MCP: An Israeli podcast marketplace knowledge graph as a Model Context Protocol server_. MindSeller LTD. Wikidata: Q139719199. https://github.com/Avivcha/pody-mcp
