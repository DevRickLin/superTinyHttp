import { Response } from "../http/response";
import { loader } from "@/type/loader.type";
import { Request } from "@/http/request";
export class Router {
    private wwwRoot = `${process.cwd()}/dist/src/www`;
    async to(url:string,req:Request,...param:any):Promise<Response>{
        return new Promise((resolve,reject)=>{
            const matches = url.match(/^(\/[^\/]*)(.*)/);
            if(matches === null){
                reject(Error(`fatal internal error of \r\n url: ${url} \r\n matches: ${JSON.stringify(matches)}`));
                return;
            }
            const [fullPath,preffix,suffix] = matches;
            import(`${this.wwwRoot}${ preffix }`)
                .then( res => {
                    return { loader: res.default }
                })
                .catch(async (err)=>{
                    console.log('load fail, try normal page... \r\nerr:',err);
                    const res = await (import(`${this.wwwRoot}/index.js`) as Promise<{ default:loader }>);
                    return { loader: res.default };
                })
                .then( res =>{
                    const { loader } = res as { loader : loader };
                    resolve(loader(preffix,suffix,req,...param));
                })
                .catch( err =>{
                    throw Error(`fatal internal error: ${ err }`);
                })
        });
    } 
}