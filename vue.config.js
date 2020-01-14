const fs = require("fs");
const Timestamp = new Date().getTime();
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
module.exports = {
    // 基本路径
    publicPath:"./",
    // 输出文件目录
    outputDir: 'dist',
    // 放置生成的静态资源 (js、css、img、fonts) 的 (相对于 outputDir 的) 目录。
    assetsDir: 'static',
    // 生产环境是否生成 sourceMap 文件，一般情况不建议打开
    productionSourceMap: false,
    configureWebpack: {
        // 警告 webpack 的性能提示
	    performance: {
	    	hints:'warning',
	    	// 入口起点的最大体积
	    	maxEntrypointSize: 50000000,
	    	// 生成文件的最大体积
	    	maxAssetSize: 30000000,
	    	// 只给出 js 文件的性能提示
	    	assetFilter: function(assetFilename) {
	    		return assetFilename.endsWith('.js');
	    	}
        },
        // 输出重构  打包编译后的 文件名称  【模块名称.版本号.时间戳】
        output: {
            filename: `[name].${process.env.VUE_APP_Version}.${Timestamp}.js`,
            chunkFilename: `[name].${process.env.VUE_APP_Version}.${Timestamp}.js`
        },
        // 修改打包后css文件名
        plugins: [
            new MiniCssExtractPlugin({
                filename: `css/[name].${process.env.VUE_APP_Version}.${Timestamp}.css`,
                chunkFilename: `css/[name].${process.env.VUE_APP_Version}.${Timestamp}.css`
            })
        ]
    },
    // 修改打包后img文件名
    chainWebpack: config => {
        config.module
            .rule('images')
            .use('url-loader')
            .tap(options => {
                return {
                    limit: 4096,
                    fallback: {
                        loader: 'file-loader',
                        options: {
                            name: `img/[name].${process.env.VUE_APP_Version}.${Timestamp}.[ext]`
                        }
                    }
                }
            })
    },
    devServer: {
        before(app) {
            app.get('/ishave',(req, res) => {
                let publicSrc = "./src/views/layout";
                let dirName = req.query.dirname.replace(/98987/g, '/').split('/');
                
                let errorMsg = '';
                let changeDirName = '';
                if(dirName.length > 1){
                    dirName.forEach( (item, index) => {
                        if(index != dirName.length - 1){
                            changeDirName += (item + '/');
                            fs.access(changeDirName, (err) => {
                                if(err){
                                    // 目录不存在--创建该目录
                                    fs.mkdir(`${publicSrc}/${changeDirName.substring(0, changeDirName.length - 1)}`, (err) => {
                                        if(err){
                                            // 
                                            errorMsg += `创建${item}失败---`;
                                            return;
                                        }
                                    })
                                }else{
                                    // 目录存在
                                    errorMsg += '目录已存在---';
                                    return;
                                }
                            })
                        }
                    });
                }
                setTimeout(() => {
                    if(errorMsg.lenght > 0){
                        res.json({status: errorMsg});
                        return;
                    }
                    dirName = req.query.dirname.replace(/98987/g, '/');
                    // access判断目录是否存在
                    fs.access(`${publicSrc}/${dirName}`, (err) => {
                        // console.log(err ?  '目录/文件不存在': '文件存在,可以进行读写');
    
                        if(err){
                            // 目录不存在--创建该目录
                            fs.mkdir(`${publicSrc}/${dirName}`, (err) => {
                                if(err){
                                    // 创建目录失败
                                    res.json({status: '创建'+dirName+'失败'});
                                }else{
                                    // 创建目录成功--创建component目录和index.vue文件
                                    fs.mkdir(`${publicSrc}/${dirName}/component`, (err) => {
                                        if(err){
                                            // 创建component失败
                                            res.json({status: '创建component失败'});
                                        }else{
                                            // 创建component成功--读取isRead.vue
                                            fs.readFile("./src/components/isRead.vue", (err, data) => {
                                                if(err){
                                                    // 读取失败
                                                    res.json({status: '读取isRead.vue失败'});
                                                }else{
                                                    // 读取成功--写入文件
                                                    let dirContent = data.toString().replace(/className/g, dirName.replace(/\//g, '-'));
                                                    fs.writeFile(`${publicSrc}/${dirName}/index.vue`, dirContent, (err) => {
                                                        if(err){
                                                            res.json({status: '创建index.vue失败'});
                                                        }else{
                                                            res.json({status: 'change:ok'});
                                                        }
                                                    })
                                                }
                                            })
                                        }
                                    })
                                }
                            })
                        }else{
                            // 目录存在
                            res.json({status: '目录已存在'});
                        }
                    })
                },1000)
                
            })
        }
    }
}