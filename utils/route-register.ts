'use strict'
import * as express from 'express';
import * as Promise from 'bluebird';
import { Express, Router, Request, Response } from 'express';
import * as Fs from 'fs';
import * as Path from 'path';
import * as IO from './Io';

const router = express.Router();
const cwd = process.cwd();

export interface RouteInfo {
    target: any;
    name: string;
    handler: Function;
    path: string;
    method: string;
}
interface ROUTE {
    methods?: RouteInfo[];
}
export default class RouteRegister {
    static __DecoratedRouters: Array<[{ path: string, method: string }, Function | Function[]]> = [];
    private router: Router;
    private app: Express;
    private jsExtRegex = /\.js$/;
    /**
     * 路由注册
     * @param app 
     * @param module 指定注册哪个目录下的路由
     */
    constructor(app: Express, module: string) {
        this.router = router;
        this.app = app;
        var routerFileDir = Path.resolve(cwd, module);//获取路由文件目录
        var routeFiles = IO.listFiles(routerFileDir, this.jsExtRegex);
        //获取目录下每一个路由文件
        for (var routeFile of routeFiles) {
            var routeModule = require(routeFile);

            var basePath = '/' + Path.relative(routerFileDir, routeFile)
                .replace(/\\/g, '/')
                .replace(this.jsExtRegex, '');

            var RouteClass: ROUTE = routeModule.default;//获取路由文件中的类，再根据类获取静态函数
            if (RouteClass && RouteClass.methods) {
                for (var route of RouteClass.methods) {
                    this.attach(basePath, route);
                }
            }
        }
    }
    private attach(basePath: string, route: RouteInfo): void {
        console.log("basePath:", basePath);
        console.log("route:", route);
        var expressMethod: Function = (<any>this.app)[route.method];
        console.log("expressMethod:", expressMethod);

        let methodName = route.name;
        let methodPath = route.path;
        let path: string;

        path = basePath + methodPath;

        expressMethod.call(this.app, path, (req: Request, res: Response) => {
            new Promise((resolve, reject) => {
                return route.handler.call(route.target, req, res)
                .then(data=>{
                    res.send(data);
                })
            })
        })

    }
    // TODO 实现自动路由，不需要再指定path参数，直接根据函数名来生成路由
    registerRouters() {
        for (let [config, controller] of RouteRegister.__DecoratedRouters) {
            let controllers = Array.isArray(controller) ? controller : [controller]
            controllers.forEach((controller) => this.router[config.method](config.path, controller))
        }
        //app.use和app.get的区别：可以理解为app.use加载的是一堆的路由，前缀匹配的都会经过比如app.use('/a'),app.get('/a/b')都会经过app.use
        //express.Router()和app也是类似的，完全可以直接app.get,app.post,app.put等方式注册路由
        this.app.use(this.router)
    }
}