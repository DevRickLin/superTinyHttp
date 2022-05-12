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
const response_1 = require("../http/response");
const fs = __importStar(require("fs"));
function default_1(preffix, suffix, request, ...param) {
    const getHTML = (url) => {
        return new Promise((resolve, reject) => {
            fs.open(`${process.cwd()}/public/${url === '/' ? '/index' : url}.html`, 'r', (err, fd) => {
                if (err) {
                    reject(err);
                    return;
                }
                fs.read(fd, (err, bytes, buff) => {
                    if (err) {
                        reject(err);
                        return;
                    }
                    resolve({ content: buff.toString() });
                });
            });
        });
    };
    return new Promise((resolve, reject) => {
        getHTML(preffix + suffix)
            .then(({ content }) => {
            return { code: '200', content };
        })
            .catch((err) => __awaiter(this, void 0, void 0, function* () {
            const { content } = yield getHTML('404');
            return { code: '404', content };
        }))
            .catch((err) => __awaiter(this, void 0, void 0, function* () {
            return { code: '404', content: '<h1>Not Found</h1>' };
        }))
            .then(({ code, content }) => {
            resolve(new response_1.Response(code, { 'Content-Type': 'text/html' }, content));
        });
    });
}
exports.default = default_1;
