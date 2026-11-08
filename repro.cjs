// yarn install && yarn node repro.cjs
// Yarn 4 PnP with its global cache (the default): packages live outside the project.
const path = require('node:path')
const { rspack } = require('@rspack/core')

// a module of a package in Yarn's global cache with a bare import (`@tanstack/history`, line 13)
const target = require.resolve('@tanstack/router-core').replace(/cjs\/index\.cjs$/, 'esm/router.js')
console.log('rspack', require('@rspack/core/package.json').version, '| target', target)

const compiler = rspack({
  mode: 'development',
  context: __dirname,
  entry: './src/index.js',
  output: { path: path.join(__dirname, 'dist') },
  devtool: false,
})
let n = 0
const watching = compiler.watch({}, (err, stats) => {
  n++
  const errors = err ? [String(err)] : stats.compilation.errors.map((e) => e.message.split('\n')[0])
  console.log(`compilation ${n}:`, errors.length ? errors.join(' / ') : 'ok')
  if (n === 1) {
    // as if that file changed: the next compilation builds it again, and nothing else
    watching.invalidateWithChangesAndRemovals(new Set([target]), new Set())
  } else {
    watching.close(() => {})
  }
})
