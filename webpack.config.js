var path = require('path');
var SRC_DIR = path.join(__dirname, '/src');
var DIST_DIR = path.join(__dirname, '/dist');
var SEMANTIC_DIR = path.join(__dirname, '/semantic/dist');

module.exports = 
[
  {
    entry: `${SRC_DIR}/index.jsx`,
    output: {
      filename: 'bundle.js',
      path: DIST_DIR
    },
    module: {
      rules: [
        {
          loader: 'babel-loader',      
          include: SRC_DIR,
          test: /\.jsx?/,
          query: {
            presets: ['react', 'es2015']
          }
        }
      ]
    }
  }
  ,
  {
    entry: {
      semantic: [`${SEMANTIC_DIR}/semantic.min.css`, `${SEMANTIC_DIR}/semantic.min.js`]
    },
    output: {
      filename: '[name].js',
      path: DIST_DIR
    },
    module: {
      rules: [
        {
          loader: 'style-loader!css-loader',
          include: SEMANTIC_DIR,
          test: /\.css$/
        },
        {
          test: /\.(png|jpg|jpeg|gif|svg)$/,
          loader: 'url-loader',
          include: SEMANTIC_DIR,
          options: {
            limit: 10240,
            absolute: true,
            name: 'images/[path][name]-[hash:7].[ext]'
          }
        }, 
        {
          test: /\.(woff|woff2|ttf|svg|eot)$/,
          include: SEMANTIC_DIR,
          loader: 'url-loader',
          options: {
            limit: 10240,
            name: 'fonts/[name]-[hash:7].[ext]'
          }
        }
        ,
        {
          loader: 'babel-loader',      
          include: SRC_DIR,
          test: /\.js?/,
        }
      ]
    }
  }
]