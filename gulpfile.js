// import gulp from 'gulp';
// import babel from 'gulp-babel';
// // import browserify from 'gulp-browserify';
// import uglify from 'gulp-uglify';
// import {deleteSync} from 'del';
// import less from 'gulp-less';
const gulp = require('gulp')
const babel = require('gulp-babel')
const uglify = require('gulp-uglify')
const deleteSync = require('del')
const less = require('gulp-less')
// const webpack = require('webpack-stream');
const webserver = require('gulp-webserver')
const htmlmin = require('gulp-htmlmin')
const util = require("gulp-util");
const changed = require("gulp-changed");
const color = require('gulp-color');


const copyFiles = ['./npm_plugin/*.json', './npm_plugin/*.md']
const watchList = [{ url: './npm_plugin/*.js', type: js }, { url: './src/*.html', type: html }]
const outputFile = 'dist'

function logOutput(arr) {
  if (arr.length > 0) {
    for (let i in arr) {
      console.log(`[${new Date().toLocaleTimeString()}] ${color(arr[i], 'GREEN')}`)
    }
  }
}

// function css_build() {
//   return gulp.src('test.less')    // 入口文件
//     .pipe(less())
//     .pipe(gulp.dest('dist/css')); //打包之后的文件
// }

function js() {
  let arr = []
  return gulp.src("./npm_plugin/*.js")
    .on('data', function (chunk) {
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
      console.log(color(`[${new Date().toLocaleTimeString()}] ${err.message}`, 'RED'))
    })
    .pipe(gulp.dest(`${outputFile}/npm_plugin`))
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
    // .on('data', function (chunk) {
    //   nDes++
    //   console.log(`[${new Date().toLocaleTimeString()}] ${color(chunk.path, 'GREEN')}`)
    //   // var contents = chunk.contents.toString().trim(); 
    //   // var bufLength = process.stdout.columns;
    //   // var hr = '\n\n' + Array(bufLength).join("_") + '\n\n'
    //   // if (contents.length > 1) {
    //   //     process.stdout.write(chunk.path + '\n' + contents + '\n');
    //   //     process.stdout.write(chunk.path + hr);
    //   // }
    // })
    .on('finish', function (chunk) {
      logOutput(arr);
      // console.log(color(chunk, 'GREEN'));
      // util.log("# src files: ", nSrc);
      // util.log("# dest files:", nDes);
      // util.log("# dest files:", util.date.masks.default);

    })
}

function copy() {
  let arr = []
  return gulp.src(copyFiles)
    .on('data', function (chunk) {
      chunk.path && arr.push(chunk.path)
    })
    .on('error', function (err) {
      console.log(color(`[${new Date().toLocaleTimeString()}] ${err.message}`, 'RED'))
    })
    .pipe(gulp.dest(`${outputFile}/npm_plugin`))
    .on('finish', function () {
      logOutput(arr);
      // console.log(`[${new Date().toLocaleTimeString()}] ${color('文件复制完成')}`)
    })
}
async function del() {
  await deleteSync([outputFile])
  console.log(color(`[${new Date().toLocaleTimeString()}] 文件${outputFile}删除成功`, 'GREEN'))
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
  for (let i in watchList) {
    gulp.watch(watchList[i].url, gulp.series(watchList[i].type))
  }
}
const tasks = gulp.parallel(js, html, copy)
gulp.task('webserverHandler', gulp.series(webserver))
// 多任务合并执行
// gulp.task("clean", gulp.series(del));
gulp.task("dev", gulp.series(del, tasks, webserverHandler, watchHandler));

gulp.task("build", gulp.series(del, tasks));

