import express from "express";
import { connectToDatabase } from "./services/database.service";
import { obrasRouter } from "./routes/obras.router";

const app = express()
const port = 3000 // porta definida ao listen

connectToDatabase()
    .then(() => {
        // envia todas as requisições pro obrasRouter
        app.use("/obras", obrasRouter);

        // inicia o servidor Express
        app.listen(port, () => {
            console.log(`Servidor iniciado em http://localhost:${port}!`);
        })
    })
    .catch((error: Error) => {
        console.error("A conexão ao banco de dados falhou!", error);
        process.exit();
    });
