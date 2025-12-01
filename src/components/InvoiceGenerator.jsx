// src/components/InvoiceGenerator.jsx

import React, { useState, useMemo } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import InvoiceTemplate from "./InvoiceTemplate";

// Menghapus: const TAX_RATE = 0.11;

const InvoiceGenerator = () => {
  // State untuk Data Tagihan (Initial Dummy Data)
  const [invoiceData, setInvoiceData] = useState({
    clientName: "PT. Solusi Digital Abadi",
    clientAddress: "Alamat Klien",
    invoiceNumber: "INV-2025/07-001",
    invoiceDate: new Date().toISOString().substring(0, 10),
    items: [
      { description: "Pengembangan Website E-Commerce", amount: 15000000 },
      { description: "Biaya Lisensi Tahunan", amount: 500000 },
    ],
  });

  // Handle Perubahan Input Data Umum
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInvoiceData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle Perubahan Item (Deskripsi atau Jumlah)
  const handleItemChange = (index, key, value) => {
    const newItems = invoiceData.items.map((item, i) => {
      if (i === index) {
        // Memastikan amount diubah menjadi angka
        return {
          ...item,
          [key]: key === "amount" ? Number(value) : value,
        };
      }
      return item;
    });
    setInvoiceData((prevData) => ({ ...prevData, items: newItems }));
  };

  // Fungsi Tambah/Hapus Item
  const addItem = () => {
    setInvoiceData((prevData) => ({
      ...prevData,
      items: [...prevData.items, { description: "", amount: 0 }],
    }));
  };

  const removeItem = (index) => {
    if (invoiceData.items.length > 1) {
      setInvoiceData((prevData) => ({
        ...prevData,
        items: prevData.items.filter((_, i) => i !== index),
      }));
    }
  };

  // Kalkulasi Total menggunakan useMemo (tanpa PPN)
  const totals = useMemo(() => {
    const subtotal = invoiceData.items.reduce(
      (sum, item) => sum + (item.amount || 0),
      0
    );
    // Menghapus perhitungan taxAmount
    const taxAmount = 0; // PPN dibuat 0
    const grandTotal = subtotal; // Grand Total = Subtotal

    return {
      subtotal,
      taxAmount,
      grandTotal,
    };
  }, [invoiceData.items]); // Kalkulasi ulang hanya jika items berubah

  // Fungsi Export ke PDF (Tidak ada perubahan di sini)
  const exportToPDF = () => {
    const invoiceElement = document.getElementById("invoice-preview");

    if (!invoiceElement) {
      alert("Area invoice tidak ditemukan!");
      return;
    }

    // Konfigurasi html2canvas
    html2canvas(invoiceElement, {
      scale: 2, // Meningkatkan kualitas gambar
      useCORS: true,
    }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4"); // 'p' for portrait, 'mm' for units, 'a4' size
      const imgWidth = 210;
      const pageHeight = 297;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;
      let position = 0;

      // Tambahkan gambar ke PDF (mendukung multiple pages jika konten panjang)
      pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      // Simpan file
      pdf.save(`Invoice-${invoiceData.invoiceNumber || "Draft"}.pdf`);
    });
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-6 border-b pb-2">
        Invoice Generator - Ernesty Digital Labs
      </h1>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Kolom Input Data */}
        <div className="lg:w-1/3 p-6 bg-white shadow-lg rounded-lg h-fit">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">
            Input Tagihan
          </h2>

          {/* Formulir Input */}
          <div className="space-y-4">
            {/* Data Klien */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Kepada (Klien)
              </label>
              <input
                type="text"
                name="clientName"
                value={invoiceData.clientName}
                onChange={handleInputChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Nama Klien / Perusahaan"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Alamat Klien
              </label>
              <textarea
                name="clientAddress"
                value={invoiceData.clientAddress}
                onChange={handleInputChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Alamat lengkap klien"
                rows="3"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Nomor Invoice
              </label>
              <input
                type="text"
                name="invoiceNumber"
                value={invoiceData.invoiceNumber}
                onChange={handleInputChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                placeholder="INV-001/2025"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Tanggal Invoice
              </label>
              <input
                type="date"
                name="invoiceDate"
                value={invoiceData.invoiceDate}
                onChange={handleInputChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              />
            </div>

            {/* Item Layanan */}
            <h3 className="text-lg font-medium text-gray-700 pt-2 border-t mt-4">
              Detail Layanan
            </h3>
            {invoiceData.items.map((item, index) => (
              <div key={index} className="p-3 border rounded-md bg-gray-50">
                <input
                  type="text"
                  value={item.description}
                  onChange={(e) =>
                    handleItemChange(index, "description", e.target.value)
                  }
                  className="block w-full border border-gray-300 rounded-md shadow-sm p-2 mb-2 text-sm"
                  placeholder="Deskripsi Layanan"
                />
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={item.amount || ''}
                    onChange={(e) => {
                      const value = e.target.value.replace(/[^0-9]/g, '');
                      handleItemChange(index, "amount", value);
                    }}
                    className="w-1/2 border border-gray-300 rounded-md shadow-sm p-2 text-sm [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                    placeholder="Jumlah (IDR)"
                  />
                  <button
                    onClick={() => removeItem(index)}
                    className="bg-red-500 text-white p-2 rounded-md hover:bg-red-600 text-sm">
                    Hapus
                  </button>
                </div>
              </div>
            ))}

            <button
              onClick={addItem}
              className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-150">
              + Tambah Item
            </button>
          </div>
        </div>

        {/* Kolom Preview Invoice dan Tombol Aksi */}
        <div className="lg:w-2/3">
          {/* Area Preview */}
          <div
            id="invoice-preview"
            className="bg-white p-8 shadow-2xl rounded-lg border border-gray-200">
            <InvoiceTemplate invoiceData={invoiceData} totals={totals} />
          </div>

          {/* Tombol Cetak */}
          <div className="mt-6">
            <button
              onClick={exportToPDF}
              className="w-full bg-green-600 text-white text-xl font-bold py-3 rounded-lg shadow-xl hover:bg-green-700 transition duration-150 flex items-center justify-center">
              ⬇️ Cetak & Download PDF
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvoiceGenerator;
