import { Request } from "@/http/request";
import { LocalStorage } from "node-localstorage";

const localStorage = new LocalStorage('./store');

export default function(request:Request,...param:any){
    return JSON.parse(localStorage.getItem('pub') as string);
}