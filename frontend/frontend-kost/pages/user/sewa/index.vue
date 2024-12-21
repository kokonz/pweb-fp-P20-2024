<template>
    <div>
        <KostHeader />
        <ReturnButton to="/user" />
        <h1 class="top-rent">Sewa Kamar</h1>
        <div class="top-container">
            <div class="spec-container">
                <h1>Spesifikasi Kamar</h1>
                <div class="list-container">
                    <ul>
                        <li>Kamar ukuran 4x5 meter</li>
                        <li>1 orang / kamar</li>
                        <li>Include meja, AC, bantal, guling, lemari baju, kursi</li>
                        <li>Kamar mandi dalam dengan fasilitas air panas</li>
                        <li>Free Wi-Fi dengan kecepatan hingga 50 mbps</li>
                    </ul>
                </div>
            </div>
            <div class="img-container">
                <img src="../../../static/kostit-kamar.jpg" />
            </div>
        </div>
        <h1 class="radio-header">Pilih masa sewa</h1>
        <div class="radio-container">
            <label class="radio-card" :class="{ active: form.rent_periods === 3 }">
                <input type="radio" v-model="form.rent_periods" :value="3" />
                <div class="card-content">
                    <h2>3 Bulan</h2>
                    <p>Rp 6.000.000,00</p>
                </div>
            </label>
            <label class="radio-card" :class="{ active: form.rent_periods === 6 }">
                <input type="radio" v-model="form.rent_periods" :value="6" />
                <div class="card-content">
                    <h2>6 Bulan</h2>
                    <p>Rp 12.000.000,00</p>
                </div>
            </label>
        </div>

        <h1 class="addition-header">Mau nambah fasilitas?</h1>
        <div class="checkbox-container">
            <label class="facility-card" :class="{ active: facilities.includes('Laundry') }">
                <input type="checkbox" value="Laundry" v-model="facilities" @change="disablePeriod('Laundry')" />
                <div class="card-content">
                    <h2>Laundry</h2>
                </div>
            </label>
            <label class="facility-card" :class="{ active: facilities.includes('Cleaning Service') }">
                <input type="checkbox" value="Cleaning Service" v-model="facilities" @change="disablePeriod('Cleaning Service')" />
                <div class="card-content">
                    <h2>Cleaning Service</h2>
                </div>
            </label>
            <label class="facility-card" :class="{ active: facilities.includes('Catering') }">
                <input type="checkbox" value="Catering" v-model="facilities" @change="disablePeriod('Catering')" />
                <div class="card-content">
                    <h2>Catering</h2>
                </div>
            </label>
        </div>

        <div class="facility-period-container">
            <div v-if="facilities.includes('Laundry')" class="laundry-container">
                <label class="period-card" :class="{ active: laundry_period === 3 }">
                    <input type="radio" v-model="laundry_period" :value="3" :disabled="!facilities.includes('Laundry')" />
                    <div class="card-content">
                        <h2>3 Bulan</h2>
                        <p>Rp 600.000,00</p>
                    </div>
                </label>
                <label class="period-card" :class="{ active: laundry_period === 6 }">
                    <input type="radio" v-model="laundry_period" :value="6" :disabled="!facilities.includes('Laundry')" />
                    <div class="card-content">
                        <h2>6 Bulan</h2>
                        <p>Rp 1.200.000,00</p>
                    </div>
                </label>
            </div>

            <div v-if="facilities.includes('Cleaning Service')" class="cleaning-service-container">
                <label class="period-card" :class="{ active: cleaning_service_period === 3 }">
                    <input type="radio" v-model="cleaning_service_period" :value="3" :disabled="!facilities.includes('Cleaning Service')" />
                    <div class="card-content">
                        <h2>3 Bulan</h2>
                        <p>Rp 300.000,00</p>
                    </div>
                </label>
                <label class="period-card" :class="{ active: cleaning_service_period === 6 }">
                    <input type="radio" v-model="cleaning_service_period" :value="6" :disabled="!facilities.includes('Cleaning Service')" />
                    <div class="card-content">
                        <h2>6 Bulan</h2>
                        <p>Rp 600.000,00</p>
                    </div>
                </label>
            </div>

            <div v-if="facilities.includes('Catering')" class="catering-container">
                <label class="period-card" :class="{ active: catering_period === 3 }">
                    <input type="radio" v-model="catering_period" :value="3" :disabled="!facilities.includes('Catering')" />
                    <div class="card-content">
                        <h2>3 Bulan</h2>
                        <p>Rp 3.000.000,00</p>
                    </div>
                </label>
                <label class="period-card" :class="{ active: catering_period === 6 }">
                    <input type="radio" v-model="catering_period" :value="6" :disabled="!facilities.includes('Catering')" />
                    <div class="card-content">
                        <h2>6 Bulan</h2>
                        <p>Rp 6.000.000,00</p>
                    </div>
                </label>
            </div>
        </div>
        <h1 class="total-price">Total: Rp {{ formattedTotalPrice }}</h1>
        <div class="payment-container">
            <ButtonLayout v-if="form.rent_periods" @click="redirPayment">
                Bayar
            </ButtonLayout>
        </div>
    </div>
    <KostFooter />
</template>

<script>
import ButtonLayout from '~/layouts/ButtonLayout.vue';

export default {
    data() {
        return {
            form: {
                rent_periods: null,
                total_bill: null,
            },
            facilities: [],
            laundry_period: null,
            cleaning_service_period: null,
            catering_period: null,
            prices: {
                rent: {
                    3: 6000000,
                    6: 12000000,
                },
                laundry: {
                    3: 600000,
                    6: 1200000,
                },
                cleaningService: {
                    3: 300000,
                    6: 600000,
                },
                catering: {
                    3: 3000000,
                    6: 6000000,
                }
            }
        };
    },
    components: {
        ButtonLayout,
    },
    computed: {
        totalPrice() {
            this.total_bill = 0;

            if (this.form.rent_periods) {
                this.total_bill += this.prices.rent[this.form.rent_periods];
            }

            if (this.facilities.includes('Laundry') && this.laundry_period) {
                this.total_bill += this.prices.laundry[this.laundry_period];
            }

            if (this.facilities.includes('Cleaning Service') && this.cleaning_service_period) {
                this.total_bill += this.prices.cleaningService[this.cleaning_service_period];
            }

            if (this.facilities.includes('Catering') && this.catering_period) {
                this.total_bill += this.prices.catering[this.catering_period];
            }

            return this.total_bill;
        },
        formattedTotalPrice() {
            return this.totalPrice.toLocaleString('id-ID') + ',00';
        }
    },
    created() {
        if (process.client && !localStorage.getItem('loginToken')) {
            this.$router.push('/');
        }
    },
    methods: {
        disablePeriod(facility) {
            if (this.facilities.includes(facility)) {
                this[`${facility.toLowerCase().replace(' ', '_')}_period`] = null;
            }
        },
        updatePositions() {
            const maxWidth = 1920;
            const currentWidth = window.innerWidth;
            const proportion = currentWidth / maxWidth;

            const laundryContainer = document.querySelector(".laundry-container");
            const cateringContainer = document.querySelector(".catering-container");

            if (laundryContainer) {
                laundryContainer.style.left = `${29 * proportion}%`;
            }

            if (cateringContainer) {
                cateringContainer.style.right = `${29 * proportion}%`;
            }
        },
        redirPayment() {
            localStorage.setItem('rent_periods', this.form.rent_periods);
            localStorage.setItem('total_bill', this.totalPrice);
            this.$router.push('/user/sewa/bayar');
        },
    },
    mounted() {
        this.updatePositions();
        window.addEventListener("resize", this.updatePositions);
    },
    beforeDestroy() {
        window.removeEventListener("resize", this.updatePositions);
    },
};
</script>

<style scoped>
.top-rent {
    text-align: center;
    margin-top: 30px;
    margin-bottom: 60px;
    font-size: 45px;
}

.spec-container {
    margin-left: 20px;
    font-size: 20px;
}

.spec-container h1 {
    margin-top: 30px;
}

.top-container {
    display: flex;
    justify-content: space-evenly;
}

.list-container {
    margin-left: 20px;
}

.img-container img {
    width: 200px;
}

.radio-header, .addition-header {
    text-align: center;
    font-size: 30px;
    margin-top: 40px;
    margin-bottom: 20px;
}

.radio-container, .checkbox-container {
    display: flex;
    justify-content: center;
    gap: 30px;
    margin-top: 20px;
}

.radio-card, .facility-card {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    border: 2px solid #ccc;
    border-radius: 10px;
    padding: 20px;
    width: 150px;
    text-align: center;
    cursor: pointer;
    transition: all 0.3s ease-in-out;
}

.radio-card.active, .facility-card.active {
    border-color: #4caf50;
    background-color: #e8f5e9;
}

.radio-card:hover, .facility-card:hover {
    border-color: #4caf50;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.radio-card input, .facility-card input {
    position: absolute;
    opacity: 0;
    pointer-events: none;
}

.radio-card .card-content h2 {
    font-size: 20px;
    margin: 10px 0 5px 0;
}

.facility-card .card-content {
    display: flex;
    align-items: center;
    height: 100%;
}

.facility-card .card-content h2 {
    font-size: 20px;
}

.facility-period-container {
    display: flex;
    margin-top: 30px;
    margin-bottom: 300px;
}

.laundry-container, .cleaning-service-container, .catering-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 10px;
    text-align: center;
}

.laundry-container {
    position: absolute;
    left: 29%;
}

.cleaning-service-container {
    position: absolute;
    left: 45%;
    right: 45%;
}

.catering-container {
    position: absolute;
    right: 29%;
}

.period-card {
    display: flex;
    flex-direction: column;
    align-items: center;
    border: 2px solid #ccc;
    border-radius: 10px;
    padding: 20px;
    width: 150px;
    text-align: center;
    cursor: pointer;
    transition: all 0.3s ease-in-out;
}

.period-card.active {
    border-color: #4caf50;
    background-color: #e8f5e9;
}

.period-card:hover {
    border-color: #4caf50;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.period-card input {
    position: absolute;
    opacity: 0;
    pointer-events: none;
}

.period-card .card-content h2 {
    font-size: 20px;
    margin: 10px 0 5px 0;
}

.total-price {
    text-align: center;
    margin-bottom: 30px;
}

.payment-container {
    display: flex;
    justify-content: center;
}

</style>