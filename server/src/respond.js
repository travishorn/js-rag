import { join } from "node:path";
import { OllamaEmbeddings } from "@langchain/ollama";
import { FaissStore } from "@langchain/community/vectorstores/faiss";
import { ChatOllama } from "@langchain/ollama";
import {
  ChatPromptTemplate,
  MessagesPlaceholder,
} from "@langchain/core/prompts";
import { HumanMessage } from "@langchain/core/messages";
import { createStuffDocumentsChain } from "langchain/chains/combine_documents";

const __dirname = import.meta.dirname;

const embeddings = new OllamaEmbeddings({ model: "nomic-embed-text" });

const vectorStore = await FaissStore.load(
  join(__dirname, "../vector_store"),
  embeddings
);

const llm = new ChatOllama({
  baseUrl: "http://localhost:11434",
  model: "gemma",
});

const SYSTEM_TEMPLATE = `Answer the user's questions to the best of your ability using the following context as a guide.
Do not say "based on the provided context," "the provided text suggests," or anything similar.

<context>
{context}
</context>
`;

const prompt = ChatPromptTemplate.fromMessages([
  ["system", SYSTEM_TEMPLATE],
  new MessagesPlaceholder("messages"),
]);

const chain = await createStuffDocumentsChain({ llm, prompt });

export async function respond(question) {
  return await chain.invoke({
    messages: [new HumanMessage(question)],
    context: await vectorStore.similaritySearch(question),
  });
}
