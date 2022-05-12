import { Request } from "@/http/request";

export default function(request:Request,...param:any){
    const arg = request.entity;
    return `<h1>${ 1 + 1 }</h1>`
}