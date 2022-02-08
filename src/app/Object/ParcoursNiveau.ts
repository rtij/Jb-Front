import { Niveau } from "./Niveau";
import { Parcours } from "./Parcours";

export class ParcoursN{
    parcours:Parcours;
    Niveau:Niveau[];
    constructor(Parcours:Parcours,Niveau:Niveau[]){
        this.parcours = Parcours;
        this.Niveau = Niveau;
    }
}