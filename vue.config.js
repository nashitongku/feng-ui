'use strict'
const path = require('path')

const webpack = require('webpack')
const productionGzipExtensions = ['js', 'css']
const merge = require('webpack-merge')


function resolve(dir) {
    return path.join(__dirname, dir)
}

module.exports = {
    publicPath: '/',
    outputDir: 'dist',
    assetsDir: 'static',
    lintOnSave: process.env.NODE_ENV === 'development',
    productionSourceMap: false,


    configureWebpack: config => {
        let webpackConfig = {
            resolve: {
                alias: {
                    '@': resolve('src'),
                    '@element-plus': path.join(__dirname, 'src','packages'),
                }
            },
            optimization: {
                splitChunks: {
                    chunks: 'all',
                    automaticNameDelimiter: '~',
                    // 设置chunk的文件名。默认为true。当为true时，splitChunks基于chunk和cacheGroups的key自动命名。
                    name: true,
                    cacheGroups: {/*
                        'element-ui': {
                            test: /[\\/]node_modules[\\/](element-ui|axios)/,
                            chunks: 'all',
                            priority: -5,
                        },*/
                        'jb-cms-ui': {
                            test: /[\\/]node_modules[\\/](jb-cms-ui)/,
                            chunks: 'all',
                            priority: -10,
                        },
                        'ali-oss': {
                            test: /[\\/]node_modules[\\/](ali-oss)/,
                            chunks: 'all',
                            priority: 1,
                            filename: '[name]_feng_[contentHash].js'
                        },
                        default: {
                            minChunks: 1,
                            priority: -20,
                            reuseExistingChunk: true
                        }
                    },
                },
            }
        };
        let customConfig={}
        if (process.env.NODE_ENV === 'production') {
            // 为生产环境修改配置...
        } else {
            // 为开发环境修改配置...
        }
        return merge(webpackConfig,customConfig)
    },
    chainWebpack(config) {
    }

}
