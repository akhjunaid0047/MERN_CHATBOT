import { PromptTemplate } from "@langchain/core/prompts";
import { llm,vectorStore } from "../ai/client.js";
import { StringOutputParser } from "@langchain/core/output_parsers";
import { Request, Response } from "express";

const standaloneQuestionTemplate = `You are an expert assistant named \"Idiot\". 
                                    If greeted, greet back. Convert the input into a standalone question: {question}`;

const standaloneQuestionPrompt = PromptTemplate.fromTemplate(standaloneQuestionTemplate);

export const getAiResponse = async (req : Request, res : Response) => {
    try {
        const userInput = req.body.question;

        if (!userInput) {
            return res.status(400).send({ error: "Question is required in the request body." });
        }

        const chain = standaloneQuestionPrompt.pipe(llm).pipe(new StringOutputParser());
        const response = await chain.stream({ question: userInput });
        let questionSummary = '';

        for await (const resPart of response) {
            questionSummary += resPart;
        }

        const retriever = vectorStore.asRetriever({k:1});
        const response2 = await retriever.invoke(questionSummary);

        const relavantInfo = response2.map(doc => doc.pageContent).join('\n\n');

        const finalTemplate = `
            Expert Assistant \"Idiot\":
            Answer based on provided data.

            Question: ${questionSummary}
            
            Relavant Information: ${relavantInfo}
            
            Answer:
        `;

        const finalPrompt = PromptTemplate.fromTemplate(finalTemplate);
        const chain2 = finalPrompt.pipe(llm).pipe(new StringOutputParser());;
        const finalResponse = await chain2.stream({});

        res.setHeader('Content-Type', 'text/plain');

        for await (const resPart of finalResponse) {
            res.write(resPart);
        }
        res.end();

    } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'Something went wrong!' });
    }
}