<template>
  <div class="container">
    <KostHeader />
    <ReturnButton />
    <main class="main-content">
      <h1 class="title">Laporan Penghuni</h1>
      <div class="report-list">
        <div 
        class="report-box" 
        v-for="(report, index) in userReports" 
        :key="index"
        >
        <p><strong>Tanggal:</strong> {{ new Date(report.createdAt).toLocaleDateString() }}</p>
        <p><strong>Pesan:</strong> {{ report.message }}</p>
      </div>
    </div>
  </main>
  
  <KostFooter />
</div>
</template>

<script>
export default {
  name: 'LaporanPenghuni',
  data() {
    return {
      userReports: [],
      role: null,
      username: null,
    };
  },
  watch: {
    role(newRole) {
      if (newRole === 'USER') {
        this.$router.push('/home');
      }
    },
  },
  mounted() {
    this.fetchUserReports();
    
    const loginToken = localStorage.getItem("loginToken");
    this.fetchUsername();
    if (loginToken) {
      this.fetchUserRole(this.username);
      this.getRole();
    }
    else {
      this.$router.push('/');
    }
  },
  methods: {
    async fetchUserRole(username) {
      try {
        const response = await fetch("http://localhost:4000/getRole", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username }),
        });
        
        if (!response.ok) throw new Error("Failed to fetch user ID.");
        const data = await response.json();
        return data.role;
      } catch (error) {
        console.error("Error fetching user ID:", error);
        return null;
      }
    },
    async getRole() {
      try {
        const userRole = await this.fetchUserRole(this.username);
        if (!userRole) {
          alert("Error. Please try again.");
          return;
        }
        this.role = userRole;
        console.log("User role:", this.role);                    
      } catch (error) {
        console.error("Error fetching user role:", error);
        return null;
      }
    },
    fetchUsername() {
      this.username = localStorage.getItem("username");
    },
    async fetchUserReports() {
      try {
        const response = await fetch('http://localhost:4000/laporan/penghuni');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        if (data.success) {
          this.userReports = data.data;
        } else {
          console.error('Gagal mengambil laporan penghuni:', data.message);
        }
      } catch (error) {
        console.error('Error saat mengambil laporan penghuni:', error.message);
      }
    },
  },
};
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: #f8f9fa;
}
.title {
  font-size: 2rem;
  margin-bottom: 1.5rem;
  color: #333;
  text-align: center;
}
.main-content {
  padding: 2rem;
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.report-list {
  width: 100%;
  max-width: 800px;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}
.report-box {
  background-color: #ffffff;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s;
}
.report-box:hover {
  transform: translateY(-5px);
  box-shadow: 0 6px 10px rgba(0, 0, 0, 0.15);
}
.report-box p {
  margin: 0.5rem 0;
  color: #555;
}
.report-box strong {
  color: #333;
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
