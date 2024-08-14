module.exports = {
  "extends": ["../../../.eslintrc"],
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
    "project": "./tsconfig.json",
    "tsconfigRootDir": __dirname
  },
  "rules": {
    "react/react-in-jsx-scope": ["off"],
    "@typescript-eslint/naming-convention": [
      "error",
      {
        "selector": "variable",
        "format": ["camelCase", "UPPER_CASE", "snake_case"]
      }
    ],
    "max-len": [
      "error",
      {
        "code": 120,
        "ignoreComments": true,
        "ignoreTrailingComments": true,
        "ignoreStrings": true
      }
    ]
  }
}
