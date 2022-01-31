//Dependências externas
import { ObjectId } from "mongodb";

//Implementação da classe
export default class Obra {
    constructor(public titulo: string, public editora: number, public foto: string, public autores: string, public id?: ObjectId) {}
}