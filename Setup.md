# Setup the project

The steps that are laid out in the file will include setting up the following:

1. React JS - This will be used as the main framework for the frontend.
2. Prettier - Enforces code format.
## Instructions

### 1. React JS

```shell
npx create-react-app
```


### 2. Prettier

Prettier is used to enforce a certain coding format. This way everyone codes in the same code style which creates consistency in the project.

```shell
npm install --save-dev prettier
```

Create a new file called `.prettierrc.js` in the root folder and put the following inside of it

```js
module.exports = {
  semi: false,
  singleQuote: false, // Do you want to use double or single quotations?
  trailingComma: 'all',
}
```

Add the following to `package.json` in the script property

```js
    "scripts": {
      ..., // [DONT COPY THIS LINE] Previous scripts
        "format": "prettier --check --ignore-path .gitignore .",
        "format:fix": "prettier --write --ignore-path .gitignore ."
      ..., // [DONT COPY THIS LINE] Next scripts
    }
```

