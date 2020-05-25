# Custom NextJS build demo for experimentation.

This repo is designed as a demonstration of a Next Js driven "multi-app" infrastructure, w/ custom Koa server. Meaning it uses the code splitting behavior of Next js to host multiple apps as pages entry points.

## With Apollo

Example app found at route `/example/apollo`
Designed to demonstrated a page leveraging an Apollo Client wrapper, using a Github API as an example.

### Set-Up instructions

1. Add a `.env` file with `GITHUB_GRAPH_API_TOKEN=` definition.
2. Follow instructions here to get the Gihub token for the GraphQL API
