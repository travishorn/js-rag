import { join } from "node:path";
import { OllamaEmbeddings } from "@langchain/ollama";
import { DirectoryLoader } from "langchain/document_loaders/fs/directory";
import { TextLoader } from "langchain/document_loaders/fs/text";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { FaissStore } from "@langchain/community/vectorstores/faiss";

const __dirname = import.meta.dirname;

const loader = new DirectoryLoader(join(__dirname, "../content"), {
  ".md": (path) => new TextLoader(path),
});

const docs = await loader.load();

const textSplitter = new RecursiveCharacterTextSplitter({
  chunkSize: 500,
  chunkOverlap: 0,
});

const allSplits = await textSplitter.splitDocuments(docs);

const embeddings = new OllamaEmbeddings({
  model: "nomic-embed-text",
});

const vectorStore = await FaissStore.fromDocuments(allSplits, embeddings);

await vectorStore.save(join(__dirname, "../vector_store"));

console.log("Vector store built successfully.");
