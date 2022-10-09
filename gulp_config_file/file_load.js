const gulp = require('gulp');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
// const less = require('gulp-less')
// const webpack = require('webpack-stream');
// const htmlmin = require('gulp-htmlmin')
// const util = require("gulp-util");
// const changed = require("gulp-changed");

const commonFunc = require('./common');
const watchFileList = [{url:'./npm_plugin/wl_file_download', type: loadJs}]
const copyFiles = ['./npm_plugin/**/*.json', './npm_plugin/**/*.md'];
const outputFile = commonFunc.outputFile;
const color = commonFunc.logColor;
const logOutput = commonFunc.logOutput;

function loadJs() {
  let arr = []
  return gulp.src("./npm_plugin/**/*.js")
    .on('data', function (chunk) {
      arr.push(chunk.path);
    })
    .pipe(babel())              //语法编译 
    .pipe(uglify(
    ))             //代码压缩
    .on('error', function (err) {
      console.log(color(`[${new Date().toLocaleTimeString()}] ${err.message}`, 'RED'))
    })
    .pipe(gulp.dest(`${outputFile}/npm_plugin`))
    .on('finish', function () {
        logOutput(arr);
    })
}


function loadCopy() {
  let arr = []
  return gulp.src(copyFiles)
    .on('data', function (chunk) {
      chunk.path && arr.push(chunk.path);
    })
    .on('error', function (err) {
      console.log(color(`[${new Date().toLocaleTimeString()}] ${err.message}`, 'RED'));
    })
    .pipe(gulp.dest(`${outputFile}/npm_plugin`))
    .on('finish', function () {
        logOutput(arr);
    })
}
module.exports = {
    func:[
        loadJs,
        loadCopy,
    ],
    watchFileList
}
