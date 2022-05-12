"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const node_localstorage_1 = require("node-localstorage");
const localStorage = new node_localstorage_1.LocalStorage('./store');
function default_1(request, ...param) {
    return JSON.parse(localStorage.getItem('pub'));
}
exports.default = default_1;
