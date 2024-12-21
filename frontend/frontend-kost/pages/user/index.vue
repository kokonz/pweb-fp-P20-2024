<template>
    <div>
        <KostHeader />
        <h1 class="dashboard-greeting">Selamat datang, {{ username }}</h1>
        <div class="invoice-container">
            <h1>History Pembayaran</h1>
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
        <div class="rent-container">
            <h1>Sewa Kamar</h1>
            <p>Mau sewa kamar? Cuss langsung aja.</p>
            <ButtonLayout @click="redirRent">
                Sewa Kamar
            </ButtonLayout>
        </div>
        <div class="report-container">
            <h1>Lapor</h1>
            <p>Mau lapor fasilitas yang rusak atau penghuni kost yang rese tapi ga berani ngomong langsung? Laporin sini aja deh.</p>
            <div class="report-btn-container">
                <ButtonLayout @click="redirReportFacility">
                    Lapor Fasilitas
                </ButtonLayout>
                <ButtonLayout @click="redirReportPerson">
                    Lapor Penghuni Kost
                </ButtonLayout>
            </div>
        </div>
        <KostFooter />
    </div>
</template>

<script>
import ButtonLayout from '~/layouts/ButtonLayout.vue';

export default {
    data() {
        return {
            username: null,
            invoices: [],
        };
    },
    components: {
        ButtonLayout,
    },
    computed: {
        sortedInvoices() {
            return this.invoices.sort(
            (a, b) => new Date(b.date) - new Date(a.date)
            );
        },
    },
    mounted() {
        this.fetchUsername();
        this.fetchInvoices();
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
        async fetchInvoices() {
            if (!this.username) return;
            
            try {
                const response = await fetch("http://localhost:4000/invoice/get", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ username: this.username }),
                });
                
                const result = await response.json();
                
                if (result.success && result.data) {
                    this.invoices = result.data;
                } else {
                    console.error("Failed to fetch invoices:", result.message);
                }
            } catch (error) {
                console.error("Error fetching invoices:", error);
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
        redirRent() {
            this.$router.push('/user/sewa')
        },
        redirReportFacility() {
            this.$router.push('/user/laporan/fasilitas')
        },
        redirReportPerson() {
            this.$router.push('/user/laporan/penghuni')
        },
    },
};
</script>

<style scoped>
.dashboard-greeting {
    margin-left: 20px;
    margin-top: 30px;
}

.invoice-container, .rent-container, .report-container {
    margin: 20px;
}

.invoice-container h1 {
    margin-bottom: 20px;
    font-size: 24px;
}

.invoice-table {
    width: 65%;
    border-collapse: collapse;
}

.invoice-row {
    margin-bottom: 10px;
}

.label-cell {
    background-color: #f8f9fa;
    border: none;
    width: 20%;
}

.data-cell {
    border: 1px solid #ddd;
    background-color: #ffffff;
    padding: 10px;
    width: 80%;
    display: flex;
    flex-direction: column;
    margin-bottom: 5px;
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

.rent-container h1, .report-container h1 {
    font-size: 24px;;
}

.report-container h1 {
    margin-top: 25px;
}

.rent-container p, .report-container p {
    margin-bottom: 15px;
}

.report-btn-container {
    display: flex;
    gap: 20px;
}
</style>

