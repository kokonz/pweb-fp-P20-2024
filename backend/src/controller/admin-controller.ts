import { Request, Response } from "express";

// Controller untuk Admin Dashboard
export const AdminDashboard = (req: Request, res: Response): void => {
  res.status(200).json({
    message: "Selamat datang di Admin Dashboard!",
  });
};

// Controller untuk mendapatkan detail penghuni berdasarkan ID
export const GetPenghuniDetail = (req: Request, res: Response): void => {
  const { id } = req.params;
  // Contoh data dummy
  const penghuni = {
    id: id,
    nama: "John Doe",
    kamar: "A-101",
    status: "Aktif",
  };
  res.status(200).json({
    message: "Detail Penghuni",
    data: penghuni,
  });
};

// Controller untuk mendapatkan laporan fasilitas
export const GetLaporanFasilitas = (req: Request, res: Response): void => {
  // Contoh data dummy
  const laporanFasilitas = [
    { id: 1, fasilitas: "Wi-Fi", status: "Baik" },
    { id: 2, fasilitas: "AC", status: "Rusak" },
    { id: 3, fasilitas: "Kamar Mandi", status: "Baik" },
  ];
  res.status(200).json({
    message: "Laporan Fasilitas",
    data: laporanFasilitas,
  });
};

// Controller untuk mendapatkan laporan penghuni
export const GetLaporanPenghuni = (req: Request, res: Response): void => {
  // Contoh data dummy
  const laporanPenghuni = [
    { id: 1, nama: "John Doe", kamar: "A-101", status: "Aktif" },
    { id: 2, nama: "Jane Smith", kamar: "B-201", status: "Tidak Aktif" },
  ];
  res.status(200).json({
    message: "Laporan Penghuni",
    data: laporanPenghuni,
  });
};
