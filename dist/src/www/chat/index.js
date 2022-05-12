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
const node_localstorage_1 = require("node-localstorage");
const localStorage = new node_localstorage_1.LocalStorage('./store');
const MsgStore = {
    save(user, msg, to) {
        if (!localStorage.getItem(to)) {
            localStorage.setItem(to, JSON.stringify([]));
        }
        const msgArr = JSON.parse(localStorage.getItem(to)) || [];
        if (to === 'pub') {
            user = 'pub';
        }
        msgArr.push(`${user}: ${msg}`);
        localStorage.setItem(to, JSON.stringify(msgArr));
    },
    get(user) {
        if (!localStorage.getItem(user)) {
            localStorage.setItem(user, JSON.stringify([]));
        }
        if (!localStorage.getItem('pub')) {
            localStorage.setItem('pub', JSON.stringify([]));
        }
        const userMsgs = JSON.parse(localStorage.getItem(user));
        const pubMsg = JSON.parse(localStorage.getItem('pub'));
        return [...userMsgs, ...pubMsg];
    }
};
function default_1(preffix, suffix, request, ...param) {
    return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
        const user = request.querys.get('user');
        const msg = request.querys.get('msg');
        const to = request.querys.get('to');
        const asyncWithURL = request.querys.get('async');
        if (asyncWithURL) {
            fetch(`${asyncWithURL}/api/async`).then(res => {
                return res.text();
            }).then(data => {
                const pub = JSON.parse(localStorage.getItem('pub'));
                localStorage.setItem('pub', JSON.stringify([...JSON.parse(data), ...pub]));
            });
        }
        if (!user || !msg || !to) {
            resolve(new response_1.Response('502', { 'Content-Type': 'text/html' }, '<h1>miss query params</h1>'));
            return;
        }
        MsgStore.save(user, msg, to);
        resolve(new response_1.Response('200', { 'Content-Type': 'text/html' }, `<h1>current user:${user}</h1>` + MsgStore.get(user).map(msg => `<p>${msg}</p>`)));
    }));
}
exports.default = default_1;
