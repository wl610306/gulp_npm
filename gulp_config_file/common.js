const outputFile = 'dist';
const NODE_ENV = process.env.NODE_ENV === 'dev';
const logColor = require('gulp-color');
function logOutput(arr) {
    if (arr.length > 0) {
        for (let i in arr) {
            console.log(`[${new Date().toLocaleTimeString()}] ${logColor(arr[i], 'GREEN')}`)
        }
    }
}

module.exports = {
    outputFile,
    logColor,
    logOutput,
    NODE_ENV
}