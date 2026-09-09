import { DEMO_DOCUMENTS } from "../data/mockData";
import type { Document, DocumentStatus } from "../types";

export const documentApi = {
  async getDocuments(): Promise<Document[]> {
    await new Promise((r) => setTimeout(r, 500));
    return [...DEMO_DOCUMENTS];
  },

  async uploadDocument(file: File): Promise<Document> {
    await new Promise((r) => setTimeout(r, 800));
    const ext = file.name.split(".").pop()?.toLowerCase();
    const type = (["pdf", "docx", "pptx", "txt"].includes(ext ?? "") ? ext : "pdf") as Document["type"];
    return {
      id: `doc-${Date.now()}`,
      name: file.name,
      type,
      size: file.size,
      status: "uploading",
      uploadedAt: new Date().toISOString().split("T")[0],
    };
  },

  async getDocumentStatus(id: string): Promise<DocumentStatus> {
    await new Promise((r) => setTimeout(r, 400));
    const doc = DEMO_DOCUMENTS.find((d) => d.id === id);
    return doc?.status ?? "ready";
  },
};
