"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Request = void 0;
class Request {
    constructor(data) {
        var _a;
        this.querys = new Map();
        this.headers = [];
        this.entity = null;
        const lines = data.toString('utf8').split('\r\n');
        const statusRegExp = /([^ ]*) ([^ ]*) (.*)/g;
        const status = statusRegExp.exec(lines[0]);
        if (status != null) {
            const [full, method, url, version] = status;
            this.method = method;
            const urlQuery = /^([^?]*)(.*)/g.exec(url);
            if (urlQuery != null) {
                const [fullURL, pureUrl, querys] = urlQuery;
                this.url = pureUrl;
                const matches = querys.match(/\??([^=]+=[^?]+)/g);
                if (matches != null) {
                    matches.map(str => {
                        const [full, key, val] = /\?([^=]*)=(.*)/g.exec(str);
                        return { key, val };
                    }).forEach(({ key, val }) => {
                        this.querys.set(key, val);
                    });
                }
            }
            else {
                this.url = url;
            }
            this.version = version;
        }
        lines.splice(0, 1);
        let headersEnd = false;
        let _tempEntity = '';
        for (const line of lines) {
            if (line === '\r\n') {
                headersEnd = true;
            }
            if (headersEnd) {
                _tempEntity += line;
                return;
            }
            (_a = this.headers) === null || _a === void 0 ? void 0 : _a.push(line);
        }
        try {
            this.entity = JSON.parse(_tempEntity);
        }
        catch (err) {
            this.entity = null;
        }
    }
}
exports.Request = Request;
