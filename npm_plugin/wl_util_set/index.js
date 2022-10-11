
// 表单序列化
export const serialize = data => {
    let list = [];
    Object.keys(data).forEach(ele => {
        list.push(`${ele}=${data[ele]}`);
    });
    return list.join("&");
};
//获取数据类型
export const getDataType = obj => {
    var toString = Object.prototype.toString;
    var map = {
        "[object Boolean]": "boolean",
        "[object Number]": "number",
        "[object String]": "string",
        "[object Function]": "function",
        "[object Array]": "array",
        "[object Date]": "date",
        "[object RegExp]": "regExp",
        "[object Undefined]": "undefined",
        "[object Null]": "null",
        "[object Object]": "object"
    };
    if (obj instanceof Element) {
        return "element";
    }
    return map[toString.call(obj)];
};
/**
 * 对象深拷贝
 */
export const deepClone = data => {
    var type = getDataType(data);
    var obj;
    if (type === "array") {
        obj = [];
    } else if (type === "object") {
        obj = {};
    } else {
        // 不再具有下一层次
        return data;
    }
    if (type === "array") {
        for (var i = 0, len = data.length; i < len; i++) {
            obj.push(deepClone(data[i]));
        }
    } else if (type === "object") {
        for (var key in data) {
            obj[key] = deepClone(data[key]);
        }
    }
    return obj;
};
/**
 *加密处理
 */
export const encryption = params => {
    let { data, type, param, key } = params;
    const result = JSON.parse(JSON.stringify(data));
    if (type === "Base64") {
        param.forEach(ele => {
            result[ele] = btoa(result[ele]);
        });
    } else {
        param.forEach(ele => {
            var data = result[ele];
            key = CryptoJS.enc.Latin1.parse(key);
            var iv = key;
            // 加密
            var encrypted = CryptoJS.AES.encrypt(data, key, {
                iv: iv,
                mode: CryptoJS.mode.CBC,
                padding: CryptoJS.pad.ZeroPadding
            });
            result[ele] = encrypted.toString();
        });
    }
    return result;
};
/**
 * 浏览器判断是否全屏
 */
export const fullscreenToggel = () => {
    if (fullscreenEnable()) {
        exitFullScreen();
    } else {
        reqFullScreen();
    }
};
/**
 * esc监听全屏
 */
export const listenfullscreen = callback => {
    function listen() {
        callback();
    }
    document.addEventListener("fullscreenchange", function () {
        listen();
    });
    document.addEventListener("mozfullscreenchange", function () {
        listen();
    });
    document.addEventListener("webkitfullscreenchange", function () {
        listen();
    });
    document.addEventListener("msfullscreenchange", function () {
        listen();
    });
};
/**
 * 浏览器判断是否全屏
 */
export const fullscreenEnable = () => {
    return (
        document.isFullScreen ||
        document.mozIsFullScreen ||
        document.webkitIsFullScreen
    );
};
/**
 * 浏览器全屏
 */
export const reqFullScreen = () => {
    if (document.documentElement.requestFullScreen) {
        document.documentElement.requestFullScreen();
    } else if (document.documentElement.webkitRequestFullScreen) {
        document.documentElement.webkitRequestFullScreen();
    } else if (document.documentElement.mozRequestFullScreen) {
        document.documentElement.mozRequestFullScreen();
    }
};
/**
 * 浏览器退出全屏
 */
export const exitFullScreen = () => {
    if (document.documentElement.requestFullScreen) {
        document.exitFullScreen();
    } else if (document.documentElement.webkitRequestFullScreen) {
        document.webkitCancelFullScreen();
    } else if (document.documentElement.mozRequestFullScreen) {
        document.mozCancelFullScreen();
    }
};
/**
 * 递归寻找子类
 */
export const findChild = (menu, id, keyName = "id") => {
    for (let i = 0; i < menu.length; i++) {
        if (menu[i].children.length != 0) {
            for (let j = 0; j < menu[i].children.length; j++) {
                if (menu[i].children[j][keyName] == id) {
                    return menu[i];
                } else {
                    if (menu[i].children[j].children.length != 0) {
                        return findChild(menu[i].children[j].children, id, keyName);
                    }
                }
            }
        }
    }
};
/**
 * 动态插入css
 */

export const loadStyle = url => {
    const link = document.createElement("link");
    link.type = "text/css";
    link.rel = "stylesheet";
    link.href = url;
    const head = document.getElementsByTagName("head")[0];
    head.appendChild(link);
};
/**
 * 判断值是否相等
 */
export const checkValueEqual = (obj1, obj2) => {
    delete obj1.close;
    var o1 = obj1 instanceof Object;
    var o2 = obj2 instanceof Object;
    if (!o1 || !o2) {
        /*  判断不是对象  */
        return obj1 === obj2;
    }
    if (Object.keys(obj1).length !== Object.keys(obj2).length) {
        return false;
        // Object.keys() 返回一个由对象的自身可枚举属性(key值)组成的数组,例如：数组返回下表：let arr = ["a", "b", "c"];console.log(Object.keys(arr))->0,1,2;
    }
    for (var attr in obj1) {
        var t1 = obj1[attr] instanceof Object;
        var t2 = obj2[attr] instanceof Object;
        if (t1 && t2) {
            return diff(obj1[attr], obj2[attr]);
        } else if (obj1[attr] !== obj2[attr]) {
            return false;
        }
    }
    return true;
};
/**
 * 判断值是否相等
 */
export const isValueEqual = (a, b) => {
    let result = true;
    Object.keys(a).forEach(ele => {
        const type = typeof a[ele];
        if (type === "string" && a[ele] !== b[ele]) result = false;
        else if (
            type === "object" &&
            JSON.stringify(a[ele]) !== JSON.stringify(b[ele])
        )
            result = false;
    });
    return result;
};
/**
 * 根据字典的value显示label
 */
export const findLabelByValue = (dic, value, labelName, valueName, childrenName, delChidren) => {
    let result = "";
    let label = labelName || 'label'
    let children = childrenName || 'children'
    let delChild = delChidren || true
    const newDic = arrayLowerLatitude(deepClone(dic), childrenName, delChild)
    if (validatenull(dic)) return value;
    if (
        typeof value === "string" ||
        typeof value === "number" ||
        typeof value === "boolean"
    ) {
        let index = 0;
        index = findArray(newDic, value, valueName, children);
        if (index != -1) {
            result = newDic[index][label];
        } else {
            result = value;
        }
    } else if (value instanceof Array) {
        result = [];
        let index = 0;
        value.forEach(ele => {
            index = findArray(newDic, ele, valueName, children);
            if (index != -1) {
                result.push(newDic[index][label]);
            } else {
                result.push(value);
            }
        });
        result = result.toString();
    }
    return result;
};
/**
 * 根据字典的value查找对应的index
 */
export const findIndexByValue = (dic, value, valueName, childrenName) => {
    let children = childrenName || 'children'
    let valueKey = valueName || 'value'
    for (let i = 0; i < dic.length; i++) {
        if (dic[i][valueKey] == value) {
            return i;
        } else {
            if (dic[i][children] && dic[i][children].length > 0) {
                findArray(dic[i][children], value, valueKey, children)
                return
            }
        }
    }
    return -1;
};
/**
 * 生成随机len位数字
 */
export const randomLenNum = (len, date) => {
    let random = "";
    random = Math.ceil(Math.random() * 100000000000000)
        .toString()
        .substr(0, len || 4);
    if (date) random = random + Date.now();
    return random;
};
/**
 * 地址栏参数拆解
 */
export function getQueryString(url, paraName) {
    const arrObj = url.split('?');
    let result = [];
    if (arrObj.length > 1) {
        const arrPara = arrObj[1].split('&');
        let arr = [];
        for (let i = 0; i < arrPara.length; i++) {
            arr = arrPara[i].split('=')
            let obj = {
                key: arr[0],
                value: arr[1]
            }
            result.push(obj);
            if (paraName) {
                if (arr != null && arr[0] == paraName) {
                    result = arr[1];
                    break;
                }
            }
        }
    }
    return result;
}
//防抖
export function debounce(fn, t = 500) {
    let lastTime;
    return function () {
        clearTimeout(lastTime);
        const [that, args] = [this, arguments];
        lastTime = setTimeout(() => {
            fn.apply(that, args);
        }, t);
    }
}
// 节流
export function throttle(fn, t = 500) {
    let last;
    let timer;
    return function () {
        let th = this;
        let args = arguments;
        let now = +new Date();
        if (last && now - last < interval) {
            clearTimeout(timer);
            timer = setTimeout(function () {
                last = now;
                fn.apply(th, args);
            }, t);
        } else {
            last = now;
            fn.apply(th, args);
        }
    }
}
// 身份证号掩码
export function cardIdMask(val,startNum=3,endNum=2,replaceStr="*") {
    let result = "";
    if(val){
        let hideStr = "";
        let hideNum = val.length - startNum - endNum;
        // let reg = new RegExp(`(?<=\\d{${startNum}})\\d{${hideNum}}(?=\\d{${endNum}})`)
        let reg = new RegExp(`(\\d{${startNum}})\\d${replaceStr}(\\d{${endNum}})`);
        for(let i = 0; i < hideNum; i++){
            hideStr = hideStr + replaceStr;
        }
        // result = val.replace(reg, hideStr);
        result = val.replace(reg, `$1${hideStr}$2`);
    }
    return result;
}
// 手机号掩码
export function phoneMask(val,startNum=3,endNum=4,replaceStr='*') {
    let result = "";
    if(val){
        let hideStr = "";
        let hideNum = val.length - startNum - endNum;
        let reg = new RegExp(`(\\d{${startNum}})\\d${replaceStr}(\\d{${endNum}})`);
        for(let i = 0; i < hideNum; i++){
            hideStr = hideStr + replaceStr;
        }
        result = val.replace(reg, `$1${hideStr}$2`);
    }
    return result;
}
// 字符串掩码
export function strMask(val,startNum=1,endNum=1,replaceStr='*') {
    let result = "";
    if(val){
        let hideStr = "";
        let hideNum = val.length - startNum - endNum;
        let reg = new RegExp(`([\\w\\W]{${startNum}})[\\w\\W]${replaceStr}([\\w\\W]{${endNum}})`);
        for(let i = 0; i < hideNum; i++){
            hideStr = hideStr + replaceStr;
        }
        result = val.replace(reg, `$1${hideStr}$2`);
    }
    return result;
}
/*
 * JSON数组去重
 * @param: [array] json Array
 * @param: [string] key 根据此键名进行去重
 * @param: [string] uniqueIndex 唯一标识
 */
export function uniqueArray(array, key, uniqueIndex) {
    let result = [];
    let obj = {};
    let id = uniqueIndex || 'id';
    for (let i = 0; i < array.length; i++) {
        const el = array[i];
        for (let y = i + 1; y < array.length; y++) {
            const val = array[y];
            if (el[key] && (el[key] == val[key])) {
                if (!obj[el[id]]) {
                    result.push(el);
                }
                if (!obj[[id]]) {
                    result.push(val);
                }
            }
        }
    }
    return result;
}

/*
 * 二维数组转换一维数组
 * @param: [array] json Array
 * @param: [string] 子集键名
 */
export function arrayLowerLatitude(array, children, delChildren) {
    const newArray = deepClone(array)
    let len = newArray.length
    if (len <= 0) return []
    let result = [],
        child = children || 'children'
    for (let i = 0; i < len; i++) {
        result.push(newArray[i])
        if (newArray[i][child] && newArray[i][child].length > 0) {
            for (let j = 0, childLen = newArray[i][child].length; j < childLen; j++) {
                result.push(newArray[i][child][j])
            }
            if (delChildren) delete newArray[i][child]
        }
    }
    if (result.length > 0) {
        for (let i = 0; i < result.length; i++) {
            result[i].index = i + 1
        }
    }
    return result
}

export default {
    serialize,
    getDataType,
    deepClone,
    checkValueEqual,
    encryption,
    fullscreenToggel,
    listenfullscreen,
    fullscreenEnable,
    reqFullScreen,
    exitFullScreen,
    findChild,
    loadStyle,
    isValueEqual,
    findLabelByValue,
    findIndexByValue,
    randomLenNum,
    getQueryString,
    debounce,
    throttle,
    cardIdMask,
    phoneMask,
    uniqueArray,
    arrayLowerLatitude,
    strMask
}



