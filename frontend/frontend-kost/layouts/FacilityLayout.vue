<template>
    <div class="carousel-container">
        <div class="carousel-wrapper" :style="carouselStyle">
            <div v-for="(facility, index) in facilities" :key="index" class="carousel-item">
                <div class="card">
                    <h2>{{ facility.title }}</h2>
                    <p>{{ facility.description }}</p>
                </div>
            </div>
        </div>
    </div>
    <button @click="prev" class="nav-button prev">&#10094;</button>
    <button @click="next" class="nav-button next">&#10095;</button>
</template>

<script>
    export default {
        data() {
            return {
                currentIndex: 0,
                facilities: [
                { title: 'Laundry', description: 'Fasilitas laundry di kost menyediakan layanan cuci pakaian, baik pakaian biasa maupun pakaian khusus seperti jaket atau selimut.' },
                { title: 'Cleaning Service', description: 'Fasilitas cleaning service memberikan layanan pembersihan rutin untuk kamar kost dan area umum.' },
                { title: 'Catering', description: 'Layanan catering menyediakan makanan bagi penghuni kost yang ingin memesan makanannya secara praktis.' },
                { title: 'Wi-Fi', description: 'Fasilitas Wi-Fi memberikan akses internet dengan kecepatan tinggi untuk mendukung aktivitas penghuni kost.' },
                { title: 'Kamar Mandi Dalam dengan Air Panas', description: 'Fasilitas kamar mandi di tiap ruangan yang dilengkapi dengan air panas.' },
                { title: 'Air Conditioner (AC)', description: 'Fasilitas air conditioner (AC) di tiap ruangan untuk menjamin kenyamanan penghuni kost.' },
                { title: 'Parkir', description: 'Fasilitas parkir yang luas dan aman untuk kendaraan penghuni kost.' },
                { title: 'Ruang Bersama / Lounge', description: 'Ruang di kost yang bisa digunakan penghuni untuk bersantai maupun berkumpul.' }
                ]
            };
        },
        computed: {
            carouselStyle() {
                return {
                    transform: `translateX(-${this.currentIndex * 33.33}%)`, // Adjusting for 3 items per view
                    transition: 'transform 0.5s ease-in-out'
                };
            }
        },
        methods: {
            next() {
                this.currentIndex = (this.currentIndex + 1) % (this.facilities.length - 2); // Adjust for 3 items at a time
            },
            prev() {
                this.currentIndex = (this.currentIndex - 1 + this.facilities.length - 2) % (this.facilities.length - 2); // Adjust for 3 items at a time
            }
        }
    };
</script>

<style scoped>
    .carousel-container {
        position: relative;
        width: 90%;
        max-width: 1200px;
        overflow: hidden;
        margin: 0 auto;
    }

    .carousel-wrapper {
        display: flex;
        transition: transform 0.5s ease-in-out;
    }

    .carousel-item {
        min-width: 33.33%; /* Adjusted to show 3 items at once */
        padding: 20px;
        box-sizing: border-box;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .card {
        width: 100%;
        max-width: 300px;
        height: 200px;
        padding: 20px;
        box-sizing: border-box;
        text-align: center;
        border: 1px solid #ddd;
        background-color: #f9f9f9;
        border-radius: 8px;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    }

    .card h2 {
        margin-bottom: 10px;
    }

    .nav-button {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        background-color: rgba(0, 0, 0, 0.5);
        color: white;
        border: none;
        padding: 10px;
        font-size: 18px;
        cursor: pointer;
        z-index: 1;
        transition: background-color 0.3s;
    }

    .nav-button.prev {
        left: 10px;
    }

    .nav-button.next {
        right: 10px;
    }

    .nav-button:hover {
        background-color: rgba(0, 0, 0, 0.8);
    }

    @media (max-width: 960px) {
        .card {
            height: 250px;
        }
    }
    
    @media (max-width: 768px) {
        .carousel-container {
            width: 100%;
        }
        .card {
            max-width: 90%;
            padding: 15px;
            font-size: 12px;
        }
        .card h2 {
            font-size: 16px;
        }
        .nav-button {
            top: 60%;
        }
    }

    @media (max-width: 480px) {
        .card {
            max-width: 100%;
            padding: 10px;
        }
    }
</style>
