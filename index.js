const fs = require('fs');
const postcss = require('postcss');
const cssnano = require('cssnano');
const combineMediaQuery = require('postcss-combine-media-query');

async function combineMediaQueries(filePath, cssnanoConfig) {
  const css = fs.readFileSync(filePath, 'utf8');

  const result = await postcss()
    .use(combineMediaQuery())
    .use(cssnano(cssnanoConfig))
    .process(css, { from: filePath });

  fs.writeFileSync(filePath, result.css, 'utf8');
}

module.exports = function ({
  paths2css = ['./dist/assets'],
  cssnanoConfig = { preset: 'default' },
} = {}) {
  return {
    name: 'vite-join-media-queries',
    enforce: 'post',
    closeBundle: {
      order: 'post',
      sequential: true,
      async handler() {
        paths2css.forEach((path) => {
          fs.readdirSync(path)
            .filter((filename) => /\.css$/.test(filename))
            .map((filename) =>
              combineMediaQueries(`${path}/${filename}`, cssnanoConfig)
            );
        });
      },
    },
  };
};
