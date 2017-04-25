"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var route_1 = require("../utils/route");
var Routes = (function () {
    function Routes() {
    }
    Routes.default = function (req, res, next) {
        console.log(">>>>>>>>>>>>>default");
        res.send(">>>>>>>>>>>>>>>>>>>>>>>>default");
    };
    Routes.index = function (req, res, next) {
        console.log(">>>>>>>>>>>>>index");
        res.send(">>>>>>>>>>>>>>>>>>>>>>>>index");
    };
    Routes.home = function (req, res, next) {
        console.log(">>>>>>>>>>>>>home");
        res.send(">>>>>>>>>>>>>>>>>>>>>>>>home");
    };
    return Routes;
}());
__decorate([
    route_1.route({
        path: "/",
        method: "get"
    })
], Routes, "default", null);
__decorate([
    route_1.route({
        path: "/index",
        method: "get"
    })
], Routes, "index", null);
__decorate([
    route_1.route({
        path: "/home",
        method: "get"
    })
], Routes, "home", null);
exports.Routes = Routes;
