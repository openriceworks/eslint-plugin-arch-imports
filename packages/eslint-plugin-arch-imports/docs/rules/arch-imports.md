# arch-imports/arch-imports

import可能なディレクトリを制限します。

## Rule Details

Examples of **incorrect** code:

```typescript
// set options
// {
//   ruleList: [
//     {
//       filePath: /src\/hooks\/.+/,
//       allowPathList: [
//         /src\/hooks\/.+/
//       ]
//     }
//   ],
//   fileExtList: ["", "js", "jsx", "ts", "tsx"],
// }

// this file is src/hooks/use-hook.ts
import MyComponent from '../components/my-component.tsx';
```

Examples of **correct** code:

```typescript
// set options
// options: [
//   {
//     ruleList: [
//       {
//         filePath: /src\/components\/.+/,
//         allowPathList: [
//           /src\/hooks\/.+/
//         ]
//       }
//     ],
//     fileExtList: ["", "js", "jsx", "ts", "tsx"],
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
      ruleList: {
          filePath: string|RegExp;
          allowPathList: (string|RegExp)[];
        }[],
      fileExtList: string[],
    }
  ]
```

## Implementation

- [Rule source](../../lib/rules/arch-imports.ts)
- [Test source](../../lib/test/rules/arch-imports.test.ts)