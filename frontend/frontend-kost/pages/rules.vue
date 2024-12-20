<template>
    <div>
        <KostHeader />
        <div class="rules-container">
            <h1>Peraturan Kost</h1>
            <div class="rules-list">
                <ol>
                    <li>Dilarang membawa atau mengonsumsi alkohol, narkoba, dan barang terlarang lainnya di dalam kost.</li>
                    <li>Penghuni kost wajib menjaga kebersihan kamar dan area bersama.</li>
                    <li>Dilarang merusak fasilitas kost atau mengubah tata letak ruangan tanpa izin.</li>
                    <li>Suara radio, TV, atau musik harus dalam volume wajar agar tidak mengganggu penghuni lainnya.</li>
                    <li>Tidak diperkenankan membawa pasangan atau teman lawan jenis ke dalam kamar.</li>
                    <li>Setiap penghuni kost harus membayar biaya kost tepat waktu sesuai dengan ketentuan yang berlaku.</li>
                    <li>Penghuni kost wajib menjaga ketertiban dan tidak mengganggu kenyamanan tetangga atau penghuni lain.</li>
                    <li>Pintu kamar kost harus selalu terkunci saat tidak ada penghuni di dalam.</li>
                    <li>Penghuni kost harus melapor kepada pemilik kost jika ada kunjungan dari pihak luar atau perubahan data pribadi.</li>
                    <li>Setiap penghuni kost harus melaporkan kerusakan fasilitas kost kepada pemilik atau pengelola kost.</li>
                    <li>Tidak diperkenankan membawa hewan peliharaan di dalam kost.</li>
                </ol>
            </div>
            <h1>Peringatan</h1>
            <div class="rules-list">
                <ol>
                    <li>Jika penghuni kost menerima 1 peringatan, maka akan diingatkan secara lansgung.</li>
                    <li>Jika penghuni kost menerima 2 peringatan, maka akan didenda sebesar Rp200.000.</li>
                    <li>Jika penghuni kost menerima 3 peringatan, maka akan langsung dikeluarkan dari kost.</li>
                </ol>
            </div>
        </div>
    </div>
    <KostFooter />
</template>

<style scoped>
    h1 {
        text-align: center;
        margin-top: 50px;
        margin-bottom: 20px;
    }
    
    .rules-container {
        height: 500px;
    }

    .rules-list {
        margin-left: 40px;
    }
</style>