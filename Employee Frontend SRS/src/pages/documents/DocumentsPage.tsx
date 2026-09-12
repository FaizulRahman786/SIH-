import { useEffect, useState, useRef, useCallback } from "react";
import { useNavigate } from "react-router";
import {
  Upload, FileText, CheckCircle, Loader2, AlertCircle,
  Brain, FileSearch, Zap, ArrowRight,
} from "lucide-react";
import { documentApi } from "../../services/documentApi";
import type { Document, DocumentStatus } from "../../types";
import { Skeleton } from "../../components/common/Skeleton";
import { EmptyState } from "../../components/common/EmptyState";

const PROCESS_STEPS: Array<{ key: DocumentStatus; label: string; icon: React.ElementType }> = [
  { key: "uploading", label: "Uploading file", icon: Upload },
  { key: "extracting", label: "Extracting content", icon: FileSearch },
  { key: "understanding", label: "AI understanding", icon: Brain },
  { key: "generating", label: "Generating assessment", icon: Zap },
  { key: "ready", label: "Assessment ready", icon: CheckCircle },
];

const STATUS_ORDER: DocumentStatus[] = ["uploading", "extracting", "understanding", "generating", "ready"];

function ProcessingStepper({ status }: { status: DocumentStatus }) {
  const currentIndex = STATUS_ORDER.indexOf(status);

  return (
    <div className="space-y-2">
      {PROCESS_STEPS.map((step, i) => {
        const isDone = i < currentIndex;
        const isActive = i === currentIndex;
        const Icon = step.icon;
        return (
          <div key={step.key} className={`flex items-center gap-3 p-2.5 rounded-lg transition-all ${isActive ? "bg-[var(--color-blue-muted)]" : ""}`}>
            <div className={`
              w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0
              ${isDone ? "bg-green-500" : isActive ? "bg-[var(--color-blue-primary)]" : "bg-[var(--color-muted)]"}
            `}>
              {isActive ? (
                <Loader2 size={12} className="text-white animate-spin" />
              ) : (
                <Icon size={12} className={isDone || isActive ? "text-white" : "text-[var(--color-muted-fg)]"} />
              )}
            </div>
            <span className={`text-xs font-medium ${isActive ? "text-[var(--color-blue-primary)]" : isDone ? "text-green-600" : "text-[var(--color-muted-fg)]"}`}>
              {step.label}
            </span>
            {isDone && <CheckCircle size={12} className="text-green-500 ml-auto" />}
          </div>
        );
      })}
    </div>
  );
}

function DocumentCard({ doc, index }: { doc: Document; index: number }) {
  const navigate = useNavigate();
  const isProcessing = doc.status !== "ready" && doc.status !== "failed";
  const sizeKB = Math.round(doc.size / 1024);

  return (
    <div
      className={`bg-[var(--color-surface)] rounded-xl border p-5 animate-fade-in-up transition-all ${
        doc.status === "ready" ? "border-[var(--color-border)] hover:border-[var(--color-blue-primary)] hover:shadow-[var(--shadow)]" :
        doc.status === "failed" ? "border-[var(--color-critical-fg)]/30 bg-[var(--color-critical-bg)]" :
        "border-[var(--color-blue-primary)]/30 bg-[var(--color-blue-muted)]"
      }`}
      style={{ animationDelay: `${index * 60}ms` }}
    >
      <div className="flex items-start gap-3 mb-3">
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${doc.status === "ready" ? "bg-[var(--color-blue-muted)]" : "bg-[var(--color-surface)]"}`}>
          <FileText size={18} className="text-[var(--color-blue-primary)]" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-sm font-medium text-[var(--color-text)] truncate">{doc.name}</div>
          <div className="text-[11px] text-[var(--color-muted-fg)] mt-0.5">
            {sizeKB > 1024 ? `${(sizeKB / 1024).toFixed(1)} MB` : `${sizeKB} KB`}
            {doc.pageCount && ` · ${doc.pageCount} pages`}
            {" · Uploaded " + doc.uploadedAt}
          </div>
        </div>
      </div>

      {isProcessing && <ProcessingStepper status={doc.status} />}

      {doc.status === "ready" && (
        <>
          {doc.topics && doc.topics.length > 0 && (
            <div className="flex flex-wrap gap-1 mb-3">
              {doc.topics.map((t) => (
                <span key={t} className="text-[10px] bg-[var(--color-muted)] text-[var(--color-text-secondary)] px-2 py-0.5 rounded-full">{t}</span>
              ))}
            </div>
          )}
          <button
            onClick={() => navigate(`/assessments/${doc.assessmentId}`)}
            className="w-full flex items-center justify-center gap-1.5 py-2 text-xs font-semibold text-[var(--color-blue-primary)] border border-[var(--color-blue-primary)] rounded-lg hover:bg-[var(--color-blue-muted)] transition-colors"
          >
            Take Assessment <ArrowRight size={12} />
          </button>
        </>
      )}

      {doc.status === "failed" && (
        <div className="flex items-center gap-2 text-xs text-red-600">
          <AlertCircle size={14} />
          Processing failed. Please try uploading again.
        </div>
      )}
    </div>
  );
}

export default function DocumentsPage() {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDragOver, setIsDragOver] = useState(false);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    documentApi.getDocuments().then(setDocuments).finally(() => setLoading(false));
  }, []);

  const handleFiles = useCallback(async (files: FileList | null) => {
    if (!files || files.length === 0) return;
    const file = files[0];
    const allowed = ["application/pdf", "application/vnd.openxmlformats-officedocument.wordprocessingml.document", "text/plain"];
    if (!allowed.includes(file.type) && !file.name.endsWith(".pptx")) {
      alert("Please upload a PDF, DOCX, PPTX, or TXT file.");
      return;
    }
    setUploading(true);
    const newDoc = await documentApi.uploadDocument(file);
    setDocuments((prev) => [newDoc, ...prev]);
    setUploading(false);

    const stages: DocumentStatus[] = ["extracting", "understanding", "generating", "ready"];
    for (const stage of stages) {
      await new Promise((r) => setTimeout(r, 1200));
      setDocuments((prev) =>
        prev.map((d) =>
          d.id === newDoc.id
            ? {
                ...d,
                status: stage,
                ...(stage === "ready"
                  ? {
                      assessmentId: "assess-004",
                      pageCount: 34,
                      topics: ["Statistical Inference", "Sampling Distribution", "Official Indicators"],
                    }
                  : {}),
              }
            : d
        )
      );
    }
  }, []);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    handleFiles(e.dataTransfer.files);
  };

  return (
    <div className="p-5 lg:p-7 max-w-3xl mx-auto space-y-5">
      <div className="animate-fade-in">
        <h1 className="text-xl font-bold text-[var(--color-text)]" style={{ fontFamily: "var(--font-display)" }}>
          Learning Documents
        </h1>
        <p className="text-sm text-[var(--color-muted-fg)] mt-0.5">
          Upload a document to generate an AI-powered assessment.
        </p>
      </div>

      {/* Upload zone */}
      <div
        onDrop={handleDrop}
        onDragOver={(e) => { e.preventDefault(); setIsDragOver(true); }}
        onDragLeave={() => setIsDragOver(false)}
        onClick={() => fileInputRef.current?.click()}
        className={`
          relative border-2 border-dashed rounded-2xl p-10 text-center cursor-pointer transition-all
          ${isDragOver ? "border-[var(--color-blue-primary)] bg-[var(--color-blue-muted)]" :
            "border-[var(--color-border)] hover:border-[var(--color-blue-primary)] hover:bg-[var(--color-muted)]"}
        `}
        role="button"
        aria-label="Upload document"
        tabIndex={0}
        onKeyDown={(e) => e.key === "Enter" && fileInputRef.current?.click()}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept=".pdf,.docx,.pptx,.txt"
          className="hidden"
          onChange={(e) => handleFiles(e.target.files)}
          aria-label="Choose file"
        />
        <div className="flex flex-col items-center gap-3">
          {uploading ? (
            <Loader2 size={32} className="text-[var(--color-blue-primary)] animate-spin" />
          ) : (
            <div className="w-12 h-12 rounded-2xl bg-[var(--color-blue-muted)] flex items-center justify-center">
              <Upload size={22} className="text-[var(--color-blue-primary)]" />
            </div>
          )}
          <div>
            <div className="text-sm font-semibold text-[var(--color-text)]">
              {uploading ? "Uploading…" : "Drag & drop or click to upload"}
            </div>
            <div className="text-xs text-[var(--color-muted-fg)] mt-1">PDF, DOCX, PPTX, TXT · Max 50 MB</div>
          </div>
        </div>
      </div>

      {/* How it works */}
      <div className="bg-[var(--color-surface)] rounded-xl border border-[var(--color-border)] p-5">
        <h2 className="text-sm font-semibold text-[var(--color-text)] mb-4" style={{ fontFamily: "var(--font-display)" }}>
          How it works
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { step: "1", label: "Upload document", icon: Upload },
            { step: "2", label: "AI reads & understands", icon: Brain },
            { step: "3", label: "Assessment generated", icon: Zap },
            { step: "4", label: "Test your knowledge", icon: CheckCircle },
          ].map(({ step, label, icon: Icon }) => (
            <div key={step} className="flex flex-col items-center gap-2 text-center">
              <div className="w-9 h-9 rounded-xl bg-[var(--color-blue-muted)] flex items-center justify-center">
                <Icon size={16} className="text-[var(--color-blue-primary)]" />
              </div>
              <div className="text-[10px] font-mono text-[var(--color-muted-fg)] uppercase tracking-wider">Step {step}</div>
              <div className="text-xs text-[var(--color-text-secondary)]">{label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Document list */}
      <div>
        <h2 className="text-sm font-semibold text-[var(--color-text)] mb-3" style={{ fontFamily: "var(--font-display)" }}>
          Your Documents
        </h2>
        {loading ? (
          <div className="space-y-3">{[...Array(2)].map((_, i) => <Skeleton key={i} className="h-28" />)}</div>
        ) : documents.length === 0 ? (
          <EmptyState
            icon={FileText}
            title="No documents uploaded"
            description="Upload a learning document to generate your first AI-powered assessment."
          />
        ) : (
          <div className="space-y-3">
            {documents.map((doc, i) => <DocumentCard key={doc.id} doc={doc} index={i} />)}
          </div>
        )}
      </div>
    </div>
  );
}
