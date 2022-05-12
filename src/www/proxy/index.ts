import { Request } from "@/http/request";
import { Response } from "@/http/response";
export default function(preffix:string,suffix:string,request:Request,...param:any):Promise<Response>{
    return new Promise(async (resolve,reject)=>{
        const target = request.querys.get('target');
        if(target){
            fetch(target)
                .then( async res => {
                    console.log(`proxyResponse>>> [${res.status}] ${res.statusText}`);
                    const myHeaders = Object.fromEntries(res.headers.entries());
                    try{
                        const entity = await res.text();
                        console.log('response>>>headers:\r\n',myHeaders,'entity:\r\n',entity);
                        resolve(new Response('200', { 'Content-Type': 'text/html; charset=utf-8' }, entity ))
                    }catch(err){
                        console.log('fetch test fail',err);
                        throw err;
                    }
                })
                .catch( err => {
                    resolve(new Response('502',{ 'Content-Type': 'application/json'},JSON.stringify( { err: err })));
                })
        }
    });
}