"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const response_1 = require("../../http/response");
function default_1(preffix, suffix, request, ...param) {
    return new Promise((resolve, reject) => {
        Promise.resolve().then(() => __importStar(require(`./${suffix}.js`))).then((module) => {
            return module.default(request, ...param);
        }).then((result) => {
            resolve(new response_1.Response('200', { 'Content-Type': 'application/json' }, JSON.stringify(result)));
        }).catch(err => {
            resolve(new response_1.Response('502', { 'Content-Type': 'application/json' }, JSON.stringify({ err: err.code })));
        });
    });
}
exports.default = default_1;
