<template>
    <KostHeader />
    <ReturnButton to="/admin/dashboard"/>
    <div class="penghuni-container">
        <h1>Daftar Penghuni</h1>
        <div v-if="users.length > 0">
            <ul class="user-list">
                <li v-for="user in users" :key="user._id" class="user-item">
                    <a :href="'http://localhost:3000/admin/penghuni/' + user._id" class="user-link">
                        {{ user.username }}
                    </a>
                </li>
            </ul>
        </div>
        <div v-else>
            <p>No users found.</p>
        </div>
    </div>
    <KostFooter class="penghuni-footer"/>
</template>

<script>
export default {
    data() {
        return {
            users: [],
            username: null,
            role: null,
        };
    },
    watch: {
        role(newRole) {
            if (newRole === "USER") {
                this.$router.push("/home");
            }
        },
    },
    async mounted() {
        const loginToken = localStorage.getItem("loginToken");

        if (loginToken) {
            this.fetchUsername();
            await this.getRole();
            await this.fetchUsers();
        } else {
            this.$router.push("/");
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

                if (!response.ok) throw new Error("Failed to fetch user role.");
                const data = await response.json();
                return data.role;
            } catch (error) {
                console.error("Error fetching user role:", error);
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
            }
        },
        fetchUsername() {
            this.username = localStorage.getItem("username");
        },
        async fetchUsers() {
            try {
                const response = await fetch("http://localhost:4000/getUser");
                const data = await response.json();

                if (data.success) {
                    this.users = data.data;
                } else {
                    console.error("Failed to fetch user data:", data.message);
                }
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        },
    },
};
</script>

<style scoped>
.penghuni-container {
    margin-top: 20px;
    margin-left: auto;
    margin-right: auto;
    width: 80%;
    max-width: 1200px;
    padding: 20px;
    text-align: center;
}

h1 {
    color: #333;
    margin-bottom: 30px;
}

.user-list {
    list-style-type: none;
    padding: 0;
}

.user-item {
    margin: 10px 0;
    font-size: 1.2rem;
}

.user-link {
    text-decoration: none;
    color: #3498db;
    font-weight: 500;
    transition: color 0.3s ease, transform 0.3s ease;
}

.user-link:hover {
    color: #2980b9;
    transform: translateX(5px);
}

.user-link:focus {
    outline: none;
    box-shadow: 0 0 0 2px rgba(52, 152, 219, 0.6);
}

@media (max-width: 768px) {
    .penghuni-container {
        width: 95%;
    }

    h1 {
        font-size: 2rem;
    }

    .user-item {
        font-size: 1rem;
    }
}

.penghuni-footer {
    position: absolute;
    bottom: 0;
}

</style>
