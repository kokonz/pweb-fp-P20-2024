<template>
    <div class="container">
        <KostHeader />
        <ReturnButton />   
        <main class="main-content">
            <section class="actions">
                <h3>Dari IT, Untuk IT</h3>
            </section>
            
            <section class="admin-dashboard">
                <h1>Admin Dashboard</h1>
                <ul>
                    <li><router-link to="/admin/dashboard">Dashboard</router-link></li>
                    <li><router-link to="/admin/penghuni">Detail Penghuni</router-link></li>
                    <li><router-link to="/admin/laporan/fasilitas">Laporan Fasilitas</router-link></li>
                    <li><router-link to="/admin/laporan/penghuni">Laporan Penghuni</router-link></li>
                </ul>
                <div>
                    <h2>Room Occupancy</h2>
                    <p>Kamar Terisi: {{ kamarTerisi }}</p>
                    <p>Kamar Kosong: {{ kamarKosong }}</p>
                </div>
            </section>
            
            <section class="room-details">
                <h2>Room Details</h2>
                <div class="room-grid">
                    <div v-for="room in rooms" :key="room._id" :style="getRoomStyle(room)" class="room-box">
                        <h3>Kamar {{ room.id }}</h3>
                        <p v-if="room.occupied">Username: {{ room.username }}</p>
                        <p v-if="room.occupied">Rent Period: {{ room.rent_periods }}</p>
                        <p v-else>Kamar Kosong</p>
                        
                        <div v-if="!room.occupied">
                            <button @click="openModal(room.id)" class="btn-tambah">Tambahkan</button>
                        </div>
                        <div v-if="room.occupied">
                            <button @click="removeUserFromRoom(room.id)" class="btn-keluarkan">Keluarkan</button>
                        </div>
                    </div>
                </div>
            </section>
        </main>
        
        <div v-if="isModalVisible" class="modal-overlay">
            <div class="modal">
                <h3>Tambahkan Penghuni</h3>
                <label for="username">Username</label>
                <select v-model="modalData.username" id="username">
                    <option v-for="user in users" :key="user._id" :value="user.username">{{ user.username }}</option>
                </select>
                
                <label for="rent-periods">Masa Sewa</label>
                <select v-model="modalData.rentPeriods" id="rent-periods">
                    <option value="3">3 Bulan</option>
                    <option value="6">6 Bulan</option>
                </select>
                
                <div class="modal-button-container">
                    <button @click="submitRoomUpdate" class="btn-update">Update Room</button>
                    <button @click="closeModal" class="btn-cancel">Cancel</button>
                </div>
            </div>
        </div>
        
        <KostFooter />
    </div>
</template>

<script>
export default {
    name: "AdminDashboard",
    data() {
        return {
            kamarTerisi: 0,
            kamarKosong: 0,
            rooms: [],
            users: [],
            isModalVisible: false,
            modalData: {
                roomId: null,
                username: '',
                rentPeriods: '3'
            },
            role: null,
            username: null,
        };
    },
    created() {
        this.fetchRoomDetails();
        this.fetchUserList();
    },
    watch: {
        role(newRole) {
            if (newRole === 'USER') {
                this.$router.push('/home');
            }
        },
    },
    mounted() {
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
        async fetchUserList() {
            try {
                const response = await fetch("http://localhost:4000/getUser");
                const data = await response.json();
                if (data.success) {
                    this.users = data.data;  // Populate users list
                } else {
                    console.error("Failed to fetch users");
                }
            } catch (error) {
                console.error("Error fetching users:", error);
            }
        },
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
        fetchRoomDetails() {
            fetch('http://localhost:4000/admin/rooms')
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    this.rooms = data.data;
                    this.updateRoomStats();
                    this.updateOccupancyStats();
                }
            })
            .catch(error => {
                console.error('Error fetching room details:', error);
            });
        },
        updateRoomStats() {
            this.kamarTerisi = this.rooms.filter(room => room.occupied).length;
            this.kamarKosong = this.rooms.filter(room => !room.occupied).length;
        },
        updateOccupancyStats() {
            const occupancyData = {
                empty: this.kamarKosong,
                filled: this.kamarTerisi
            };
            
            fetch('http://localhost:4000/occupancy', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(occupancyData),
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    console.log('Occupancy stats updated successfully');
                }
            })
            .catch(error => {
                console.error('Error updating occupancy stats:', error);
            });
        },
        getRoomStyle(room) {
            return {
                backgroundColor: room.occupied ? '#706993' : '#332b45',
                padding: '1rem',
                margin: '0.5rem',
                borderRadius: '8px',
                color: 'white',
                textAlign: 'center',
            };
        },
        openModal(roomId) {
            this.modalData.roomId = roomId;
            this.modalData.username = '';
            this.modalData.rentPeriods = '3';
            this.isModalVisible = true;
        },
        closeModal() {
            this.isModalVisible = false;
        },
        submitRoomUpdate() {
            const { roomId, username, rentPeriods } = this.modalData;
            
            if (!username.trim()) {
                alert("Username cannot be blank");
                return;
            }
            
            const updatedRoomData = {
                occupied: true,
                username: username,
                rent_periods: rentPeriods
            };
            
            fetch(`http://localhost:4000/admin/rooms/${roomId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedRoomData),
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    this.fetchRoomDetails();
                    this.closeModal();
                }
            })
            .catch(error => {
                console.error('Error updating room:', error);
            });
            
            this.isModalVisible = false;
            location.reload();
        },
        removeUserFromRoom(roomId) {
            const updatedRoomData = {
                occupied: false,
                username: "",
                rent_periods: null
            };
            
            fetch(`http://localhost:4000/admin/rooms/${roomId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedRoomData),
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    this.fetchRoomDetails();
                }
            })
            .catch(error => {
                console.error('Error removing user from room:', error);
            });
            
            this.isModalVisible = false;
            location.reload();
        }
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
    flex: 1;
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
    width: 30%;
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

.room-details {
    margin-top: 2rem;
}

.room-grid {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 1rem;
    margin-top: 2rem;
}

.room-box {
    background-color: #f2f2f2;
    padding: 1rem;
    border-radius: 8px;
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

.modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
}

.modal {
    background: white;
    padding: 2rem;
    border-radius: 8px;
    width: 400px;
    text-align: center;
}

.modal input,
.modal select {
    margin: 0.5rem 0;
    padding: 0.5rem;
    width: 90%;
    border-radius: 4px;
    border: 1px solid #ccc;
}

.modal button {
    margin-top: 1rem;
    padding: 0.5rem 1rem;
    border: none;
    background-color: #706993;
    color: white;
    border-radius: 4px;
    cursor: pointer;
}

.modal button:hover {
    background-color: #5e4c7b;
}

.modal-button-container {
    display: flex;
    gap: 20px;
    justify-content: center;
}

.btn-tambah {
    margin-top: 10px;
    background-color: #584c71;
    color: white;
    padding: 0.5rem 1rem;
    border-radius: 4px;
    cursor: pointer;
    border: none;
    text-align: center;
    transition: background-color 0.3s;
}

.btn-tambah:hover {
    background-color: #6e5f90;
}

.btn-update {
    background-color: #0275d8;
}

.btn-update:hover {
    background-color: #025aa5;
}

.btn-cancel {
    background-color: #d9534f;
}

.btn-cancel:hover {
    background-color: #c9302c;
}

.btn-keluarkan {
    margin-top: 10px;
    background-color: #d9534f;
    color: white;
    padding: 0.5rem 1rem;
    border-radius: 4px;
    cursor: pointer;
    border: none;
    text-align: center;
    transition: background-color 0.3s;
}

.btn-keluarkan:hover {
    background-color: #c9302c;
}
</style>
