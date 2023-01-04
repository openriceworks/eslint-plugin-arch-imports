# eslint-plugin-arch-imports
Restrict files that can be imported.
# installation
```
npm i -D eslint-plugin-arch-imports
```

# Usage

## plugin

```js
{
  "plugins": {
    "arch-imports"
  }
}
```

## rules

Sample
- src/components can import 'src/components' and 'src/hooks'
- src/hooks can import 'src/hooks'

```js
{
  "rules": {
      "arch-imports/arch-imports": [
      "error",
      {
          importAllowSettingList: [
              {
                  pathPattern: /src\/components\/.+/,
                  importAllowPathList: [
                      /src\/components\/.+/,
                      /src\/hooks\/.+/
                  ]
              },
              {
                  pathPattern: /src\/hooks\/.+/,
                  importAllowPathList: [
                      /src\/hooks\/.+/
                  ]
              }
          ],
          targetFileSuffix: ["", "ts", "tsx"]
      }
  ]
  }
}
```