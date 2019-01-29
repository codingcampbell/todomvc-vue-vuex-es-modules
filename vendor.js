// Copies vendor code out of node_modules into the tree.
// After this is done, you can simply open index.html in your browser and develop
// like the good ol' days: save and refresh.
//
// Run this with `npm run vendor` (or at least make sure you run `npm install` before running this manually)

const fs = require('fs');
const util = require('util');

const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);

const mkdir = dir => new Promise(resolve => fs.mkdir(dir, err => {
  if (err) {
    console.warn('WARN: mkdir failed.', err.message || err);
  }

  resolve();
}));

const cp = (frm, dst) => readFile(frm)
  .then(buf => writeFile(dst, buf))
  .then(
    () => console.log(`Copied: ${frm} -> ${dst}`),
    err => console.error(`ERROR copying ${frm}:`, err)
  );

Promise.all([
  mkdir('js/vendor'),
  mkdir('css/vendor'),
]).then(() => Promise.all([
  cp('node_modules/todomvc-app-css/index.css', 'css/vendor/index.css'),
  cp('node_modules/vue/dist/vue.min.js', 'js/vendor/vue.js'),
  cp('node_modules/vuex/dist/vuex.min.js', 'js/vendor/vuex.js'),
])).then(() => console.log('Done'));

