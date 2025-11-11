'use client';

import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { RefObject } from 'react';
import SignatureCanvas from 'react-signature-canvas';

interface ExportPdfOptions {
  signatures: { id: string }[];
  dragRefs: Record<string, RefObject<HTMLDivElement | null>>;
  handleRefs: Record<string, RefObject<HTMLDivElement | null>>;
  sigPadRefs: Record<string, RefObject<SignatureCanvas | null>>;
}

export const useExportPdf = () => {
  const exportToPdf = async (
    doc: HTMLDivElement,
    { signatures, dragRefs, handleRefs, sigPadRefs }: ExportPdfOptions,
  ) => {
    const originalStyles = signatures.map(s => {
      const dragEl = dragRefs[s.id]?.current;
      const handleEl = handleRefs[s.id]?.current;
      const canvasEl = sigPadRefs[s.id]?.current?.getCanvas();
      const iconEl = handleEl?.querySelector('.drag-icon') as HTMLElement | null;

      const snapshot = dragEl && {
        id: s.id,
        border: dragEl.style.border,
        borderBottom: dragEl.style.borderBottom,
        background: dragEl.style.background,
        boxShadow: dragEl.style.boxShadow,
        canvasBorder: canvasEl?.style.border,
        iconWasHidden: !!iconEl,
      };

      if (dragEl) {
        dragEl.style.border = 'none';
        dragEl.style.borderBottom = '1px solid #000'; // ✅ hanya garis bawah
        dragEl.style.background = 'transparent';
        dragEl.style.boxShadow = 'none';
      }

      if (canvasEl) {
        canvasEl.style.border = 'none';
      }

      if (iconEl) iconEl.style.visibility = 'hidden';

      return snapshot;
    });

    const canvas = await html2canvas(doc, { scale: 2, useCORS: true });
    const imgData = canvas.toDataURL('image/png');

    const pdf = new jsPDF('p', 'pt', 'a4');
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    pdf.addImage(imgData, 'PNG', 0, 0, pageWidth, pageHeight);
    pdf.save('approval-document.pdf');

    originalStyles.forEach(st => {
      if (!st) return;

      const dragEl = dragRefs[st.id]?.current;
      const handleEl = handleRefs[st.id]?.current;
      const canvasEl = sigPadRefs[st.id]?.current?.getCanvas();
      const iconEl = handleEl?.querySelector('.drag-icon') as HTMLElement | null;

      if (dragEl) {
        dragEl.style.border = st.border;
        dragEl.style.borderBottom = st.borderBottom; // ✅ restore garis bawaan
        dragEl.style.background = st.background;
        dragEl.style.boxShadow = st.boxShadow;
      }

      if (canvasEl && st.canvasBorder) {
        canvasEl.style.border = st.canvasBorder;
      }

      if (iconEl && st.iconWasHidden) {
        iconEl.style.visibility = 'visible';
      }
    });
  };

  return { exportToPdf };
};
