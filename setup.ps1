$packages = @(
    @{ name = '@zt-cli/core'; dir = 'packages/core'; main = 'lib/core.js' },
    @{ name = '@zt-cli/utils'; dir = 'packages/utils/utils'; main = 'lib/index.js' },
    @{ name = '@zt-cli/log'; dir = 'packages/utils/log'; main = 'lib/index.js' },
    @{ name = '@zt-cli/models'; dir = 'packages/models/models'; main = 'lib/index.js' },
    @{ name = '@zt-cli/command'; dir = 'packages/models/command'; main = 'lib/index.js' },
    @{ name = '@zt-cli/package'; dir = 'packages/models/package'; main = 'lib/index.js' },
    @{ name = '@zt-cli/init'; dir = 'packages/commands/init'; main = 'lib/index.js' }
)

foreach ($pkg in $packages) {
    New-Item -ItemType Directory -Force -Path $pkg.dir | Out-Null
    New-Item -ItemType Directory -Force -Path "$($pkg.dir)/lib" | Out-Null
    
    Set-Content -Path "$($pkg.dir)/$($pkg.main)" -Value "'use strict';`n`nmodule.exports = {};`n"
    
    $pkgJson = @"
{
  "name": "$($pkg.name)",
  "version": "1.0.0",
  "description": "$($pkg.name)",
  "main": "$($pkg.main)",
  "directories": { "lib": "lib" },
  "scripts": { "test": "echo `"Error: no test specified`" && exit 1" },
  "author": "",
  "license": "ISC"
}
"@
    Set-Content -Path "$($pkg.dir)/package.json" -Value $pkgJson
}
