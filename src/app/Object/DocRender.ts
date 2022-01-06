export class Docrender {
    arendre: string;
    expiration: string;
    diffusion: string;
    creation: string;
    description: string;
    titre: string;
    type: string;
    iddocument?: number;
    constructor(arendre: string, expiration: string, diffusion: string, creation: string, description: string, titre: string, type: string) {
        this.arendre = arendre;
        this.description = description;
        this.creation = creation;
        this.titre = titre;
        this.type = type;
        this.expiration = expiration;
        this.diffusion = diffusion;
    }
}