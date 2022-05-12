import { Request } from "@/http/request";
import { Response } from "@/http/response";
export default function(preffix:string,suffix:string,request:Request,...param:any):Promise<Response>{
    return new Promise((resolve,reject)=>{
        import(`./${suffix}.js`).then((module)=>{
            return module.default(request,...param);
        }).then((result)=>{
            resolve(new Response('200',{ 'Content-Type': 'application/json'},JSON.stringify(result)));
        }).catch( err => {
            resolve(new Response('502',{ 'Content-Type': 'application/json'},JSON.stringify({ err: err.code })));
        })
    });
}