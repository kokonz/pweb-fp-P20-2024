<template>
    <div>
        <KostHeader />
        <ReturnButton to="/user" />
        <div class="form-container">
            <h1>Form Laporan Kerusakan Fasilitas KostIT</h1>
            <form @submit.prevent="submitReport">
                <label for="message">Jelaskan kerusakan fasilitas yang ada:</label>
                <textarea id="message" v-model="form.message" placeholder="Masukkan detail..." required></textarea>
                <button type="submit">Laporkan</button>
            </form>
        </div>
    </div>
    <KostFooter class="facility-report-footer"/>
</template>

<script>
export default {
    data() {
        return {
            username: null,
            form: {
                message: "",
                userId: null,
            },
        };
    },
    mounted() {
        this.fetchUsername();
    },
    created() {
        if (process.client && !localStorage.getItem('loginToken')) {
            this.$router.push('/');
        }
    },
    methods: {
        fetchUsername() {
            this.username = localStorage.getItem("username");
        },
        async fetchUserId(username) {
            try {
                const response = await fetch("http://localhost:4000/getId", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ username }),
                });

                if (!response.ok) throw new Error("Failed to fetch user ID.");
                const data = await response.json();
                return data._id;
            } catch (error) {
                console.error("Error fetching user ID:", error);
                return null;
            }
        },
        async submitReport() {
            try {
                const userId = await this.fetchUserId(this.username);
                if (!userId) {
                    alert("Failed to fetch user ID. Please try again.");
                    return;
                }

                this.form.userId = userId;

                const response = await fetch("http://localhost:4000/laporan/fasilitas", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        userId: this.form.userId,
                        message: this.form.message,
                    }),
                });

                if (!response.ok) throw new Error("Failed to submit the report.");
                alert("Berhasil mengirim laporan");
                this.form.message = "";
            } catch (error) {
                console.error("Error submitting the report:", error);
                alert("An error occurred. Please try again.");
            }
        },
    },
};
</script>

<style>
.form-container {
    max-width: 600px;
    margin: 20px auto;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 8px;
    background: #f9f9f9;
}
label {
    font-weight: bold;
    display: block;
    margin-bottom: 8px;
}
textarea {
    width: 96%;
    height: 100px;
    padding: 10px;
    margin-bottom: 16px;
    border: 1px solid #ccc;
    border-radius: 4px;
}
button {
    padding: 10px 20px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}
button:hover {
    background-color: #0056b3;
}

.facility-report-footer {
    position: absolute;
    bottom: 0;
}
</style>
