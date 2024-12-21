<template>
    <div>
        <KostHeader />
        <div class="home-container">
            <h1 class="home-header">Dari IT, untuk IT</h1>
            <img src="../static/kostit-home.png" class="kostit-home" />
            <div class="about-us-container">
                <div class="about-us1">
                    <h1>Tentang Kami</h1>
                    <p>
                        KostIT, yang sebelumnya dikenal dengan nama Kos Gholmasyn Pak Karyo, adalah kost dari HMIT untuk mahasiswa
                        Departemen Teknologi Informasi. Awal mula dari perjalanan kami adalah ketika HMIT mengakuisisi Kos Gholmasyn Pak Karyo dan
                        membuat sebuah perjanjian rahasia dengan Pak Karyo, pemilik dari Kos Gholmasyn Pak Karyo. Semenjak akuisisi HMIT, kost ini
                        berubah nama menjadi KostIT dan diharapkan menjadi kost yang inklusif untuk mahasiswa Departemen Teknologi Informasi ITS.
                    </p>
                </div>
                <div class="about-us2">
                    <img src="../static/kostit-about-us.jpg" class="kostit-about-us" />
                </div>
            </div>
            <h1 class="explore-header">Lihat Lebih Lanjut</h1>
            <div class="explore-container">
                <ButtonLayout @click="redirFacility">
                    Fasilitas
                </ButtonLayout>
                <ButtonLayout @click="redirPeraturan">
                    Peraturan
                </ButtonLayout>
            </div>
        </div>
        <KostFooter />
    </div>
</template>

<script>
import ButtonLayout from '~/layouts/ButtonLayout.vue';

export default {
    components: {
        ButtonLayout,
    },
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

<style scoped>
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

.about-us2 img {
    width: 250px;
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
</style>
