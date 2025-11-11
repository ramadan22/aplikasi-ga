'use client';

import { useSignatureStore } from '@/lib/zustand/UseSignatureStore';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import React, { useMemo, useRef } from 'react';
import Draggable from 'react-draggable';
import SignatureCanvas from 'react-signature-canvas';

const signatures = [
  { id: 1, name: 'Haris Ramadan', x: 100, y: 100 },
  { id: 2, name: 'Budi Santoso', x: 100, y: 180 },
  // { id: 3, name: 'Siti Aminah', x: 100, y: 260 },
  // { id: 4, name: 'Yani', x: 100, y: 340 },
];

// Tipe bantu untuk peta ref div
type DivRefMap = Record<number, React.RefObject<HTMLDivElement | null>>;
type SigCanvasRefMap = Record<number, React.RefObject<SignatureCanvas | null>>;

const ApprovalDocument: React.FC = () => {
  const { position, setPosition, resetPosition } = useSignatureStore();
  const docRef = useRef<HTMLDivElement>(null);

  // Fungsi pembuat map ref biar DRY
  const createDivRefMap = (): DivRefMap =>
    signatures.reduce((acc, s) => {
      acc[s.id] = React.createRef<HTMLDivElement>();
      return acc;
    }, {} as DivRefMap);

  // Refs stabil per signature
  const dragRefs = useMemo(() => createDivRefMap(), []);
  const handleRefs = useMemo(() => createDivRefMap(), []);

  const sigPadRefs: SigCanvasRefMap = useMemo(
    () =>
      signatures.reduce((acc, s) => {
        acc[s.id] = React.createRef<SignatureCanvas>();
        return acc;
      }, {} as SigCanvasRefMap),
    [],
  );

  const handleExportPDF = async () => {
    if (!docRef.current) return;

    // Simpan style asli & sembunyikan hanya ikon drag
    const originalStyles = signatures.map(s => {
      const dragEl = dragRefs[s.id].current;
      const handleEl = handleRefs[s.id].current;
      const iconEl = handleEl?.querySelector('.drag-icon') as HTMLElement | null;

      if (iconEl) iconEl.style.visibility = 'hidden';

      const snapshot = dragEl && {
        id: s.id,
        border: dragEl.style.border,
        background: dragEl.style.background,
        boxShadow: dragEl.style.boxShadow,
        iconWasHidden: !!iconEl,
      };

      if (dragEl) {
        dragEl.style.border = 'none';
        dragEl.style.background = 'transparent';
        dragEl.style.boxShadow = 'none';
      }

      return snapshot;
    });

    // Capture dokumen
    const canvas = await html2canvas(docRef.current, { scale: 2, useCORS: true });
    const imgData = canvas.toDataURL('image/png');

    const pdf = new jsPDF('p', 'pt', 'a4');
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    pdf.addImage(imgData, 'PNG', 0, 0, pageWidth, pageHeight);
    pdf.save('approval-document.pdf');

    // Kembalikan style & ikon
    originalStyles.forEach(st => {
      if (!st) return;
      const dragEl = dragRefs[st.id].current;
      const handleEl = handleRefs[st.id].current;
      const iconEl = handleEl?.querySelector('.drag-icon') as HTMLElement | null;

      if (dragEl) {
        dragEl.style.border = st.border;
        dragEl.style.background = st.background;
        dragEl.style.boxShadow = st.boxShadow;
      }
      if (iconEl) iconEl.style.visibility = 'visible';
    });
  };

  const getDefaultSignaturePosition = (index: number, total: number) => {
    const baseY = 100; // ✅ posisi lebih tinggi supaya tidak keluar A4
    const sigWidth = 200;
    const gap = 40;

    if (total <= 3) {
      const totalWidth = total * sigWidth + (total - 1) * gap;
      const pageWidth = 794; // A4 px landscape-ish using current scaling
      const startX = (pageWidth - totalWidth) / 2;

      return {
        x: startX + index * (sigWidth + gap),
        y: baseY,
      };
    }

    // jika lebih dari 3, auto 2 row
    const perRow = 3;
    const row = Math.floor(index / perRow);
    const col = index % perRow;

    const totalWidth = perRow * sigWidth + (perRow - 1) * gap;
    const pageWidth = 794;
    const startX = (pageWidth - totalWidth) / 2;

    return {
      x: startX + col * (sigWidth + gap),
      y: baseY + row * 120,
    };
  };

  return (
    <div className="p-4">
      <div className="flex gap-2 mb-4">
        <button onClick={handleExportPDF} className="px-4 py-2 bg-blue-500 text-white rounded">
          Export PDF
        </button>
        <button onClick={resetPosition} className="px-4 py-2 bg-gray-500 text-white rounded">
          Reset Position
        </button>
      </div>

      <div
        ref={docRef}
        style={{
          width: '210mm',
          height: '297mm',
          padding: '20mm',
          backgroundColor: 'white',
          position: 'relative',
          boxShadow: '0 0 5px rgba(0,0,0,0.1)',
        }}
      >
        {/* Kop Perusahaan */}
        <div style={{ textAlign: 'center', fontWeight: 'bold' }}>PT. _____________</div>

        {/* No & Tanggal */}
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
          <div>No: ________/PROC/____/2025</div>
          <div>Jakarta, 25 Oktober 2025</div>
        </div>

        {/* Tujuan Surat */}
        <div style={{ marginTop: '20px' }}>
          Kepada Yth:
          <br />
          Direktur Jenderal Sumber Daya & Perangkat Pos dan Informatika
          <br />
          Kementerian Komunikasi dan Informatika
          <br />
          Jl. Medan Merdeka Barat No.17
          <br />
          Jakarta 10110
        </div>

        {/* Perihal */}
        <div style={{ marginTop: '20px', fontWeight: 'bold' }}>
          Perihal : Pengajuan Pengadaan Barang (Procurement)
        </div>

        {/* Isi Surat */}
        <div style={{ marginTop: '20px', textAlign: 'justify' }}>
          Dengan hormat,
          <br />
          <br />
          Sehubungan dengan kebutuhan perusahaan untuk mendukung kegiatan operasional tim
          Engineering, bersama ini kami mengajukan permohonan pengadaan perangkat laptop sebagai
          berikut:
        </div>

        {/* Tabel */}
        <table
          style={{
            width: '100%',
            borderCollapse: 'collapse',
            marginTop: '20px',
            fontSize: '12pt',
          }}
        >
          <thead>
            <tr>
              <th style={{ border: '1px solid black', padding: '5px' }}>NO</th>
              <th style={{ border: '1px solid black', padding: '5px' }}>NAMA BARANG</th>
              <th style={{ border: '1px solid black', padding: '5px' }}>KATEGORI</th>
              <th style={{ border: '1px solid black', padding: '5px' }}>JUMLAH</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ border: '1px solid black', padding: '5px', textAlign: 'center' }}>1</td>
              <td style={{ border: '1px solid black', padding: '5px' }}>MacBook M1</td>
              <td style={{ border: '1px solid black', padding: '5px' }}>Laptop</td>
              <td style={{ border: '1px solid black', padding: '5px', textAlign: 'center' }}>
                2 Unit
              </td>
            </tr>
            <tr>
              <td style={{ border: '1px solid black', padding: '5px', textAlign: 'center' }}>2</td>
              <td style={{ border: '1px solid black', padding: '5px' }}>MacBook M4</td>
              <td style={{ border: '1px solid black', padding: '5px' }}>Laptop</td>
              <td style={{ border: '1px solid black', padding: '5px', textAlign: 'center' }}>
                1 Unit
              </td>
            </tr>
          </tbody>
        </table>

        {/* Lanjutan */}
        <div style={{ marginTop: '20px', textAlign: 'justify' }}>
          Barang tersebut akan digunakan sebagai perangkat kerja pada tim Engineering guna menunjang
          efisiensi proses pengembangan sistem.
          <br />
          <br />
          Demikian kami sampaikan, atas perhatian dan persetujuannya kami ucapkan terima kasih.
        </div>

        {/* 3 Signature draggable */}
        {signatures.map(sig => (
          <Draggable
            disabled
            key={sig.id}
            nodeRef={dragRefs[sig.id]}
            handle=".drag-handle"
            position={
              position[sig.id] ??
              getDefaultSignaturePosition(
                signatures.findIndex(s => s.id === sig.id),
                signatures.length,
              )
            }
            onStop={(_, data) => setPosition(`${sig.id}`, { x: Number(data.x), y: data.y })}
          >
            <div
              ref={dragRefs[sig.id]}
              style={{
                position: 'absolute',
                background: '#fff',
                border: '1px solid #ccc',
                borderRadius: '4px',
                width: 'max-content',
                boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
              }}
            >
              {/* Handle */}
              <div
                ref={handleRefs[sig.id]}
                className="drag-handle"
                style={{
                  paddingTop: '6px',
                  paddingBottom: '10px',
                  fontSize: '12px',
                  textAlign: 'center',
                  position: 'relative',
                  userSelect: 'none',
                }}
              >
                <div className="absolute left-1 drag-icon">⠿</div>
                {sig.name}
                <div className="" style={{ marginTop: '10px' }} />
              </div>

              {/* Signature pad */}
              <SignatureCanvas
                ref={sigPadRefs[sig.id]}
                penColor="black"
                backgroundColor="white"
                canvasProps={{
                  width: 200,
                  height: 100,
                  className: 'border-gray-300',
                }}
              />

              <div className="border-b solid border-[#ccc]" />
            </div>
          </Draggable>
        ))}
      </div>
    </div>
  );
};

export default ApprovalDocument;
