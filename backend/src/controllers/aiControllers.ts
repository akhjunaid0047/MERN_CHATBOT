import { PromptTemplate } from "@langchain/core/prompts";
import { llm, vectorStore } from "../ai/client.js";
import { StringOutputParser } from "@langchain/core/output_parsers";
import { Request, Response } from "express";
import users from "../models/user.js"
const standaloneQuestionTemplate = `You are an expert assistant named \"Idiot\". 
                                    If greeted, greet back. Convert the input into a standalone question: {question}`;

const standaloneQuestionPrompt = PromptTemplate.fromTemplate(standaloneQuestionTemplate);

export const getAiResponse = async (req: Request, res: Response) => {
    try {

        const user = await users.findById(res.locals.jwtData.id);
        if (!user)
            return res.status(401).json({ message: "User not registered OR Token malfunctioned" });

        const userInput = req.body.question;
        if (!userInput) {
            return res.status(400).send({ error: "Question is required in the request body." });
        }

        user.chats.push({ role: "user", content: userInput });

        // const chain = standaloneQuestionPrompt.pipe(llm);
        // const response = await chain.invoke({ question: userInput });
        // const questionSummary = response.content.toString();

        const retriever = vectorStore.asRetriever({ k: 1 });
        const response2 = await retriever.invoke(userInput);

        const relavantInfo = response2.map(doc => doc.pageContent).join('\n\n');

        const finalTemplate = `
            Expert Assistant \"Idiot\":
            Answer based on provided data.

            Question: ${userInput}
            
            Relavant Information: ${relavantInfo}
            
            Answer:
        `;

        const finalPrompt = PromptTemplate.fromTemplate(finalTemplate);
        const chain2 = finalPrompt.pipe(llm).pipe(new StringOutputParser());;
        const finalResponse = await chain2.invoke({});

        res.setHeader('Content-Type', 'text/plain');

        // for await (const resPart of finalResponse) {
        //     res.write(resPart);
        // }
        // res.end();


        // user.chats.push({ role: "assistant", content: `${finalResponse}` });
        // await user.save();

        res.send(finalResponse);
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'Something went wrong!' });
    }
}