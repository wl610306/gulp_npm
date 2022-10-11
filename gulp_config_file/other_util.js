const gulp = require('gulp');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const sourcemaps=require('gulp-sourcemaps');

const commonFunc = require('./common');
const outputFile = commonFunc.outputFile;
const color = commonFunc.logColor;
const logOutput = commonFunc.logOutput;

const firstFileName = 'npm_plugin';
const secendFileName = 'wl_utils';
const fileUrlPrifx = `./${firstFileName}/${secendFileName}/`
const watchFileList = [{url: fileUrlPrifx, type: otherUtilsJs}]
const copyFiles = [`${fileUrlPrifx}*.json`, `${fileUrlPrifx}*.md`];


function otherUtilsJs() {
  let arr = []
  if(commonFunc.NODE_ENV){
    return gulp.src(`${fileUrlPrifx}*.js`)
    .on('data', function (chunk) {
      arr.push(chunk.path);
    })
    .pipe(sourcemaps.init())    // 先做一个初始化，也就是开始记录你的编译对我代码的影响，好告诉浏览器该如何恢复。
    .pipe(babel())              //语法编译 
    .pipe(uglify())             //代码压缩
    .pipe(sourcemaps.write()) // 压缩完了以后，然后写出来。
    .on('error', function (err) {
      console.log(color(`[${new Date().toLocaleTimeString()}] ${err.message}`, 'RED'))
    })
    .pipe(gulp.dest(`${outputFile}/${fileUrlPrifx}`))
    .on('finish', function () {
        logOutput(arr);
    })
  }else{
    return gulp.src(`${fileUrlPrifx}*.js`)
    .on('data', function (chunk) {
      arr.push(chunk.path);
    })
    .pipe(babel())              //语法编译 
    .pipe(uglify())             //代码压缩
    .on('error', function (err) {
      console.log(color(`[${new Date().toLocaleTimeString()}] ${err.message}`, 'RED'))
    })
    .pipe(gulp.dest(`${outputFile}/${fileUrlPrifx}`))
    .on('finish', function () {
        logOutput(arr);
    })
  }
  
}


function otherUtilsCopy() {
  let arr = []
  return gulp.src(copyFiles)
    .on('data', function (chunk) {
      chunk.path && arr.push(chunk.path);
    })
    .on('error', function (err) {
      console.log(color(`[${new Date().toLocaleTimeString()}] ${err.message}`, 'RED'));
    })
    .pipe(gulp.dest(`${outputFile}/${fileUrlPrifx}/`))
    .on('finish', function () {
        logOutput(arr);
    })
}
module.exports = {
    func:[
      otherUtilsJs,
      otherUtilsCopy,
    ],
    watchFileList
}
