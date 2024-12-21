<template>
    <div>
        <KostHeader />
        <ReturnButton to="/user/sewa" />
        <div class="payment-container">
            <div class="top-payment">
                <h1>Form Pembayaran KostIT</h1>
            </div>
            <form @submit.prevent="submitForm">
                <div class="payment-form">
                    <label for="rent_periods">Masa Sewa (Bulan)</label>
                    <div class="input-container">
                        <input type="text" id="rent_periods" v-model="form.rent_periods" :readonly="true" required />
                    </div>
                </div>
                <div class="payment-form">
                    <label for="total_bill">Total Bill (Rp)</label>
                    <div class="input-container">
                        <input type="text" id="total_bill" v-model="formattedTotalBill" :readonly="true" required />
                    </div>
                </div>
                <div class="payment-form">
                    <label for="payment_method">Pilih metode pembayaran</label>
                    <div class="input-container">
                        <select id="payment_method" v-model="form.payment_method" required>
                            <option value="QRIS">QRIS</option>
                            <option value="BANK_TRANSFER">Bank Transfer</option>
                        </select>
                    </div>
                </div>
                <div class="payment-form" v-if="form.payment_method === 'BANK_TRANSFER'">
                    <label for="nama_bank">Nama Bank</label>
                    <div class="input-container">
                        <input type="text" id="nama_bank" v-model="nama_bank" required />
                    </div>
                </div>
                <button type="submit">Submit</button>
            </form>
        </div>
        <KostFooter class="bayar-footer" />
    </div>
</template>

<script>
import { jsPDF } from "jspdf";

export default {
    data() {
        return {
            form: {
                total_bill: null,
                payment_method: null,
                rent_periods: null,
                username: null,
            },
            nama_bank: null,
        };
    },
    mounted() {
        this.fetchUsername();
    },
    computed: {
        formattedTotalBill() {
            this.form.rent_periods = localStorage.getItem("rent_periods");
            this.form.total_bill = parseInt(localStorage.getItem("total_bill"), 10);
            return this.form.total_bill.toLocaleString("id-ID") + ",00";
        },
    },
    created() {
        if (process.client && !localStorage.getItem('loginToken')) {
            this.$router.push('/');
        }
    },
    methods: {
        async submitForm() {
            try {
                const userId = await this.fetchUserId(this.form.username);
                if (!userId) {
                    console.error("Failed to retrieve user ID.");
                    return;
                }

                const paymentData = {
                    total_bill: this.form.total_bill,
                    payment_method: this.form.payment_method,
                    rent_periods: parseInt(this.form.rent_periods, 10),
                };

                await this.processPayment(paymentData);

                const invoiceData = {
                    userId,
                    bill: this.form.total_bill,
                };

                await this.sendInvoice(invoiceData);

                this.generateInvoice();

                localStorage.removeItem("total_bill");
                localStorage.removeItem("rent_periods");
                this.$router.push("/user");
            } catch (error) {
                console.error("Error processing form submission:", error);
            }
        },
        async processPayment(paymentData) {
            try {
                const response = await fetch("http://localhost:4000/payment", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(paymentData),
                });

                if (!response.ok) throw new Error("Failed to process payment.");
                console.log("Payment submitted successfully.");
            } catch (error) {
                console.error("Error processing payment:", error);
                throw error;
            }
        },
        async sendInvoice(postData) {
            try {
                const response = await fetch("http://localhost:4000/invoice", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(postData),
                });

                if (!response.ok) throw new Error("Failed to send invoice.");
                console.log("Invoice submitted successfully.");
            } catch (error) {
                console.error("Error submitting invoice:", error);
                throw error;
            }
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
        generateInvoice() {
            const doc = new jsPDF();

            const now = new Date();
            const formattedDate = this.formatDate(now);
            const formattedTime = this.formatTime(now);

            doc.setFontSize(16);
            doc.text("Invoice Pembayaran KostIT", 20, 20);

            doc.setFontSize(12);
            doc.text(`Tanggal: ${formattedDate}`, 20, 30);
            doc.text("=========================", 20, 40);
            doc.text(`Masa Sewa (Bulan): ${this.form.rent_periods}`, 20, 50);
            doc.text(`Total Bill (Rp): ${this.form.total_bill.toLocaleString("id-ID")},00`, 20, 60);
            doc.text(`Metode Pembayaran: ${this.form.payment_method}`, 20, 70);

            if (this.form.payment_method === "BANK_TRANSFER") {
                doc.text(`Nama Bank: ${this.nama_bank}`, 20, 80);
            }

            doc.text("=========================", 20, 90);
            doc.setFontSize(10);
            doc.text("Terima kasih telah melakukan pembayaran KostIT.", 20, 100);

            const fileName = `invoice_pembayaran_${formattedDate}_${formattedTime}.pdf`;
            doc.save(fileName);
        },
        formatDate(date) {
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, "0");
            const day = String(date.getDate()).padStart(2, "0");
            return `${day}-${month}-${year}`;
        },
        formatTime(date) {
            const hours = String(date.getHours()).padStart(2, "0");
            const minutes = String(date.getMinutes()).padStart(2, "0");
            const seconds = String(date.getSeconds()).padStart(2, "0");
            return `${hours}-${minutes}-${seconds}`;
        },
        fetchUsername() {
            this.form.username = localStorage.getItem("username");
        },
    },
};
</script>

<style scoped>
.payment-container {
    margin: 30px;
}

.top-payment h1 {
    margin: 40px 0 20px;
    font-size: 24px;
}

.payment-form {
    margin-top: 20px;
    font-size: 18px;
}

.payment-form label {
    margin-bottom: 5px;
    display: block;
}

.input-container input,
.input-container select {
    width: 30%;
    padding: 10px;
    font-size: 16px;
}

button {
    margin-top: 20px;
    padding: 10px 20px;
    background-color: #007bff;
    color: white;
    border: none;
    cursor: pointer;
}

button:hover {
    background-color: #0056b3;
}

.bayar-footer {
    position: absolute;
    bottom: 0;
}
</style>
