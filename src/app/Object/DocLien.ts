export class DocLien{
    url:string;
    nomFichier:string;
    extension:string;
    tailles:string;
    iddocLien?:Number;
    constructor(
        nomFichier:string,
        url:string,
        tailles:string,
        extension:string
    ){
        this.tailles = tailles;
        this.url =  url;
        this.extension = extension;
        this.nomFichier = nomFichier;
    }
}