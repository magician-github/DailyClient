const path = require('path')
function resovePath(targetPath) {
    return path.resolve(__dirname,targetPath)
}
module.exports = {
    lintOnSave: false,
    // configureWebpack:{
    //     name:'vantTest',
    //     resolve:{
    //         alias:{
    //             '@':resovePath('src'),
    //             'components':resovePath('src/components'),
    //             'views':resovePath('src/views'),
    //             'assets':resovePath('src/assets'),
    //             'utils':resovePath('src/utils'),


    //         }
    //     }

    // },
    devServer:{
        proxy:{
            '/api':{
                target:'http://localhost:9000',
                changeOrigin: true,
            }

        }
        
    }
}