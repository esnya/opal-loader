opal-loader
---

## Usage
### Install
```bash
$ npm install --save-dev ukalib-opal-loader
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
        loader: 'ukalib-opal-loader',
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
