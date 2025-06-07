// components/PdfViewer.jsx
"use client";
import { pdfjs } from "react-pdf";
import { Document, Page } from "react-pdf";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url,
).toString();

export default function PdfViewer({ url }: { url: string }) {
  return (
    <div>
      <Document file={url}>
        <Page
          pageNumber={1}
          renderTextLayer={false}
          renderAnnotationLayer={false}
          width={300}
        />
      </Document>
    </div>
  );
}
