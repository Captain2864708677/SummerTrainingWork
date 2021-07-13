// postcss.config.js
// Rem布局适配文件
module.exports = {
    plugins: {
        'postcss-pxtorem': {
            rootValue: 75,//设置根元素字体大小
            propList: ['*'],//可以从px更改到rem的属性
            exclude:/node_modules/i,//排除modules目录下所有文件
            selectorBlackList:['vant-','my-']//选择器黑名单 过滤掉vant-开头的元素选择器
        },
    },
};