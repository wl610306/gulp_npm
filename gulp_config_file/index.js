const commonFunc = require('./common');
const fileLoad = require('./file_load.js');
const dateUtils = require('./date_util.js');
const verificationUtils = require('./verification_util.js');
const watchFileList = [...verificationUtils.watchFileList,...dateUtils.watchFileList, ...fileLoad.watchFileList];
const funcList = [...verificationUtils.func,...dateUtils.func, ...fileLoad.func];

module.exports = {
    commonFunc,
    funcList,
    watchFileList
}