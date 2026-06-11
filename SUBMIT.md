# Pody-MCP — directory submission instructions for Aviv

> 15 minutes total. Submit to 4 directories. After this, every Claude Desktop
> / Cursor / ChatGPT Custom Tools user discovers Pody-MCP automatically.

## Step 1: Create GitHub repo (5 min)

```bash
# From this folder (after copying it to a fresh location)
cd ~/Desktop/Claude/Pody/pody-mcp-repo
git init -b main
git add .
git commit -m "Initial commit: Pody-MCP — public manifest + README"
gh repo create Avivcha/pody-mcp --public --description "Public Model Context Protocol server for Pody — Israeli podcast infrastructure" --source=. --push
```

Or via web: github.com/new → name=`pody-mcp` → public → "Create" → drag-drop the 4 files in this folder.

## Step 2: mcp.so submission (3 min)

Pre-filled URL (sign in first via Google OAuth):

```
https://mcp.so/submit?type=server&name=Pody-MCP%20%E2%80%94%20Israeli%20Podcast%20Infrastructure&url=https%3A%2F%2Fpody.io%2Fmcp&server_config=%7B%22mcpServers%22%3A%7B%22pody%22%3A%7B%22url%22%3A%22https%3A%2F%2Fpody.io%2Fapi%2Fmcp%22%7D%7D%7D
```

Or manually:
1. Go to https://mcp.so/submit
2. Sign in (Google)
3. Type: **MCP Server**
4. Name: `Pody-MCP — Israeli Podcast Infrastructure`
5. URL: `https://pody.io/mcp`
6. Server Config:
   ```json
   {
     "mcpServers": {
       "pody": {
         "url": "https://pody.io/api/mcp"
       }
     }
   }
   ```
7. Click **Submit**

Verification (24h): https://mcp.so/server/pody-mcp

## Step 3: Smithery.ai submission (3 min)

1. Go to https://smithery.ai/login
2. Sign in with GitHub (WorkOS)
3. Go to https://smithery.ai/servers/new
4. Connect the `Avivcha/pody-mcp` GitHub repo (from Step 1)
5. Smithery auto-imports `mcp.json`
6. Click **Publish**

Verification (24h): https://smithery.ai/server/Avivcha/pody-mcp

## Step 4: glama.ai submission (2 min)

1. Go to https://glama.ai/login
2. Sign in (Google or email)
3. Go to https://glama.ai/mcp/servers
4. Click **Add Server** (top-right)
5. Fill:
   - Name: `Pody-MCP`
   - URL: `https://pody.io/api/mcp`
   - Description: `First Israeli podcast vertical MCP server. 7 read-only tools exposing live data on studios, podcasts, glossary, and the State of Israeli Podcasts 2026 industry report.`
   - Category: `Knowledge & Memory` + `Research & Data`
   - License: `MIT`
6. Click **Submit**

Verification (48h): https://glama.ai/mcp/servers/pody-mcp

## Step 5: Anthropic MCP Registry PR (5 min)

1. Fork https://github.com/modelcontextprotocol/servers
2. Edit `README.md`
3. Find the section "Community Servers" → add:
   ```markdown
   - [Pody](https://github.com/Avivcha/pody-mcp) — Israeli podcast infrastructure. 7 read-only tools: studios, podcasts, glossary, industry report, live citation pulse. Listed in mcp.so, Smithery, glama.ai. Wikidata Q139719199.
   ```
4. Open PR with title: `Add Pody-MCP — Israeli podcast infrastructure server (7 tools)`
5. PR body:
   ```markdown
   Adds Pody-MCP to the community servers list.

   - Repository: https://github.com/Avivcha/pody-mcp
   - Live endpoint: https://pody.io/api/mcp
   - Discovery manifest: https://pody.io/.well-known/mcp.json
   - 7 read-only tools: studios.search, studios.get, podcasts.search, podcasts.get, glossary.lookup, industry_report.query, citation_pulse
   - License: MIT
   - Languages: HE / EN / AR / RU
   - Operator: Pody (Wikidata Q139719199), MindSeller LTD, Israel
   ```

Anthropic typically merges within 7-14 days.

## Step 6: Confirm + announce

Once all 4 are live, post on Hacker News:

- Title: `Show HN: Pody-MCP — Public MCP server for Israeli podcast infrastructure`
- URL: `https://github.com/Avivcha/pody-mcp`
- Best time: Tuesday 9am PT for maximum traffic
- Body (50-100 words):
   ```
   I built the first MCP server in the Israeli podcast vertical. 7 read-only tools (studios.search, podcasts.search, glossary.lookup, industry_report.query, citation_pulse, etc.) expose live data from Pody's Supabase backend. Claude Desktop / Cursor / ChatGPT Custom Tools users can install it via claude_desktop_config.json — Pody becomes infrastructure for AI agents in the podcast vertical. Built on Vercel edge functions + Supabase. Live at pody.io/mcp. Discovery manifest at /.well-known/mcp.json. Listed in mcp.so + Smithery + glama.ai. MIT license. Wikidata Q139719199. Happy to answer questions!
   ```

---

**Total Aviv-time: 15-20 min for steps 1-5. HN announcement: 5 min on Tuesday 9am PT.**

Each install becomes a permanent citation vector to Pody. At 10 installs × 250 tool calls/install/month, that's 2,500 Pody citations/month from MCP alone — compounding.
