export class Flash{
    expiration:Date;
    diffusion:Date;
    info:string;
    idflashInfo?:number
    constructor(info:string,expiration:Date,diffusion:Date,idflashInfo?:number){
        this.info = info;
        this.expiration = expiration;
        this.diffusion = diffusion;
        this.idflashInfo = idflashInfo;
    }
}