const gulp = require('gulp');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');

const commonFunc = require('./common');
const outputFile = commonFunc.outputFile;
const color = commonFunc.logColor;
const logOutput = commonFunc.logOutput;

const firstFileName = 'npm_plugin';
const secendFileName = 'wl_file_download';
const fileUrlPrifx = `./${firstFileName}/${secendFileName}/`
const watchFileList = [{url: fileUrlPrifx, type: loadJs}]
const copyFiles = [`${fileUrlPrifx}*.json`, `${fileUrlPrifx}*.md`];

function loadJs() {
  let arr = []
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


function loadCopy() {
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
        loadJs,
        loadCopy,
    ],
    watchFileList
}
