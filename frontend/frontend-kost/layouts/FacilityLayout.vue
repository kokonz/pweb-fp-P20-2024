<template>
    <div class="carousel-container relative w-11/12 max-w-5xl mx-auto overflow-hidden">
        <div class="carousel-wrapper flex transition-transform duration-500" :style="carouselStyle">
            <div v-for="(facility, index) in facilities" :key="index" class="carousel-item flex-none w-1/3 p-5 flex justify-center items-center">
                <div class="card w-full max-w-sm h-52 p-5 bg-gray-100 border border-gray-300 rounded-lg shadow-md text-center">
                    <h2 class="text-lg font-bold mb-3">{{ facility.title }}</h2>
                    <p class="text-gray-600">{{ facility.description }}</p>
                </div>
            </div>
        </div>
    </div>
    <button @click="prev" class="nav-button prev absolute top-1/2 -translate-y-1/2 left-4 bg-black bg-opacity-50 text-white px-3 py-2 text-lg rounded-full hover:bg-opacity-80 z-10">&#10094;</button>
    <button @click="next" class="nav-button next absolute top-1/2 -translate-y-1/2 right-4 bg-black bg-opacity-50 text-white px-3 py-2 text-lg rounded-full hover:bg-opacity-80 z-10">&#10095;</button>
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
</style>
