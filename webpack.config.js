
let path = require('path');
let webpack = require('webpack');

module.exports = {//注意这里是exports不是export 
    entry: {
        app: __dirname + "/src/main.jsx",  //唯一入口文件，就像Java中的main方法 
    },
    output: {//输出目录 
        path: __dirname + "/src",//打包后的js文件存放的地方 
        filename: "[name].bundle.js"//打包后的js文件名 
    },
    module: {
        rules: [
          {
            test: /\.jsx?$/,
            loader: 'babel-loader',
            exclude: /node_modules/,
            // query: {    
            //   //presets: ['es2015','react']
            // }
          },
          {
            test: /\.less$/,
            use:[
              {
                loader:'style-loader'
              },
              {
                loader: 'css-loader'
              },
              {
                loader:'less-loader'
              },
            ]
          }
        ]
      },
      resolve: {
        extensions: ['.coffee','.js','.jsx']
      },
      devServer: {                                          // webpack-dev-server 相关的配置
        port: 9000,                                         // webpack-dev-server 运行所在的端口号
        contentBase: './src',                               // 项目的更目录 即 9000 端口访问的路径
        // hot: true,
      },
      plugins:[
        // new webpack.optimize.UglifyJsPlugin(),
        // new webpack.NoEmitOnErrorsPlugin(),
        // new webpack.HotModuleReplacementPlugin(),
        // new webpack.NamedModulesPlugin(),
      ],
      mode:'development',
      optimization:{
        // minimize: true,
        // splitChunks:false,
      },
      devtool: 'source-map',
};
