# Rspack + Yarn PnP global cache: a rebuilt package module can't resolve its bare imports

Issue: (link once filed)

Yarn 4 PnP with the global cache (Yarn's default): packages live in `~/.yarn/berry/cache`, outside the project.

```sh
yarn install
yarn node repro.cjs
```

```
compilation 1: ok
compilation 2:   × Module not found: Can't resolve '@tanstack/history' in '~/.yarn/berry/cache/@tanstack-router-core-npm-1.171.39-9d9795bba8-10c0.zip/node_modules/@tanstack/router-core/dist/esm'
```

Control (project-local cache):

```sh
YARN_ENABLE_GLOBAL_CACHE=false yarn install
yarn node repro.cjs   # both compilations ok
```

No Yarn on the path: `npx @yarnpkg/cli-dist@4.18.1 install` and `npx @yarnpkg/cli-dist@4.18.1 node repro.cjs`.
