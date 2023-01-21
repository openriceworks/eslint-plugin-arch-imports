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
                fileExtList: ["", "ts", "tsx"],
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
                ]
            }
        ]
    },
    "settings": {
        "react": {
            "version": "detect",
        },
    },
}
