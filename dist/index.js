"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = require("./src/server");
const minimist_1 = __importDefault(require("minimist"));
const argv = (0, minimist_1.default)(process.argv.slice(2));
const server = new server_1.Server();
let port = 80;
if (argv['port']) {
    port = Number(argv['port']);
}
server.run(port, '127.0.0.1');
