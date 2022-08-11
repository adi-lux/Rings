module.exports = {
    "env": {
        "browser": true,
        "es2021": true
    },
    "extends": [
        "plugin:react/recommended",
        "airbnb",
        "airbnb-typescript"
    ],
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        "ecmaFeatures": {
            "jsx": true,
        },
        "ecmaVersion": "latest",
        "project": './tsconfig.json',
        "sourceType": "module"
    },
    "plugins": [
        "react",
        "@typescript-eslint"
    ],

    "rules": {
        "react/react-in-jsx-scope": "off",
        "@typescript-eslint/ban-ts-comment": "off",

        "react/jsx-filename-extension": [1, {"extensions": [".ts", ".tsx"]}], //should add ".ts" if typescript project
    }
}