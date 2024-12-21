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
      <h1>Detail Penghuni</h1>
      <div class="room-list">
        <h2>Kamar</h2>
        <div class="rooms">
          <div
            v-for="(room, index) in rooms"
            :key="index"
            :class="['room', room.status === 'Lunas' ? 'occupied' : 'vacant']"
          >
            <p>Kamar {{ index + 1 }}</p>
            <p>Status: {{ room.status === 'Lunas' ? 'Terisi' : 'Kosong' }}</p>
            <p v-if="room.status === 'Lunas'">Penghuni: {{ room.tenantName }}</p>
            <button
              v-if="room.status === 'Lunas'"
              class="btn btn-danger"
              @click="removePenghuni(index)"
            >
              Remove Penghuni
            </button>
            <button
              v-if="room.status === 'Kosong'"
              class="btn btn-success"
              @click="addPenghuni(index)"
            >
              Tambah Penghuni
            </button>
          </div>
        </div>
      </div>
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
  name: 'PenghuniDetail',
  data() {
    return {
      rooms: [], // Data kamar
      payments: [], // Data pembayaran untuk menambah penghuni
    };
  },
  methods: {
    async fetchData() {
      try {
        // Fetch data invoice
        const invoiceResponse = await fetch('http://localhost:3000/api/invoice/get', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
        });
        const invoiceData = await invoiceResponse.json();

        // Fetch data payment
        const paymentResponse = await fetch('http://localhost:3000/api/payment');
        const paymentData = await paymentResponse.json();

        if (invoiceData.success && paymentData.success) {
          // Mengisi kamar yang terisi
          const occupiedRooms = invoiceData.data.map((invoice) => ({
            status: 'Lunas',
            tenantName: invoice.tenantName,
          }));

          // Mengisi kamar kosong
          const vacantRooms = Array.from(
            { length: 10 - occupiedRooms.length },
            () => ({ status: 'Kosong', tenantName: null })
          );

          this.rooms = [...occupiedRooms, ...vacantRooms];
          this.payments = paymentData.data; // Simpan data payment untuk digunakan saat menambah penghuni
        } else {
          console.error('Gagal mendapatkan data dari API');
        }
      } catch (error) {
        console.error('Kesalahan saat fetch data:', error.message);
      }
    },
    removePenghuni(index) {
      // Ubah status kamar ke kosong
      this.rooms[index].status = 'Kosong';
      this.rooms[index].tenantName = null;
      alert(`Penghuni di kamar ${index + 1} telah dihapus.`);
    },
    addPenghuni(index) {
      if (this.payments.length > 0) {
        // Ambil data pembayaran untuk menambah penghuni
        const payment = this.payments.pop();
        this.rooms[index].status = 'Lunas';
        this.rooms[index].tenantName = payment.tenantName;
        alert(`Penghuni baru ditambahkan ke kamar ${index + 1}`);
      } else {
        alert('Tidak ada data pembayaran yang tersedia untuk menambah penghuni.');
      }
    },
  },
  mounted() {
    this.fetchData();
  },
};
</script>

<style scoped>
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

.main-content {
  padding: 2rem;
  flex: 1;
}

.room-list {
  margin-top: 2rem;
}

.rooms {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 1rem;
}

.room {
  background-color: #f0f0f0;
  border-radius: 8px;
  padding: 1rem;
  text-align: center;
}

.room.occupied {
  background-color: #d9534f;
  color: white;
}

.room.vacant {
  background-color: #5bc0de;
  color: white;
}

.btn {
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.btn-danger {
  background-color: #d9534f;
  color: white;
}

.btn-success {
  background-color: #5cb85c;
  color: white;
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
