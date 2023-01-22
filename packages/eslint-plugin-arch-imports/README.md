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
          ruleList: [
              {
                  filePath: /src\/components\/.+/,
                  allowPathList: [
                      /src\/components\/.+/,
                      /src\/hooks\/.+/
                  ]
              },
              {
                  filePath: /src\/hooks\/.+/,
                  allowPathList: [
                      /src\/hooks\/.+/
                  ]
              }
          ],
          fileExtList: ["", "ts", "tsx"]
      }
  ]
  }
}
```