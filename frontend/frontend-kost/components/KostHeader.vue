<template>
    <div class="header">
        <div class="logo" @click="redirHome">
            <h2>KostIT</h2>
        </div>
        <div class="nav-container">
            <div class="nav-options">
                <p class="nav-text" @click="redirFacility">Fasilitas</p>
            </div>
            <div class="nav-options">
                <p class="nav-text" @click="redirPeraturan">Peraturan</p>
            </div>
            <div class="username" v-if="username">
                <p class="nav-text" @click="toggleDropdown">{{ username }}</p>
                <div v-if="showDropdown" class="dropdown">
                    <div class="dropdown-option" @click="logout">
                        <p @click="logout">Log out</p>
                    </div>
                </div>
            </div>
            <div v-else class="nav-options">
                <p class="nav-text" @click="redirLogin">Login</p>
            </div>
        </div>
    </div>
</template>


<script>
    export default {
        data() {
            return {
                username: null,
                showDropdown: false,
            };
        },
        mounted() {
            this.fetchUsername();
        },
        methods: {
            /*
            async fetchUsername() {
                const loginToken = localStorage.getItem("loginToken");
                if (loginToken) {
                    try {
                        const response = await fetch("http://localhost:8080/user/getUsername", {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify({
                                token: loginToken,
                            }),
                        });

                        const result = await response.json();
                        if (result.status === "success" && result.data?.username) {
                            this.username = result.data.username;
                        } else {
                            console.error("Failed to retrieve username:", result.message);
                        }
                    } catch (error) {
                        console.error("Error fetching username:", error);
                    }
                } else {
                    console.warn("No login token found in local storage.");
                }
            },*/
            fetchUsername() {
                this.username = localStorage.getItem("username");
            },
            toggleDropdown() {
                this.showDropdown = !this.showDropdown;
            },
            redirHome() {
                this.$router.push('/home');
            },
            redirFacility() {
                this.$router.push('/facility');
            },
            redirPeraturan() {
                this.$router.push('/rules');
            },
            redirLogin() {
                this.$router.push('/');
            },
            logout() {
                localStorage.removeItem("loginToken");
                this.username = null;
                this.showDropdown = false;
                this.$router.push('/');
            },
        },
    };
</script>

<style scoped>
    .header {
        height: 70px;
        width: 97.4%;
        background-color: #706993;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 20px;
        z-index: 100;
        position: sticky;
        top: 0;
        left: 0;
        color: white;
    }

    .logo {
        display: flex;
        align-items: center;
        cursor: pointer;
    }

    .nav-container {
        display: flex;
    }

    .nav-options, .username {
        color: white;
        font-size: 1rem;
        font-weight: bold;
        height: 70px;
        width: 125px;
        display: flex;
        justify-content: center;
        align-items: center;
        position: relative;
        cursor: pointer;
    }

    .nav-options p, .username p {
        transition: 0.15s;
    }

    .nav-text:hover {
        color: #e6e2fd;
    }

    .dropdown {
        position: absolute;
        top: 70px;
        left: 0;
        width: 125px;
        background-color: white;
        border: 1px solid black;
        display: flex;
        flex-direction: column;
        animation: slideDown 0.3s ease-out;
        z-index: 1;
    }

    .dropdown-option {
        color: black;
        font-weight: bold;
        cursor: pointer;
        text-align: center;
        padding: 10px;
        transition: 0.15s;
    }

    .dropdown-option:hover {
        color: #2b283c;
    }

    @keyframes slideDown {
        from {
            transform: translateY(-10px);
            opacity: 0;
        }
        to {
            transform: translateY(0);
            opacity: 1;
        }
    }
</style>

