import OpenAI from "openai";
import { config } from "dotenv";
config();
const apiKey = process.env.OPENAI_API;
console.log(apiKey);
const openai = new OpenAI({ apiKey: apiKey });

async function main() {
    const stream = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [{ role: "user", content: "Say this is a test" }],
        stream: true,
    });

    for await (const chunk of stream) {
        process.stdout.write(chunk.choices[0]?.delta?.content || "");
    }
}

main();
