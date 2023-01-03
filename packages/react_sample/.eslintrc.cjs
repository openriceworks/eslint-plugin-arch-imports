module.exports = {
    "env": {
        "browser": true,
        "es2021": true
    },
    "extends": [
        "eslint:recommended",
        "plugin:react/recommended",
        "plugin:@typescript-eslint/recommended"
    ],
    "overrides": [
    ],
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        "ecmaVersion": "latest",
        "sourceType": "module"
    },
    "plugins": [
        "react",
        "@typescript-eslint",
        "arch-imports"
    ],
    "rules": {
        "react/react-in-jsx-scope": "off",
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
    },
    "settings": {
        "react": {
            "version": "detect",
        },
    },
}
