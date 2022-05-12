import { Request } from "@/http/request";
import { Response } from "@/http/response";
import { httpStatusCode } from "@/type/http.type";
import * as fs from "fs";
export default function(preffix:string,suffix:string,request:Request,...param:any):Promise<Response>{
    const getHTML =(url:string):Promise<{ content: string }>=> {
        return new Promise((resolve,reject)=>{
            fs.open(`${process.cwd()}/public/${url === '/'?'/index':url}.html`,'r',(err,fd)=>{
                if(err){
                    reject(err);
                    return;
                }
                fs.read(fd,(err,bytes,buff)=>{
                    if(err){
                        reject(err);
                        return;
                    }
                    resolve({ content: buff.toString()});
                }) 
            })
        })
    }
    return new Promise((resolve,reject)=>{
        getHTML(preffix + suffix)
            .then( ({ content }) =>{
                return { code: '200', content } as { code: httpStatusCode, content: string };
            })
            .catch( async err => {
                const { content } = await getHTML('404');
                return { code: '404', content } as { code: httpStatusCode, content: string };
            })
            .catch( async err => {
                return { code: '404', content: '<h1>Not Found</h1>' } as { code: httpStatusCode, content: string };
            })
            .then(({ code, content })=>{
                resolve(new Response(code,{ 'Content-Type': 'text/html'},content));
            })
    });
}