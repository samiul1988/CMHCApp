const path = require('path');

module.exports = (env) =>{
    // const isProd = env === "production";

    return {
        entry:'./src/EntryPoint.js',
        output:{
            path:path.join(__dirname,'public'),
            filename:'bundle.js'
        },
        module:{
            rules:[{
                loader:'babel-loader',
                test:/\.js$/,
                exclude:/node_modules/
            }]
        }
        // mode:'development'
    }
};