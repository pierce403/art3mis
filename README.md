# art3mis
repo for the art3mis lunar governance experiment

## Cloudflare publishing

Production uses native Cloudflare Git builds from `main`. Run `npm ci` and
`npm run check:deploy` to validate the explicit public assets directory. The
build command is `npm run build`; the deploy command is `npm run deploy`.
Cloudflare holds deployment credentials. GitHub Pages and source history remain
recovery sources. The build revision is at `/.well-known/cloudflare-build.json`.
