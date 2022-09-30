const commonFunc = require('./common');
const fileLoad = require('./file_load.js');
const watchFileList = [...fileLoad.watchFileList];
const funcList = [...fileLoad.func];

module.exports = {
    commonFunc,
    funcList,
    watchFileList
}