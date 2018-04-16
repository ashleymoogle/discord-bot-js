const webpack = require('webpack');
const path = require('path');
const merge = require('webpack-merge');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

const TARGET = process.env.npm_lifecycle_event || 'build';

const developmentConfig = require('./webpack/development');

const commonChunkPlugin = new webpack.optimize.CommonsChunkPlugin({
    name: 'vendor',
    minChunks: Infinity,
    filename: 'vendor.bundle.js'
});

let common = {
    entry: {
        app: path.resolve(__dirname, "interface/src"),
    },
    output: {
        path: path.resolve(__dirname, "build/dist"),
        filename:'[name].bundle.js',
        chunkFilename: "[name].bundle.js",
        publicPath: "/build/dist/",
    },
    module: {
        rules: [
            {
                test: /\.html$/,
                use: {
                    loader: 'html-loader',
                    options: {
                        modules: true
                    }
                }
            },
            {
                test: /\.js$/,
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: ['style-loader'],
                    use:[
                        {
                            loader:"css-loader",
                            query: {
                                modules: true,
                                importLoaders: 1,
                                localIdentName : '[name]__[local]___[hash:base64:5]'
                            }
                        },
                        {
                            loader: "postcss-loader",
                            options: {
                                plugins: [
                                    require('autoprefixer')({
                                        browsers: ['last 2 versions'] 
                                    })
                                ]
                            }
                        }
                    ],
                    publicPath: "/build/dist" // Overrides output.publicPath
                })
            }
        ]
    },
    resolve: {
        modules: [
            path.resolve(__dirname, "interface/src"),
            "node_modules"
        ],
        alias: {
            "lodash": "lodash/lodash.min",
        }
    },
    externals: {
    },
    stats: {
    },
    plugins: [
        new ExtractTextPlugin({
            filename:'[name].bundle.css',
            disable:false,
            allChunks:true
        }),
        new CopyWebpackPlugin([
            {from: 'interface/src/assets', to: '../assets'},
            {from: 'interface/src/index.html', to: '../index.html'}
        ])
    ]
};

let config = common

if (TARGET === 'build') {
    config = merge.smart(common, {
        plugins: [
            new webpack.DefinePlugin({
                PRODUCTION: JSON.stringify(true),
                'process.env': {
                  'NODE_ENV': JSON.stringify('production')
                }
            }),
            new webpack.LoaderOptionsPlugin({
                minimize: true,
                debug: false
            }),
            new UglifyJSPlugin({
                uglifyOptions: {
                    compress: {
                        warnings: true,
                        screw_ie8: true,
                        conditionals: true,
                        unused: true,
                        comparisons: true,
                        sequences: true,
                        dead_code: true,
                        evaluate: true,
                        if_return: true,
                        join_vars: true,
                    },
                    output: {
                        comments: false
                    }
                }
            }),
            new OptimizeCssAssetsPlugin({
                assetNameRegExp: /\.css$/g,
                cssProcessor: require('cssnano'),
                cssProcessorOptions: { discardComments: { removeAll: true } },
                canPrint: true
            }),
            commonChunkPlugin
        ]
    })
}



if ((TARGET === 'startServer') || (TARGET === undefined)) {
    console.log('start dev server')
    config = merge(common, {
        debug: true,
        plugins: [
            new webpack.DefinePlugin({
                PRODUCTION: JSON.stringify(true),
                'process.env': {
                    'NODE_ENV': JSON.stringify('production')
                }
            })
        ],
        devtool: 'eval'
    });

    config = merge(common, developmentConfig.devServer())
}

module.exports = config