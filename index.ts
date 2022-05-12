import { Server } from "@/server";
import minimist from "minimist";

const argv = minimist(process.argv.slice(2));

const server = new Server();

let port = 80;

if(argv['port']){
    port = Number(argv['port']);
}

server.run(port,'127.0.0.1');