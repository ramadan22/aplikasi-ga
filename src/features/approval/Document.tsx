/* eslint-disable react/jsx-one-expression-per-line */
'use client';

import { useSignatureStore } from '@/lib/zustand/UseSignatureStore';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import React, { useMemo, useRef } from 'react';
import Draggable from 'react-draggable';
import SignatureCanvas from 'react-signature-canvas';

const signatures = [
  { id: 1, name: 'Haris Ramadan' },
  { id: 2, name: 'Budi Santoso' },
  { id: 3, name: 'Siti Aminah' },
  { id: 4, name: 'Yani' },
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
        <div style={{ textAlign: 'center', fontWeight: 'bold' }}>{'{kop Perusahaan}'}</div>

        {/* No & Tanggal */}
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
          <div>No: __________________</div>
          <div>{'{tempat}, {tanggal}'}</div>
        </div>

        {/* Tujuan Surat */}
        <div style={{ marginTop: '20px' }}>
          Kepada Yth:
          <br />
          Direktur Jenderal Sumber Daya & Perangkat Pos dan Informatika.
          <br />
          Kementerian Komunikasi dan Informatika
          <br />
          Jl. Medan Merdeka Barat No.17
          <br />
          Jakarta 10110
        </div>

        {/* Perihal */}
        <div style={{ marginTop: '20px', fontWeight: 'bold' }}>
          Perihal : Permohonan Hak Labuh <i>(Landing Right)</i> Satelit Asing
        </div>

        {/* Isi Surat */}
        <div style={{ marginTop: '20px', textAlign: 'justify' }}>
          Bersama ini dengan hormat kami sampaikan bahwa PT. ________________________ yang telah
          memiliki izin penyelenggaraan/ izin prinsip *){' '}
          <i>(sebutkan nama izin penyelenggaraannya)</i> berdasarkan Keputusan ______________ Nomor:
          ______________ perihal ________, bermaksud untuk mengajukan permohonan Hak Labuh{' '}
          <i>(Landing Right)</i> untuk satelit asing sebagai berikut :
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
              <th style={{ border: '1px solid black', padding: '5px' }}>NAMA SATELIT</th>
              <th style={{ border: '1px solid black', padding: '5px' }}>SLOT ORBIT</th>
              <th style={{ border: '1px solid black', padding: '5px' }}>ADMINISTRASI</th>
            </tr>
          </thead>
          <tbody>
            {[1, 2, 3].map(n => (
              <tr key={n}>
                <td style={{ border: '1px solid black', padding: '5px', textAlign: 'center' }}>
                  {n}
                </td>
                <td style={{ border: '1px solid black', padding: '5px' }}></td>
                <td style={{ border: '1px solid black', padding: '5px' }}></td>
                <td style={{ border: '1px solid black', padding: '5px' }}></td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Lanjutan */}
        <div style={{ marginTop: '20px', textAlign: 'justify' }}>
          Adapun satelit asing tersebut di atas akan digunakan untuk keperluan ………………………
          <br />
          <br />
          Sebagai bahan pertimbangan, bersama ini kami lampirkan persyaratan yang diperlukan.
          <br />
          <br />
          Demikian kami sampaikan, atas perhatian dan persetujuan Bapak Dirjen diucapkan terima
          kasih.
        </div>

        {/* 3 Signature draggable */}
        {signatures.map(sig => (
          <Draggable
            key={sig.id}
            nodeRef={dragRefs[sig.id]}
            handle=".drag-handle"
            position={position[sig.id] ?? { x: 0, y: 0 }}
            onStop={(_, data) => setPosition(sig.id, { x: data.x, y: data.y })}
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
                  // paddingLeft: '20px',
                  // paddingRight: '20px',
                  cursor: 'grab',
                  fontSize: '12px',
                  textAlign: 'center',
                  // borderBottom: '1px solid #ccc',
                  position: 'relative',
                  userSelect: 'none',
                }}
              >
                <div className="absolute left-1 drag-icon">⠿</div>
                {sig.name}
                <div className="border-b solid border-[#ccc]" style={{ marginTop: '10px' }} />
              </div>

              {/* Signature pad */}
              <SignatureCanvas
                ref={sigPadRefs[sig.id]}
                penColor="black"
                backgroundColor="white"
                canvasProps={{
                  width: 200,
                  height: 80,
                  className: 'border-gray-300',
                }}
              />
            </div>
          </Draggable>
        ))}
      </div>
    </div>
  );
};

export default ApprovalDocument;
