import { formatDateForDocument } from '@/lib/date-fns';
import { DataApproval } from '../../types';
import { GroupedAsset } from '../../types/Detail';

interface Props {
  data: DataApproval | undefined;
}

export const DocumentContent = ({ data }: Props) => {
  const groupedAssets: GroupedAsset[] = Object.values(
    data?.assets?.reduce<Record<string, GroupedAsset>>((acc, item) => {
      const key = item.name as string;

      if (!acc[key]) {
        acc[key] = {
          name: item?.name || '',
          count: 0,
          isMaintenance: item.isMaintenance || false,
          category: item.category || null,
        };
      }

      acc[key].count += 1;

      return acc;
    }, {}) ?? {},
  );

  return (
    <>
      {/* Kop Perusahaan */}
      <div style={{ textAlign: 'center', fontWeight: 'bold' }}>PT. _____________</div>

      {/* No & Tanggal */}
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
        <div>No: ________/PROC/____/2025</div>
        <div>{formatDateForDocument(data?.createdAt || '')}</div>
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
        Sehubungan dengan kebutuhan perusahaan untuk mendukung kegiatan operasional tim Engineering,
        bersama ini kami mengajukan permohonan pengadaan perangkat laptop sebagai berikut:
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
          {groupedAssets.map((row, idx) => (
            <tr key={`${row.name}-${idx}`}>
              <td style={{ border: '1px solid black', padding: '5px', textAlign: 'center' }}>
                {idx + 1}
              </td>
              <td style={{ border: '1px solid black', padding: '5px' }}>{row.name}</td>
              <td style={{ border: '1px solid black', padding: '5px' }}>
                {row.category?.name ?? '-'}
              </td>
              <td style={{ border: '1px solid black', padding: '5px', textAlign: 'center' }}>
                {row.count}
                &nbsp;Unit
              </td>
            </tr>
          ))}
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
    </>
  );
};
