// Dependências externas
import express, { Request, Response } from "express";
import { ObjectId } from "mongodb";
import { collections } from "../services/database.service";
import Obra from "../models/obra";

// Configurações globais
export const obrasRouter = express.Router();

obrasRouter.use(express.json());

// GET
obrasRouter.get("/", async(_req: Request, res:Response) => {
    try {
        const obras = (await collections.obras.find({}).toArray()) as unknown as Obra[];
        res.status(200).send(obras);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// POST
obrasRouter.post("/", async (req:Request, res:Response) => {
    try {
        const newObra = req.body as Obra;
        const result = await collections.obras.insertOne(newObra);
        
        result
        ? res.status(201).send(`Foi criada com sucesso uma nova obra com o seguinte id: ${result.insertedId}`)
        : res.status(500).send("Falhou em criar uma nova obra.");
            
    } catch (error) {
        console.log(error);
        res.status(400).send(error.message);
    }
});

// PUT
obrasRouter.put("/:id", async (req: Request, res: Response) => {
    const id = req?.params?.id;

    try {
        const updatedObra: Obra = req.body as Obra;
        const query = { _id: new ObjectId(id) };

        const result = await collections.obras.updateOne(query, {$set: updatedObra});

        if (result && result.modifiedCount) {
            res.status(202).send(`A obra com o id ${id} foi atualizada com sucesso!`);
        } else if (!result) {
            res.status(400).send(`Falha ao atualizar a obra com o id ${id}.`);
        } else if (!result.modifiedCount) {
            res.status(404).send(`A obra com o id ${id} não existe ou não sofreu alteração de dados!`);
        }

    } catch (error) {
        console.error(error.message);
        res.status(400).send(error.message);
    }
});

// DELETE
obrasRouter.delete("/:id", async (req: Request, res: Response) => {
    const id = req?.params?.id;

    try {
        const query = { _id: new ObjectId(id) };
        const result = await collections.obras.deleteOne(query);

        if (result && result.deletedCount) {
            res.status(202).send(`A obra com o id ${id} foi removida com sucesso!`);
        } else if (!result) {
            res.status(400).send(`Falha ao remover a obra com o id ${id}.`);
        } else if (!result.deletedCount) {
            res.status(404).send(`A obra com o ${id} não existe`);
        }
    } catch (error) {
        console.error(error.message);
        res.status(400).send(error.message);
    }
});
