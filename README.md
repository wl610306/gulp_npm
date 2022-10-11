# 用于 gulp 打包学习， npm 插件编写

# 更新
### version 1.0.0 <br>
#### 2022-09-30 09:40:25 <br>
项目创建   <br>           
### version 1.0.1 <br>
#### 2022-10-09 17:40:25 <br>
新增日期工具类 （日期格式化，日期差值计算，获取某月第一天和最后一天，获取当前日期的前后n个月日期，获取当前日期开始时间和结束时间） <br>   
### version 1.0.2 <br>
#### 2022-10-10 18:00:25 <br>
新增校验工具类 （邮箱，手机号，姓名，中文，英文大小写，空值，特殊字符，身份证号，链接地址...等等） <br>         
### version 1.0.3 <br>
#### 2022-10-11 16:00:25 <br>
新增其他工具类 （字符串掩码，手机号掩码，身份证掩码，JSON数组去重，节流，防抖，序列化，深拷贝，全屏相关方法，数据类型判断...等等） <br>         


### 安装依赖  
npm install

### 项目目录
>gulpfile.js ---- gulp 基础配置文件

>gulpfile_config_file ----  各模块gulp配置文件
>>index.js ---- 各模块配置入口 <br>
>>common.js ---- 公共配置文件 <br>
>>file_load.js ---- 文件下载配置文件 <br>
>>date_util.js ---- 日期工具类配置文件 <br>

>src ---- html, js, css 逻辑代码文件
>>html ---- 入口页面

>npm_plugin ---- 各模块业务逻辑文件
>>wl_date_util ---- 日期工具类 <br>
>>>index.js ---- 逻辑代码入口<br>

>>wl_file_download ---- 文件下载 <br>
>>>index.js ---- 逻辑代码入口 <br>

>>wl_verification_util ---- 校验工具类 <br>
>>>index.js ---- 逻辑代码入口 <br>

