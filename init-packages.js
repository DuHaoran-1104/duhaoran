const fs = require('fs');
const path = require('path');

const packages = [
  { name: '@zt-cli/core', dir: 'packages/core', main: 'lib/core.js' },
  { name: '@zt-cli/utils', dir: 'packages/utils/utils', main: 'lib/index.js' },
  { name: '@zt-cli/log', dir: 'packages/utils/log', main: 'lib/index.js' },
  { name: '@zt-cli/models', dir: 'packages/models/models', main: 'lib/index.js' },
  { name: '@zt-cli/command', dir: 'packages/models/command', main: 'lib/index.js' },
  { name: '@zt-cli/package', dir: 'packages/models/package', main: 'lib/index.js' },
  { name: '@zt-cli/init', dir: 'packages/commands/init', main: 'lib/index.js' }
];

packages.forEach(pkg => {
  fs.mkdirSync(pkg.dir, { recursive: true });
  fs.mkdirSync(path.join(pkg.dir, 'lib'), { recursive: true });
  fs.writeFileSync(path.join(pkg.dir, pkg.main), `'use strict';\n\nmodule.exports = {};\n`);
  
  const pkgJson = {
    name: pkg.name,
    version: '1.0.0',
    description: pkg.name,
    main: pkg.main,
    directories: { lib: 'lib' },
    scripts: { test: 'echo \"Error: no test specified\" && exit 1' },
    author: '',
    license: 'ISC'
  };
  fs.writeFileSync(path.join(pkg.dir, 'package.json'), JSON.stringify(pkgJson, null, 2));
});
