//Dependências externas
import * as mongoDB from "mongodb";
import * as dotenv from "dotenv";

//Variáveis globais
export const collections: { obras?: mongoDB.Collection } = {}

//Iniciando a conexão
export async function connectToDatabase () {

    // Extrai o arquivo .env para que possa ser acessado de process.env. Nenhum caminho como .env está em root, o local padrão
    dotenv.config();
    
    // Cria um novo cliente do MongoDB com a string de conexão que está no arquivo .env
    const client: mongoDB.MongoClient = new mongoDB.MongoClient(process.env.DB_CONN_STRING);
    
    // Conecta ao cluster
    await client.connect();
    
    // Conecta ao banco de dados com o nome especificado em .env
    const db: mongoDB.Db = client.db(process.env.DB_NAME);

   
    // Conecta à coleção com o noome específico de .env, encontrado no banco de dados anteriormente especificado
    const obrasCollection: mongoDB.Collection = db.collection(process.env.OBRAS_COLLECTION_NAME);
 
    // Verifica a conexão da coleção Obras
    collections.obras = obrasCollection;
       
         console.log(`Conectou com sucesso ao banco de dados: ${db.databaseName} e à coleção: ${obrasCollection.collectionName}!`);
 }
 