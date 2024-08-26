import { config } from "dotenv";
import { SupabaseVectorStore } from "@langchain/community/vectorstores/supabase";
import createDocumentsFromFile from "./createDocument.js";
import { embeddings, supabaseVectorClient } from "./client.js";
config();

async function createEmbeddings(){
    try {
        const output = await createDocumentsFromFile("idiots.txt");
        console.log(output);

        await SupabaseVectorStore.fromDocuments(output, embeddings, { client: supabaseVectorClient, tableName: 'documents' });
    } catch (error) {
        console.error(error);
    }
}

createEmbeddings();
