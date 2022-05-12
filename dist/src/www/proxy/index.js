"use strict";
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
const response_1 = require("../../http/response");
function default_1(preffix, suffix, request, ...param) {
    return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
        const target = request.querys.get('target');
        if (target) {
            fetch(target)
                .then((res) => __awaiter(this, void 0, void 0, function* () {
                console.log(`proxyResponse>>> [${res.status}] ${res.statusText}`);
                const myHeaders = Object.fromEntries(res.headers.entries());
                try {
                    const entity = yield res.text();
                    console.log('response>>>headers:\r\n', myHeaders, 'entity:\r\n', entity);
                    resolve(new response_1.Response('200', { 'Content-Type': 'text/html; charset=utf-8' }, entity));
                }
                catch (err) {
                    console.log('fetch test fail', err);
                    throw err;
                }
            }))
                .catch(err => {
                resolve(new response_1.Response('502', { 'Content-Type': 'application/json' }, JSON.stringify({ err: err })));
            });
        }
    }));
}
exports.default = default_1;
