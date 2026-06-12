# Pinned daemon contract

`openapi.json` is the inter-repo contract with the cruxible-core daemon, fetched from
`http://127.0.0.1:8119/openapi.json` while the daemon ran **cruxible-core commit `d2d9f8e`**.

TypeScript types (`src/api/generated/`) and MSW mocks are generated from this file —
never hand-written. To pick up a contract change:

```sh
# daemon must be running; token comes from your shell env
curl -s -H "Authorization: Bearer $CRUXIBLE_SERVER_BEARER_TOKEN" \
  http://127.0.0.1:8119/openapi.json | python3 -m json.tool > api/openapi.json
pnpm gen:api
```

Update the pinned commit hash above in the same change. Contract drift is supposed to
show up as a regeneration diff in review, not as a runtime surprise.
