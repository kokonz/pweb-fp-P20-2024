<template>
  <div class="container">
    <header class="header">
      <h1>KostIT</h1>
      <nav>
        <router-link to="/facility">Fasilitas</router-link>
        <router-link to="/rules">Peraturan</router-link>
        <router-link to="/admin/dash">Admin</router-link>
      </nav>
    </header>

    <main class="main-content">
      <h1>Laporan Penghuni</h1>
      <ul>
        <li v-for="(report, index) in userReports" :key="index">
          Tanggal: {{ new Date(report.createdAt).toLocaleDateString() }}, 
          Pesan: {{ report.message }}
        </li>
      </ul>
    </main>

    <footer class="footer">
      <div>
        <h4>KostIT</h4>
        <p>"Dari IT, untuk IT"</p>
      </div>
      <div>
        <p>Alamat: Perumahan Bumi Marina Emas Timur, Blok C VII...</p>
        <p>No. Telepon: 081420694206</p>
      </div>
      <p>@ 2024 KostIT | All Rights Reserved</p>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'LaporanPenghuni',
  data() {
    return {
      userReports: [], // Array untuk menyimpan data laporan penghuni
    };
  },
  methods: {
    async fetchUserReports() {
      try {
        const response = await fetch('http://localhost:3000/api/user-reports');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        if (data.success) {
          this.userReports = data.data; // Simpan data laporan ke dalam state
        } else {
          console.error('Gagal mengambil laporan penghuni:', data.message);
        }
      } catch (error) {
        console.error('Error saat mengambil laporan penghuni:', error.message);
      }
    },
  },
  mounted() {
    this.fetchUserReports(); // Ambil data saat komponen dipasang
  },
};
</script>

<style scoped>
/* Gaya CSS tetap seperti sebelumnya */
.container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #6a5a8b;
  color: white;
  padding: 1rem;
}

.header nav a {
  margin: 0 1rem;
  color: white;
  text-decoration: none;
}

.main-content {
  padding: 2rem;
  flex: 1;
  text-align: center;
}

.footer {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #6a5a8b;
  color: white;
  padding: 1rem;
  text-align: center;
  margin-top: auto;
}
</style>
