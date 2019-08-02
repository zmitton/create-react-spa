const path = require('path');

const es6Bundle = {
  entry: './src/js/index.js',
  output: {
    filename: 'js/main.js',
    path: path.resolve(__dirname, '../public'),
    publicPath: '/'
  },
  devServer: { // devServer only on this ES6 bundle
    contentBase: path.join(__dirname, '../src'), // not public b/c of how css loads in prod vs. dev
    compress: true,
    // uncomment following lines if HTTP requests are implemented
    // ('/api' should be whatever path is set up in Express server)
    // proxy: {
    //   '/api': 'http://localhost:3000'
    // }
  },
  resolve: {
    alias: {
      'react-dom': '@hot-loader/react-dom'
    }
  },
  plugins: [], // so we can push to it
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            plugins: [
              'react-hot-loader/babel',
              '@babel/plugin-proposal-class-properties'
            ],
            presets: ['@babel/preset-react'] // ONLY preset-react here (no ES5 or polyfills)
          }
        }
      }
    ]
  }
};

const es5Bundle = {
  entry: './src/js/es5-index.js',
  output: {
    filename: 'js/es5-main.js',
    path: path.resolve(__dirname, '../public'),
    publicPath: '/'
  },
  resolve: {
    alias: {
      'react-dom': '@hot-loader/react-dom'
    }
  },
  plugins: [], // so we can push to it
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            plugins: [
              // uncomment following line if switching dev-server to this bundle
              // 'react-hot-loader/babel',
              '@babel/plugin-proposal-class-properties'
            ],
            presets: [ // ES5 bundle gets preset-react AND preset-env (w/ polyfills)
              '@babel/preset-react',
              ['@babel/preset-env', {
                useBuiltIns: 'usage',
                corejs: 3,
                debug: true,
                targets: {
                  browsers: ['IE >= 10'] // customize as needed (just for JAVASCRIPT polyfills, not DOM polyfills)
                }
              }]
            ]
          }
        }
      }
    ]
  }
};

module.exports = { es6Bundle, es5Bundle };
