<template>
    <div class="flex flex-col min-h-screen">
        <!-- Header -->
        <KostHeader />

        <!-- Home Section -->
        <div class="home-container flex flex-col items-center justify-center py-12 bg-gray-100">
            <h1 class="text-4xl font-extrabold text-gray-800 text-center mb-6">
                Dari <span class="text-blue-500">I</span>T, untuk <span class="text-blue-500">I</span>T
            </h1>
            <img src="../static/kostit-home.png" alt="KostIT Home" class="rounded-lg shadow-lg w-5/6 md:w-2/3 lg:w-1/2">
        </div>

        <!-- About Us Section -->
        <div class="about-us-container grid grid-cols-1 md:grid-cols-2 gap-8 px-6 py-12 bg-white mx-20">
            <div class="about-us1 flex flex-col justify-center">
                <h1 class="text-3xl font-semibold text-gray-800 mb-4">Tentang Kami</h1>
                <p class="text-gray-600 text-lg leading-relaxed">
                    KostIT, yang sebelumnya dikenal dengan nama Kos Gholmasyn Pak Karyo, adalah kost dari HMIT untuk mahasiswa
                    Departemen Teknologi Informasi. Awal mula dari perjalanan kami adalah ketika HMIT mengakuisisi Kos Gholmasyn
                    Pak Karyo dan membuat sebuah perjanjian rahasia dengan Pak Karyo, pemilik dari Kos Gholmasyn Pak Karyo.
                    Semenjak akuisisi HMIT, kost ini berubah nama menjadi KostIT dan diharapkan menjadi kost yang inklusif untuk
                    mahasiswa Departemen Teknologi Informasi ITS.
                </p>
            </div>
            <div class="about-us2 flex justify-center">
                <img src="../static/kostit-about-us.jpg" alt="About Us" class="rounded-lg shadow-lg w-5/6 md:w-3/4 lg:w-2/3">
            </div>
        </div>

        <!-- Explore Section -->
        <div class="explore-section text-center py-12 bg-gray-50">
            <h1 class="text-3xl font-semibold text-gray-800 mb-8">Lihat Lebih Lanjut</h1>
            <div class="explore-container flex flex-col md:flex-row justify-center items-center gap-6">
                <button class="btn button-facility bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-8 rounded-lg shadow-md transition"
                        @click="redirFacility">
                    Fasilitas
                </button>
                <button class="btn button-rules bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-8 rounded-lg shadow-md transition"
                        @click="redirPeraturan">
                    Peraturan
                </button>
            </div>
        </div>

        <!-- Footer -->
        <KostFooter />
    </div>
</template>

<style>
/***** Tailwind CSS styles are applied directly to the HTML *****/
</style>


<script>
    export default {
        methods: {
            redirFacility() {
                this.$router.push('/facility');
            },
            redirPeraturan() {
                this.$router.push('/rules');
            },
        },
    };
</script>

<!-- <style scoped>
    .home-container {
        width: 100%;
    }

    .home-header {
        margin-top: 20px;
        text-align: center;
        margin-bottom: 40px;
    }

    .kostit-home {
        max-width: 100%;
        width: 1000px;
        height: auto;
        display: block;
        margin: 0 auto;
    }

    .about-us-container {
        margin-top: 100px;
        display: flex;
    }

    .about-us1, .about-us2 {
        width: 50%;
        padding: 0 40px;
    }

    .about-us1 h1 {
        text-align: center;
        margin-bottom: 20px;
    }

    .about-us1 p {
        font-size: 1.2rem;
        text-align: justify;
    }

    .kostit-about-us {
        width: 200px;
        display: block;
        margin: 0 auto;
    }

    .explore-header {
        text-align: center;
        margin-top: 70px;
    }

    .explore-container {
        margin-top: 60px;
        width: 100%;
        display: flex;
        justify-content: space-evenly;
        align-items: center;
    }

    .btn {
        background-color: #706993;
        width: 150px;
        height: 50px;
        display: flex;
        justify-content: center;
        align-items: center;
        color: white;
        border-radius: 25px;
        font-size: 1.1rem;
        transition: 0.15s;
        cursor: pointer;
    }

    .btn:hover {
        background-color: #554f74;
        color: #ded9fa;
    }
</style> -->