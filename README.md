opal-loader
---

## Usage
### Install
```bash
$ npm install --save-dev opal-loader
```

### Add a rule into webpack.config.js
```js
module.exports = {
  ...
  module: {
    rules: [
      // ...
      {
        test: /\.rb$/,
        loader: 'opal-loader',
      },
    ],
  },
};
```

With Options
```js
{
  test: /\.rb$/,
  loader: {
    loader: 'opal-loader',
    options: {
      paths: [
        path.resolve(__dirname, 'lib'),
      ],
    },
  },
}
```
