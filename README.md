# yuedun_ts
使用typescript开发博客，开发环境配置和调试。
## 第一步：基础框架搭建

基础框架使用express4，安装express-generator
> npm install -g express-generator

>  express --view=ejs tsp

利用express生成器快速生成一个express项目结构
```
├─bin
├─public
│  ├─images
│  ├─javascripts
│  └─stylesheets
├─routes
└─views
```

生成的代码是js格式的，为了使用typescript开发，可以将`app.js`和`bin\，routes\，`目录下的js文件改为`.ts`格式，直接修改后的代码也不会有什么问题，因为typescript是javascript
的超集，可以兼容js代码。

## 第二步：配置typescript环境

> tsc --init

在根目录生成默认的tsconfig.json文件，可以根据自身需要进行配置，以下是经过配置的文件
tsconfig.json配置说明：
```javascript
{
    "compilerOptions": {
        "module": "commonjs",//模块化规范
        "target": "es5",//生成js版本
        "noImplicitAny": true,//
        "noImplicitReturns": true,//函数没有返回值提示
        "noFallthroughCasesInSwitch": true,//switch没有break提示
        "removeComments": true,//输出文件移除注释
        "noEmitOnError": true,//ts文件错误时不生成js
        "rootDir": "./",//需要编译的根目录
        "outDir": "./build",//编译文件输出目录
        "sourceMap": ture//是否生成.map文件，用于ts debug调试
    },
    "include": [
        "*/**/*.ts"
    ],
    "exclude": [
        //默认排除了node_modules
    ]    
}
```
使用include，exclude代替下面
```
"filesGlob": [
        "*/**/*.ts",
        "!node_modules/**",
        "!typings/**"
    ]
```
配置完tsconfig.json后需要安装Definitely（ts定义文件），以下两种tsd和typings都已成历史，目前可以直接使用npm安装，可以直接跳到第三步。

> tsd

包管理已弃用，使用typings包管理
> npm install typings -g

> typings init

初始化typings.json文件
typings相关文档[https://github.com/typings/typings](https://github.com/typings/typings)
常用typings命令：
> typings search --name react

根据名称搜索模块

> typings install debug --save

> typings install dt~node --global --save
保存模块，一般第三方模块使用第二条命令

## 第三步：安装Definitely定义文件

> npm install @types/node --save-dev

和普通的npm包区别就是加了`@types/`,在npmjs.com也可以加上@types/搜索相关定义文件。
在命令行中切换到项目根目录下就可以执行`tsc`命令。
第一次执行可能不太顺利，会报一些错误，一般会是类型错误，可以先简单的声明为any类型，这只是用来应急处理的，如果熟悉typescript就设置为对应的类型，这才是使用typescript的正确姿势。一切就绪的话会在`build`目录下生成对应的目录的js文件。如果没有对tsconfig.json进行自定义配置的话会在ts文件同目录下生成js文件。

在命令行执行`tsc`命令并没有加参数，却依然按照`tsconfig.json`配置来执行，说明编译器会从当前目录开始去查找tsconfig.json文件，逐级向上搜索父目录。