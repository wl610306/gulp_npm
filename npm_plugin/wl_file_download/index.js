export function wl_file_download(res, fileName, type) {
    // 请求头中必须加入 responseType: blob
    // 导出excel格式： new Blob([res], {type: 'application/vnd.ms-excel'})
    // 导出word格式：  new Blob([res], {type: 'application/msword'})
    // 导出.zip格式：  new Blob([res], {type: 'application/zip'})
    // 导出.xls或者.xlsx  new Blob([res], {type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'})
    
    if (!res || !res.data || (res.data && res.data.size === 0)) {
        throw new Error("内容为空，无法下载!");
    }
    const link = document.createElement('a'); // 创建元素 
    const blob = new Blob([res.data], { type: type || {} });
    link.style.display = 'none';
    link.href = window.URL.createObjectURL(blob); // 创建下载的链接 
    const name = fileName || res.headers['content-disposition'].split("attachment;filename*=utf-8''")[1];
    link.setAttribute('download', decodeURI(name));
    document.body.appendChild(link);
    link.click(); // 点击下载 
    document.body.removeChild(link); // 下载完成移除元素 
    window.URL.revokeObjectURL(link.href); // 释放掉blob对象
    link.remove();
}

export function wl_url_download(fileUrl, fileName) {
    let aLink = document.createElement('a');
    aLink.style.display = 'none';
    aLink.href = fileUrl;
    aLink.setAttribute('download', fileName) // fileName 自定义文件名
    document.body.appendChild(aLink);
    aLink.click();  // 执行a标签的点击事件，不加下载不起作用
    document.body.removeChild(aLink);
}

export default {
    wl_file_download,
    wl_url_download
}