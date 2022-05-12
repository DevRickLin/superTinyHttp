export class Request {
    public url?:string;
    public method?:string;
    public version?:string;
    public querys = new Map<string,string>();
    public headers:string[] = [];
    public entity:any | null = null;
    constructor(data:Buffer){
        const lines = data.toString('utf8').split('\r\n');
        const statusRegExp = /([^ ]*) ([^ ]*) (.*)/g;
        const status = statusRegExp.exec(lines[0]);
        if(status != null){
            const [full,method,url,version] = status;
            this.method = method;
            const urlQuery = /^([^?]*)(.*)/g.exec(url);
            if(urlQuery != null){
                const [fullURL,pureUrl,querys] = urlQuery;
                this.url = pureUrl;
                const matches = querys.match(/\??([^=]+=[^?]+)/g);
                if(matches != null){
                    matches.map( str => {
                        const [full,key,val] = /\?([^=]*)=(.*)/g.exec(str) as RegExpExecArray;
                       return { key, val };
                    }).forEach( ({key,val})=> {
                        this.querys.set(key,val);
                    });
                }
            }else{
                this.url = url;
            }
            this.version = version;
        }
        lines.splice(0,1);
        let headersEnd = false;
        let _tempEntity:string = '';
        for(const line of lines){
            if(line === '\r\n'){
                headersEnd = true;
            }
            if(headersEnd){
                _tempEntity += line;
                return;
            }
            this.headers?.push(line);
        }
        try{
            this.entity = JSON.parse(_tempEntity);
        }catch(err){
            this.entity = null;
        }
    }
}