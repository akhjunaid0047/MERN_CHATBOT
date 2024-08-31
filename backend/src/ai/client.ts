import { ChatOpenAI, OpenAIEmbeddings } from "@langchain/openai";
import { SupabaseVectorStore } from "@langchain/community/vectorstores/supabase";
import { createClient } from "@supabase/supabase-js";
import { config } from "dotenv";
config();

export const openaiApiKey = process.env.OPENAI_API;
export const sbApiKey = process.env.SUPABASE_APIKEY;
export const sbUrl = process.env.SUPABASE_URL;

export const embeddings = new OpenAIEmbeddings({
    openAIApiKey: openaiApiKey,
    model: "text-embedding-3-large",
});

export const supabaseVectorClient = createClient(sbUrl, sbApiKey);

export const llm = new ChatOpenAI({ openAIApiKey: openaiApiKey, model: "gpt-4o-mini" });
export const vectorStore = new SupabaseVectorStore(embeddings, {
    client: supabaseVectorClient,
    tableName: "documents2",
    queryName: "match_documents2"
});

