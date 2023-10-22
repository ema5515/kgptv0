"use server";
import fs from "fs/promises";
import { VectorStoreIndex, Document } from "llamaindex";

export async function loadDocuments(question: string) {
  const file = await fs.readFile(
    "node_modules/llamaindex/examples/abramov.txt",
    "utf-8"
  );
  const doc = new Document({ text: file });
  const index = await VectorStoreIndex.fromDocuments([doc]);

  const queryEngine = index.asQueryEngine();
  const response = await queryEngine.query(question);
  return response.response.toString();
}

export async function loadWithInputFile(files: any[], question: string) {
  const documentArray = files.map((file) => {
    return new Document({ text: file });
  });
  const index = await VectorStoreIndex.fromDocuments(documentArray);

  const queryEngine = index.asQueryEngine();
  const response = await queryEngine.query(question);
  return response.response.toString();
}
