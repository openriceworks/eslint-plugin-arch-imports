# arch-imports/arch-imports

import可能なディレクトリを制限します。

## Rule Details

Examples of **incorrect** code:

```typescript
// set options
// {
//   importAllowSettingList: [
//     {
//       pathPattern: /src\/hooks\/.+/,
//       importAllowPathList: [
//         /src\/hooks\/.+/
//       ]
//     }
//   ],
//   targetFileSuffix: ["", "js", "jsx", "ts", "tsx"],
// }

// this file is src/hooks/use-hook.ts
import MyComponent from '../components/my-component.tsx';
```

Examples of **correct** code:

```typescript
// set options
// options: [
//   {
//     importAllowSettingList: [
//       {
//         pathPattern: /src\/components\/.+/,
//         importAllowPathList: [
//           /src\/hooks\/.+/
//         ]
//       }
//     ],
//     targetFileSuffix: ["", "js", "jsx", "ts", "tsx"],
//   }
// ]
// },

// this file is src/components/my-component.tsx
import useHook from '../hooks/use-hook.ts';
```

## Options

```typescript
"arch-imports/arch-imports":
  [
    "off" | "warn" | "error",
    {
      importAllowSettingList: {
          pathPattern: string|RegExp;
          importAllowPathList: (string|RegExp)[];
        }[],
      targetFileSuffix: string[],
    }
  ]
```

## Implementation

- [Rule source](../../src/rules/arch-imports.ts)
- [Test source](../../src/test/rules/arch-imports.test.ts)