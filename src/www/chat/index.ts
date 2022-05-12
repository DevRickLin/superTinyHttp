import { Request } from "@/http/request";
import { Response } from "@/http/response";
import { LocalStorage } from "node-localstorage";

const localStorage = new LocalStorage('./store');

const MsgStore = {
    save(user:string,msg:string,to:string){
        if(!localStorage.getItem(to)){
            localStorage.setItem(to,JSON.stringify([]));
        }
        const msgArr = JSON.parse(localStorage.getItem(to) as string) || [];
        if(to === 'pub'){
            user = 'pub';
        }
        msgArr.push(`${user}: ${msg}`);
        localStorage.setItem(to,JSON.stringify(msgArr));
    },
    get(user:string):string[]{
        if(!localStorage.getItem(user)){
            localStorage.setItem(user,JSON.stringify([]));
        }
        if(!localStorage.getItem('pub')){
            localStorage.setItem('pub',JSON.stringify([]));
        }
        const userMsgs = JSON.parse(localStorage.getItem(user) as string);
        const pubMsg = JSON.parse(localStorage.getItem('pub') as string);
        return [ ...userMsgs, ...pubMsg];
    }
}

export default function(preffix:string,suffix:string,request:Request,...param:any):Promise<Response>{
    return new Promise(async (resolve,reject)=>{
        const user = request.querys.get('user');
        const msg = request.querys.get('msg');
        const to = request.querys.get('to');
        const asyncWithURL = request.querys.get('async');
        if(asyncWithURL){
            fetch(`${asyncWithURL}/api/async`).then( res => {
                return res.text();
            }).then( data => {
                const pub = JSON.parse(localStorage.getItem('pub') as string) as [];
                localStorage.setItem('pub',JSON.stringify([...(JSON.parse(data) as []),...pub]));
            })
        }
        if(!user || !msg || !to){
            resolve(new Response('502',{ 'Content-Type': 'text/html' },'<h1>miss query params</h1>'));
            return;
        }
        MsgStore.save(user,msg,to);
        resolve(new Response('200',{ 'Content-Type': 'text/html' }, `<h1>current user:${user}</h1>` + MsgStore.get(user).map( msg => `<p>${msg}</p>`)))
    });
}