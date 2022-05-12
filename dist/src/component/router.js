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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Router = void 0;
class Router {
    constructor() {
        this.wwwRoot = `${process.cwd()}/dist/src/www`;
    }
    to(url, req, ...param) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                const matches = url.match(/^(\/[^\/]*)(.*)/);
                if (matches === null) {
                    reject(Error(`fatal internal error of \r\n url: ${url} \r\n matches: ${JSON.stringify(matches)}`));
                    return;
                }
                const [fullPath, preffix, suffix] = matches;
                Promise.resolve().then(() => __importStar(require(`${this.wwwRoot}${preffix}`))).then(res => {
                    return { loader: res.default };
                })
                    .catch((err) => __awaiter(this, void 0, void 0, function* () {
                    console.log('load fail, try normal page... \r\nerr:', err);
                    const res = yield Promise.resolve().then(() => __importStar(require(`${this.wwwRoot}/index.js`)));
                    return { loader: res.default };
                }))
                    .then(res => {
                    const { loader } = res;
                    resolve(loader(preffix, suffix, req, ...param));
                })
                    .catch(err => {
                    throw Error(`fatal internal error: ${err}`);
                });
            });
        });
    }
}
exports.Router = Router;
