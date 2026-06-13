# Publish to npm + Anthropic MCP Registry

> **Status:** All artifacts ready (`package.json`, `bin/pody-mcp.js`, `server.json`, `mcp.json`, README, LICENSE).
> **Aviv: 10 minutes total to publish to both npm and the official Anthropic registry.**

## Step 1: Publish to npm (3 min)

The package is a thin stdio→HTTPS proxy. It doesn't host the real MCP server — that lives at https://pody.io/api/mcp. The npm package is what the Anthropic Registry indexes.

```bash
cd ~/Desktop/Claude/Pody/pody-mcp-repo
chmod +x bin/pody-mcp.js

# Log in to npm (or sign up at https://www.npmjs.com/signup)
npm login
# Username: avivcharuvi (or whatever you choose)
# Password: ...
# Email: aviv@pody.io

# Publish — scoped public package
npm publish --access public
```

Verify at: https://www.npmjs.com/package/@avivcharuvi/pody-mcp

## Step 2: Install mcp-publisher CLI (1 min)

```bash
# macOS via Homebrew
brew install mcp-publisher

# Or direct binary download (no brew):
curl -L "https://github.com/modelcontextprotocol/registry/releases/latest/download/mcp-publisher_$(uname -s | tr '[:upper:]' '[:lower:]')_$(uname -m | sed 's/x86_64/amd64/;s/aarch64/arm64/').tar.gz" | tar xz mcp-publisher && sudo mv mcp-publisher /usr/local/bin/

# Verify
mcp-publisher --version
```

## Step 3: Authenticate with GitHub (1 min)

The Anthropic registry verifies that you own the GitHub repo referenced in `server.json` (https://github.com/Avivcha/pody-mcp).

```bash
cd ~/Desktop/Claude/Pody/pody-mcp-repo
mcp-publisher login github
# A browser tab opens → click Authorize → done
```

## Step 4: Publish to Anthropic Registry (1 min)

```bash
cd ~/Desktop/Claude/Pody/pody-mcp-repo
mcp-publisher publish
```

The CLI reads `server.json` from the current directory, sends it to the registry, and waits for verification (~30 seconds).

Verify at: https://registry.modelcontextprotocol.io/v0/servers/io.github.avivcha/pody-mcp

## Step 5: Update README and announce (4 min)

After both publications go live, add the install instructions to the public README. Edit `README.md` in this repo to include:

```markdown
## Install via npm (any MCP-compatible client)

```bash
npm install -g @avivcharuvi/pody-mcp
```

Then in `claude_desktop_config.json` (Claude Desktop) or equivalent:

```json
{
  "mcpServers": {
    "pody": {
      "command": "npx",
      "args": ["@avivcharuvi/pody-mcp"]
    }
  }
}
```

Restart your client; Pody tools appear automatically.
```

Commit + push:

```bash
git add README.md
git commit -m "docs: add npm install instructions after publication"
git push
```

## Step 6: Cross-link from /press + /llms-full.txt (optional, 2 min)

After both publications go live, the Pody main repo can advertise the npm install path. This requires editing the main Pody repo, not pody-mcp-repo. I (Claude) can do this autonomously once you confirm the npm package is published — just send me "npm done" and I'll update the Pody main repo's /press page and llms-full.txt to reference `@avivcharuvi/pody-mcp` alongside the existing `https://pody.io/api/mcp`.

---

## What this unlocks

After Step 4:
- `npx @avivcharuvi/pody-mcp` works from any terminal
- Listed in https://registry.modelcontextprotocol.io
- AI-installable via any tool that reads the Anthropic registry
- Glama, Smithery, mcp.so will all auto-discover the npm-registered version on their next sync (24-48h)

After Step 5:
- README reflects current install paths
- GitHub stars grow as MCP discovery traffic lands

After Step 6:
- AI engines (Claude, ChatGPT, Perplexity, Gemini) reading /llms-full.txt see the npm package as an alternative to the HTTPS endpoint — meaning install velocity is no longer gated on a single hosting URL.

---

## What's already done before this

- ✅ pody-mcp-repo created at github.com/Avivcha/pody-mcp
- ✅ mcp.so submission (review queue)
- ✅ glama.ai submission (review queue)
- ✅ Smithery.ai LIVE PUBLIC at smithery.ai/server/avivcharuvi008/pody-mcp
- ✅ All files prepared for npm publish + Anthropic registry

What's blocking final 100% completion is just YOUR identity at npm + GitHub OAuth via the mcp-publisher CLI. Both prompts. ~10 min total.
