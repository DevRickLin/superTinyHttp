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
exports.Server = void 0;
const net = __importStar(require("net"));
const request_1 = require("./http/request");
const router_1 = require("./component/router");
class Server {
    constructor() {
        this._server = new net.Server();
        this._router = new router_1.Router();
    }
    responseTo(request, sock) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(`request: ${request.method} ${request.url} `, '\r\nquery:', request.querys, '\r\nentity:', request.entity);
            if (request.url) {
                try {
                    const res = yield this._router.to(request.url, request);
                    sock.write(res.toString());
                    sock.end();
                }
                catch (err) {
                    console.log(`route to \r\n url: ${request.url} \r\n err:`, err);
                    const res = yield this._router.to('/404', request);
                    sock.write(res.toString());
                    sock.end();
                }
            }
        });
    }
    read(sock) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                sock.on('data', (data) => {
                    resolve(new request_1.Request(data));
                });
                sock.on('timeout', () => {
                    reject(Error('connection timeout'));
                });
            });
        });
    }
    run(port = 80, host = '127.0.0.1') {
        return __awaiter(this, void 0, void 0, function* () {
            this._server.listen(port, host);
            this._server.on('listening', () => {
                console.log(`server run at\r\nport:${port}\r\nhost:${host}`);
            });
            this._server.on('connection', (socket) => __awaiter(this, void 0, void 0, function* () {
                const req = yield this.read(socket);
                this.responseTo(req, socket);
            }));
        });
    }
}
exports.Server = Server;
