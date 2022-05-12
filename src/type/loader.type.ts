import { Request } from "@/http/request"
import { Response } from "@/http/response"

export type loader = (preffix:string,suffix:string,request:Request,...param:any)=>Promise<Response>