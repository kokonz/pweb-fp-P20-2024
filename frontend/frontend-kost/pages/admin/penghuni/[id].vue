<template>
    <KostHeader />
    <ReturnButton to="/admin/penghuni"/>
    <div class="penghuni-container">
        <h1>Informasi penghuni:</h1>
        <p>User ID: {{ id }}</p>
        <p v-if="user">Username: {{ user.username }}</p>
        <p v-if="user">Role: {{ user.role }}</p>
        <p>Status Pembayaran: {{ paymentStatus }}</p>
        
        <div class="history-container" v-if="paymentStatus === 'Lunas'">
            <p>History Pembayaran:</p>
            <div class="table-container">
                <table class="invoice-table">
                    <tbody>
                        <tr v-for="(invoice, index) in sortedInvoices" :key="index" class="invoice-row">
                            <td class="data-cell">
                                <div class="invoice-details">
                                    <div class="date">{{ formatDate(invoice.date) }}</div>
                                    <div class="bill">{{ formatCurrency(invoice.bill) }}</div>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        
        <div v-if="paymentStatus === 'Belum lunas' && isUserInRoom" class="keluarkan-container">
            <button @click="kickUser" class="keluarkan-button">Keluarkan</button>
        </div>
    </div>
    <KostFooter class="penghuni-footer"/>
</template>

<script>
export default {
    data() {
        return {
            id: null,
            user: null,
            paymentStatus: 'Belum lunas',
            invoices: [],
            role: null,
            username: null,
            rooms: [],
        };
    },
    watch: {
        '$route.params.id'(newId) {
            this.id = newId;
            this.fetchUserData();
        },
        
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
        } else {
            this.$router.push('/');
        }
    },
    created() {
        const route = useRoute();
        this.id = route.params.id;
        this.fetchUserData();
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
        async fetchUserData() {
            if (!this.id) return;
            
            try {
                const response = await fetch('http://localhost:4000/getUser', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ _id: this.id }),
                });
                
                if (!response.ok) {
                    throw new Error('Failed to fetch user data');
                }
                
                const data = await response.json();
                this.user = {
                    username: data.username,
                    role: data.role,
                };
                
                if (this.user && this.user.username) {
                    this.fetchInvoiceData(this.user.username);
                    this.fetchRooms();
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        },
        
        async fetchInvoiceData(username) {
            try {
                const response = await fetch('http://localhost:4000/invoice/get', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ username: username }),
                });
                
                if (!response.ok) {
                    throw new Error('Failed to fetch invoice data');
                }
                
                const data = await response.json();
                
                if (data.data && data.data.length > 0) {
                    this.paymentStatus = 'Lunas';
                    this.invoices = data.data;
                } else {
                    this.paymentStatus = 'Belum lunas';
                    this.invoices = [];
                }
            } catch (error) {
                console.error('Error fetching invoice data:', error);
            }
        },
        
        async fetchRooms() {
            try {
                const response = await fetch('http://localhost:4000/admin/rooms');
                if (!response.ok) throw new Error('Failed to fetch rooms');
                const data = await response.json();
                if (data.success) {
                    this.rooms = data.data;
                }
            } catch (error) {
                console.error('Error fetching room data:', error);
            }
        },
        
        async kickUser() {
            const roomsToKick = this.rooms.filter(room => room.username === this.user.username);
            
            if (roomsToKick.length === 0) {
                alert('User is not in any room.');
                return;
            }

            console.log('Rooms to kick:', roomsToKick);

            for (const room of roomsToKick) {
                try {
                    const requestBody = {
                        occupied: false,
                        username: '',
                        rent_periods: null,
                    };
                    
                    console.log('Request body:', requestBody);

                    const response = await fetch(`http://localhost:4000/admin/rooms/${room.id}`, {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(requestBody),
                    });
                    
                    if (!response.ok) {
                        throw new Error(`Failed to kick user from room ${room.id}`);
                    }
                    
                    alert(`User dikeluarkan dari kamar ${room.id}`);
                    console.log(`User kicked from room ${room.id}`);
                } catch (error) {
                    console.error('Error kicking user:', error);
                }
            }
        },

        
        formatCurrency(amount) {
            return new Intl.NumberFormat("id-ID", {
                style: "currency",
                currency: "IDR",
            }).format(amount);
        },
        
        formatDate(date) {
            return new Date(date).toLocaleDateString("id-ID", {
                year: "numeric",
                month: "long",
                day: "numeric",
            });
        },
    },
    computed: {
        sortedInvoices() {
            return this.invoices.sort((a, b) => new Date(b.date) - new Date(a.date));
        },
        isUserInRoom() {
            return this.rooms.some(room => room.username === this.user.username);
        },
    },
};
</script>

<style scoped>
.penghuni-container {
    margin-left: 30px;
    margin-top: 20px;
}

.history-container {
    margin-top: 20px;
}

.invoice-table {
    width: 50%;
    border-collapse: collapse;
}

.invoice-row {
    margin-bottom: 10px;
}

.data-cell {
    border: 1px solid #ddd;
    background-color: #ffffff;
    padding: 10px;
    display: flex;
    flex-direction: column;
}

.invoice-details {
    display: flex;
    justify-content: space-between;
}

.date {
    font-weight: bold;
    color: #333;
}

.bill {
    font-weight: bold;
    color: #4caf50;
}

.keluarkan-container {
    margin-top: 20px;
}

.keluarkan-button {
    background-color: red;
    color: white;
    border: none;
    padding: 10px 20px;
    cursor: pointer;
    font-size: 16px;
}

.keluarkan-button:hover {
    background-color: darkred;
}

.penghuni-footer {
    position: absolute;
    bottom: 0;
}
</style>
