import * as net from "net";
import { Request } from "@/http/request";
import { Router } from "@/component/router";

export class Server {
    private _server: net.Server = new net.Server();
    private _router: Router = new Router();
    private async responseTo(request: Request,sock:net.Socket):Promise<void>{
        console.log(`request: ${request.method} ${request.url} `,'\r\nquery:',request.querys,'\r\nentity:',request.entity);
        if(request.url){
            try{
                const res = await this._router.to(request.url,request);
                sock.write(res.toString());
                sock.end();
            }catch(err){
                console.log(`route to \r\n url: ${request.url} \r\n err:`,err);
                const res = await this._router.to('/404',request);
                sock.write(res.toString());
                sock.end();
            }
        }
    }
    private async read(sock:net.Socket):Promise<Request>{
        return new Promise((resolve,reject)=>{
            sock.on('data',(data)=>{
                resolve(new Request(data));
            })
            sock.on('timeout',()=>{
                reject(Error('connection timeout'));
            })
        });
    }
    public async run(port:number = 80, host:string = '127.0.0.1'){
        this._server.listen(port,host);
        this._server.on('listening',()=>{
            console.log(`server run at\r\nport:${port}\r\nhost:${host}`);
        })
        this._server.on('connection',async (socket)=>{
            const req = await this.read(socket);
            this.responseTo(req,socket);
        })
    }
}
