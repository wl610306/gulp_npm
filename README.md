# 用于 gulp 打包学习， npm 插件编写

# 更新
### version 1.0.0 <br>
#### 2022-09-30 09:40:25 <br>
项目创建   <br>           
### version 1.0.1 <br>
#### 2022-10-09 17:40:25 <br>
添加日期工具类 （日期格式化，日期差值计算，获取某月第一天和最后一天，获取当前日期的前后n个月日期，获取当前日期开始时间和结束时间） <br>         


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
>>wl_date_util ---- 日期格式化 日期差计算 <br>
>>>index.js ---- 逻辑代码入口<br>
>>
>>wl_file_download ---- 文件下载 <br>
>>>index.js ---- 逻辑代码入口 <br>

