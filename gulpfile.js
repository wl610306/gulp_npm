const gulp = require('gulp')
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const webserver = require('gulp-webserver')
const htmlmin = require('gulp-htmlmin')
const deleteSync = require('del')

// const env = require('./src/env.js');
const config = require('./gulp_config_file/index.js');
const outputFile =  config.commonFunc.outputFile;
const logOutput =  config.commonFunc.logOutput;
const color =  config.commonFunc.logColor;

const fileList = [
  {url:'./src/**/*.html',type: html},
  {url:'./src/**/*.js',type: js},
];
console.log(config)
const tasks = gulp.parallel(js,html, config.funcList);
const watchFileList = fileList.concat(config.watchFileList);
// const isDev = env() === 'dev'
// const fs = require('fs');
// var env = 'test';
// function set_env(type){
//     env = type || env;
//     // 生成env.js文件，用于开发页面时，判断环境
//     // fs.writeFile("./src/env.js", 'function ENV (){ return "' + env + '"};', function(err){
//     fs.writeFile("./src/env.js", `function env(){ return '${env}'}; module.exports={env:env()}`, function(err){
//         err && console.log(err);
//     });
// }
// set_env(process.env.NODE_ENV);
function js(){
  let arr = []
  return gulp.src('./src/*.js')
         .on('data',function(chunk){
          arr.push(chunk.path)
         })
          // .pipe(babel({ presets: ['@babel/preset-env'] }))              //语法编译 
         .pipe(babel())              //语法编译 
         .pipe(uglify(
           // {
           //   mangle: true,//类型：Boolean 默认：true 是否修改变量名
           //   compress: true,//类型：Boolean 默认：true 是否完全压缩
           //   preserveComments: 'all' //保留所有注释
           // }
         ))             //代码压缩
         .on('error', function (err) {
           console.log(color(`[${new Date().toLocaleTimeString()}] ${err.message}`, 'RED'));
         })
         .pipe(gulp.dest(`${outputFile}/src/js`))
         .on('finish', function () {
             logOutput(arr);
         })
}
// 4. 配置一个打包 html 文件的任务
function html(cb) {
  let arr = []
  return gulp
    .src('./src/*.html')
    .on('data', function (chunk) {
      arr.push(chunk.path)
    })
    .pipe(htmlmin({
      collapseWhitespace: true,// 去掉所有的空格空白内容
      collapseBooleanAttributes: true,// 去掉布尔类型属性
      removeAttributeQuotes: true,// 移出属性值位置的双引号
      removeComments: true,// 移出注释内容
      removeEmptyAttributes: true,// 移出空属性
      removeScriptTypeAttributes: true,// 移出 script 标签上的默认 type 属性
      removeStyleLinkTypeAttributes: true,// 移出 style 标签和 link 标签的 默认 type 属性
      minifyJS: true,
      minifyCSS: true
    }))
    // .pipe(changed(dest))
    .on('error',  (err)=> {
      console.log(color(`[${new Date().toLocaleTimeString()}] ${err.message}`, 'RED'),788)
    })
    .pipe(gulp.dest(`${outputFile}/src`))// 放到指定目录
    .on('finish', function (chunk) {
      logOutput(arr);
    })
}
async function del() {
  await deleteSync([outputFile])
  console.log(color(`[${new Date().toLocaleTimeString()}] 文件${outputFile}删除成功`, 'GREEN'));
}

// webserver 要在 watch 任务前
function webserverHandler() {
  return gulp.src(outputFile)
    .pipe(webserver({
      host: 'localhost', // 打开域名
      port: 3000, //打开端口号
      open: './src/index.html', // 默认打开页面
      livereload: true, // 是否自动刷新浏览器
      // //代理
      // proxies:[
      //   {
      //     source:'/api',//请求标识符
      //     target:'jttps://www.baidui.com' //代理地址
      //   },
      //   {
      //     source:'/api',//请求标识符
      //     target:'jttps://www.baidui.com' //代理地址
      //   },
      // ]
    }))
}
//监听
function watchHandler() {
  // gulp.watch('./npm_plugin/*.js', gulp.series(js))
  for (let i in watchFileList) {
    gulp.watch(watchFileList[i].url, gulp.series(watchFileList[i].type));
  }
}

gulp.task('webserverHandler', gulp.series(webserver));
// 多任务合并执行
// gulp.task("clean", gulp.series(del));
gulp.task("dev", gulp.series(del, tasks, webserverHandler, watchHandler));

gulp.task("build", gulp.series(del, tasks));

