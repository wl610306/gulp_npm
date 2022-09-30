// 这里书写 ??? 项目的打包内容
 
// 0. 导入 gulp
const gulp = require('gulp')
// 0-1. 导入 gulp-cssmin
const cssmin = require('gulp-cssmin')
// 0-1-1. 导入 gulp-autoprefixer , 自动添加前缀
const autoprefixer = require('gulp-autoprefixer')
// 0-2. 导入 gulp-sass
const sass = require('gulp-sass')(require('sass'))
// 0-3. 导入 gulp-uglify , js 代码压缩
const uglify = require('gulp-uglify')
// 0-3-1. 导入 gulp-babel , ES6 转 ES5
const babel = require('gulp-babel')
// 0-4. 导入 gulp-htmlmin
const htmlmin = require('gulp-htmlmin')
// 0-5. 导入 gulp-imagemin
const imagemin = require('gulp-imagemin')
// 0-8. 导入 del
const del = require('del')
// 0-9. 导入 gulp-webserver
const webserver = require('gulp-webserver')
 
// 1. 配置一个 打包 css 的任务
const cssHandler = () => {
  return gulp
    .src('./src/css/*.css') // 找到原始文件
    .pipe(autoprefixer()) // 自动添加前缀
    .pipe(cssmin()) // 进行 css 代码的压缩打包
    .pipe(gulp.dest('./dist/css/')) // 放到指定目录内
}
// 2. 配置一个打包 sass 文件的任务
const sassHandler = () => {
  return gulp
    .src('./src/sass/*.scss')       // 找到需要编译的 sass 文件 
    .pipe(sass())                   // 进行 sass 转换成 css 的操作
    .pipe(autoprefixer())           // 给 css 代码自动添加前缀
    .pipe(cssmin())                 // 对 css 代码进行压缩处理
    .pipe(gulp.dest('./dist/sass/'))// 放在指定目录下
}
// 3. 配置一个 打包 js 文件的任务
const jsHandler = () => {
  return gulp
    .src('./src/js/*.js') // 找到指定的 js 文件
    .pipe(babel({ presets: ['@babel/preset-env'] })) // 进行 ES6 转换 ES5
    .pipe(uglify()) // 对 js 代码进行压缩
    .pipe(gulp.dest('./dist/js/')) // 放到指定目录内
}
// 4. 配置一个打包 html 文件的任务
const htmlHandler = () => {
  return gulp
    .src('./src/views/*.html')
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
    .pipe(gulp.dest('./dist/views/')) // 放到指定目录
}
// 5. 配置一个打包 image 的任务
// const imgHandler = () => {
//   return gulp
//     .src('./src/images/*.**')
//     .pipe(imagemin())
//     .pipe(gulp.dest('./dist/images/'))
// }
// 不推荐打包 image , 建议直接转移
/*
  6. 配置一些内容的转移任务
    + 遇到视音频都是直接转移
*/
// 6-1. 配置一个转移 img 文件的任务
const imgHandler = () => {
  return gulp
    .src('./src/images/**.*')
    .pipe(gulp.dest('./dist/images/'))
}
// 6-2. 配置一个转移 audio 文件的任务
const audioHandler = () => {
  return gulp
    .src('./src/audios/*.**')
    .pipe(gulp.dest('./dist/audio/'))
}
// 6-3. 配置一个转移 video 文件的任务
const videoHandler = () => {
  return gulp
    .src('./src/videos/*.**')
    .pipe(gulp.dest('./dist/videos/'))
}
// fonts 直接转移
const fontHandler = () => {
  return gulp
    .src('./src/fonts/*.**')
    .pipe(gulp.dest('./dist/fonts/'))
}
// data 直接转移
const dataHandler = () => {
  return gulp
    .src('./src/data/*.**')
    .pipe(gulp.dest('./dist/data/'))
}
// vendor 直接转移
const vendorHandler = () => {
  return gulp
    .src('./src/vendor/*.**')
    .pipe(gulp.dest('./dist/vendor/'))
}
// 8. 配置一个删除任务
const delHandler = () => {
  return del(['./dist/'])
}
// 9. 配置一个启动临时服务器的任务
const serverHandler = () => {
  return gulp
    .src('./dist/')
    .pipe(webserver({
      host: 'www.xhl.com',// 域名
      port: 8080,// 端口号
      open: './views/a.html',// 默认自动打开哪一个文件, 路径从 dist 以后开始书写就行
      livereload: true,// 自动刷新, 当代码发生变化的时候, 自动刷新浏览器
      // 配置服务器代理
      proxies: [
        {
          source: '/xhl',// 代理标识符
          target: 'http://localhost:8080/test.php'// 跨域目标地址
        }
      ]
    }))
}
// 10. 配置一个监控任务
const watchHandler = () => {
  gulp.watch('./src/css/*.css', cssHandler)
  gulp.watch('./src/views/*.html', htmlHandler)
  gulp.watch('./src/js/*.js', jsHandler)
}
// 7. 配置一个默认总任务
const res = gulp.parallel(cssHandler, jsHandler, htmlHandler, sassHandler, imgHandler, videoHandler, audioHandler, dataHandler, fontHandler, vendorHandler)
 
const _default = gulp.series(
  delHandler,
  res,
  serverHandler,
  watchHandler
)
 
// end, 把准备好的任务导出
module.exports = {
  cssHandler: cssHandler,
  jsHandler: jsHandler,
  sassHandler: sassHandler,
  htmlHandler: htmlHandler,
  imgHandler: imgHandler,
  audioHandler: audioHandler,
  videoHandler: videoHandler,
  fontHandler: fontHandler,
  dataHandler: dataHandler,
  vendorHandler: vendorHandler,
  delHandler: delHandler,
  default: _default,
}