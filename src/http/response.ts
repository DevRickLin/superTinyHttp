import { httpStatusCode } from "@/type/http.type";
import * as list from "http-status-code-json-list";
export class Response {
    private _version:string;
    private _code: httpStatusCode;
    private _headers:string = '';
    private _entity?:string;
    constructor(code:httpStatusCode,headers?:Object,entity?:string,version:string = 'HTTP/1.0'){
        this._version = version;
        this._code = code;
        if(headers){
            let headerLine: keyof typeof headers;
            for(headerLine in headers){
                this._headers += `${headerLine}: ${headers[headerLine]}\r\n`;
            }
        }
        this._entity = entity;
    }
    public toString(){
        return (
            `${this._version} ${this._code} ${list[this._code].phrase}\r\n` +
            this._headers +
            '\r\n' +
            (this._entity??'')
        )
    }
}