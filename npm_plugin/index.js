// exports.wl_file_download = function(res,fileName,type) {
//     const link = document.createElement('a') // 创建元素 
//     const blob = new Blob([res.data],{type:type || {}}) 
//     link.style.display = 'none' 
//     link.href = window.URL.createObjectURL(blob) // 创建下载的链接 
//     const name = fileName || res.headers['content-disposition'].split("attachment;filename*=utf-8''")[1]
//     link.setAttribute('download', decodeURI(name))
//     document.body.appendChild(link) 
//     link.click() // 点击下载 
//     document.body.removeChild(link) // 下载完成移除元素 
//     window.URL.revokeObjectURL(link.href) // 释放掉blob对象
//     link.remove()
// }

export function wl_file_download (res,fileName,type) {
    const link = document.createElement('a') // 创建元素 
    const blob = new Blob([res.data],{type:type || {}}) 
    link.style.display = 'none' 
    link.href = window.URL.createObjectURL(blob) // 创建下载的链接 
    const name = fileName || res.headers['content-disposition'].split("attachment;filename*=utf-8''")[1]
    link.setAttribute('download', decodeURI(name))
    document.body.appendChild(link) 
    link.click() // 点击下载 
    document.body.removeChild(link) // 下载完成移除元素 
    window.URL.revokeObjectURL(link.href) // 释放掉blob对象
    link.remove()
}

export default wl_file_download