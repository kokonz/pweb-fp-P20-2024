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
      <section class="actions">
        <h3>Dari IT, Untuk IT</h3>
      </section>

      <section class="admin-dashboard">
        <h1>Admin Dashboard</h1>
        <ul>
          <li><router-link to="/admin/dash">Dashboard</router-link></li>
          <li><router-link to="/admin/detail">Detail Penghuni</router-link></li>
          <li><router-link to="/admin/laporan/fasilitas">Laporan Fasilitas</router-link></li>
          <li><router-link to="/admin/laporan/penghuni">Laporan Penghuni</router-link></li>
          
        </ul>
        <div>
          <h2>Room Occupancy</h2>
          <p>Kamar Terisi: {{ kamarTerisi }}</p>
          <p>Kamar Kosong: {{ kamarKosong }}</p>
        </div>
      </section>
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
  name: "AdminDashboard",
  data() {
    return {
      kamarTerisi: 10,  
      kamarKosong: 5,  
    };
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

.header nav a {
  margin: 0 1rem;
  color: white;
  text-decoration: none;
}

.main-content {
  padding: 2rem;
  flex: 1; /* Agar main-content mengambil sisa ruang */
}

.actions {
  text-align: center;
}

.admin-dashboard {
  box-align: center;
  margin-top: 2rem;
  padding: 1rem;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
  width: 30%; /* Menyesuaikan lebar elemen */
  margin-left: auto;
  margin-right: auto;
}

.admin-dashboard ul {
  list-style: none;
  padding: 0;
}

.admin-dashboard ul li {
  margin: 0.5rem 0;
}

.admin-dashboard ul li a {
  color: #337ab7;
  text-decoration: none;
}

.admin-dashboard ul li a:hover {
  text-decoration: underline;
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

.footer div {
  margin-bottom: 1rem;
  text-align: center;
}

.footer p {
  margin: 0;
}
</style>
