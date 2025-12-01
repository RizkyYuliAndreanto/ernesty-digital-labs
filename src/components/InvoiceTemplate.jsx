// src/components/InvoiceTemplate.jsx

import React from "react";

// Fungsi utilitas untuk format mata uang
const formatCurrency = (value) => {
  if (typeof value !== "number") return "IDR 0";
  return "IDR " + value.toLocaleString("id-ID");
};

const InvoiceTemplate = ({ invoiceData, totals }) => {
  return (
    <div className="invoice-container p-6 border-4 border-gray-800 font-sans min-h-[850px] w-full">
      {/* Kop Surat */}
      <header className="mb-8 pb-4 border-b-2 border-gray-800">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-extrabold text-gray-900 tracking-wider">
              Ernesty Digital Labs
            </h1>
            <p className="text-lg text-gray-600">
              Innovation & Digital Solution
            </p>
          </div>
          <div className="text-right">
            <p className="font-bold text-xl text-gray-800">INVOICE</p>
            <p className="text-sm text-gray-500">
              Tanggal: {invoiceData.invoiceDate}
            </p>
            <p className="text-sm text-gray-500">
              Nomor: {invoiceData.invoiceNumber}
            </p>
          </div>
        </div>
        <div className="mt-4 text-sm text-gray-600">
          <p>
            Jl. Marga Jaya No.8, Kanigoro, Kec. Kartoharjo, Kota Madiun, Jawa
            Timur 63118
          </p>
          <p>Email: rizkyand995@gmail.com | Telp: +62 889 9171 5870</p>
        </div>
      </header>

      {/* Detail Klien */}
      <section className="mb-8">
        <h2 className="text-lg font-semibold border-b pb-1 mb-2 text-gray-700">
          Ditagihkan Kepada:
        </h2>
        <p className="font-medium text-gray-800">
          {invoiceData.clientName || "Nama Klien Belum Diisi"}
        </p>
        <p className="text-sm text-gray-600">
          {invoiceData.clientAddress || "Alamat Klien Belum Diisi"}
        </p>
      </section>

      {/* Tabel Item */}
      <section className="mb-8">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100 border border-gray-300">
              <th className="p-2 text-left text-sm font-semibold text-gray-700">
                Deskripsi Layanan
              </th>
              <th className="p-2 text-right text-sm font-semibold text-gray-700 w-1/4">
                Jumlah (IDR)
              </th>
            </tr>
          </thead>
          <tbody>
            {invoiceData.items.map((item, index) => (
              <tr key={index} className="border-b border-gray-200">
                <td className="p-2 text-sm text-gray-800">
                  {item.description}
                </td>
                <td className="p-2 text-right text-sm text-gray-800">
                  {formatCurrency(item.amount)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* Total & Kalkulasi (Hanya Subtotal & Grand Total) */}
      <section className="flex justify-end">
        <div className="w-full max-w-sm">
          <div className="flex justify-between p-2 border-t border-gray-300">
            <span className="font-medium text-gray-700">Subtotal:</span>
            <span className="font-medium text-gray-800">
              {formatCurrency(totals.subtotal)}
            </span>
          </div>

          {/* Menghapus baris PPN yang sebelumnya ada di sini */}

          <div className="flex justify-between p-2 border-t-2 border-b-4 border-gray-800 bg-blue-50">
            <span className="text-lg font-bold text-gray-900">
              GRAND TOTAL:
            </span>
            <span className="text-lg font-bold text-gray-900">
              {formatCurrency(totals.grandTotal)}
              {/* Menggunakan totals.grandTotal yang nilainya sama dengan subtotal */}
            </span>
          </div>
        </div>
      </section>

      {/* Catatan & Tanda Tangan */}
      <footer className="mt-12 pt-4 border-t border-gray-300">
        <p className="text-sm italic text-gray-600 mb-6">
          Pembayaran dapat ditransfer ke Bank BRI dengan Nomor Rekening 6355
          0100 5399 508 A/N RIZKY YULI ANDREANTO.
        </p>

        <div className="flex justify-end">
          <div className="text-center w-64">
            <p className="mb-20 text-base text-gray-700">Hormat Kami,</p>
            <div className="border-t-2 border-gray-700 pt-3">
              <p className="font-bold text-lg text-gray-800">
                Management Ernesty Digital Labs
              </p>
              
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default InvoiceTemplate;
