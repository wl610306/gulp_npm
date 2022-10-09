const commonFunc = require('./common');
const fileLoad = require('./file_load.js');
const fileUtils = require('./date_util.js');
const watchFileList = [...fileUtils.watchFileList, ...fileLoad.watchFileList];
const funcList = [...fileUtils.func, ...fileLoad.func];

module.exports = {
    commonFunc,
    funcList,
    watchFileList
}