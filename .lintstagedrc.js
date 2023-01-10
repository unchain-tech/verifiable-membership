const path = require('path');

const buildLintCommand = (filenames) =>
  `yarn run rome check ${filenames
    .map((f) => path.relative(process.cwd(), f))
    .join(' ')}`;

const buildFormatCommand = (filenames) =>
  `yarn run rome format ${filenames
    .map((f) => path.relative(process.cwd(), f))
    .join(' ')} `;

const buildSolhintCommand = (filenames) =>
  `solhint --max-error 0 -c packages/contract/solhint.json --ignore-path .gitignore ${filenames
    .map((f) => path.relative(process.cwd(), f))
    .join(' ')} `;

module.exports = {
  '**/*.{js,jsx,ts,tsx}': [buildLintCommand],
  '**/*.{js,jsx,ts,tsx,sol}': [buildFormatCommand],
  '**/*.sol': [buildSolhintCommand],
};
