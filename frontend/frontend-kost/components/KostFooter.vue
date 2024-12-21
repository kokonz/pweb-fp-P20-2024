<template>
    <div class="footer">
        <div class="footer-container">
            <div class="left-container">
                <h2>KostIT</h2>
                <p>"Dari IT, untuk IT"</p>
            </div>
            <div class="right-container">
                <p><strong>Alamat:</strong> Perumahan Bumi Marina Emas Timur Tahap I Blok C VII. 48, Keputih, Kec. Sukolilo, Surabaya, Jawa Timur 60111</p>
                <p><strong>No. Telepon:</strong> 081420694206</p>
            </div>
        </div>
        <div class="footer-bottom">
            <p>@ 2024 KostIT | All Rights Reserved</p>
        </div>
    </div>
</template>

<style scoped>
    .footer {
        width: 97.4%;
        margin-top: 140px;
        background-color: #706993;
        padding: 20px;
        color: white;
    }

    .footer-container {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .left-container, .right-container {
        display: flex;
        flex-direction: column;
        justify-content: center;
        padding: 0 20px;
    }

    .right-container {
        width: 400px;
    }

    .footer-bottom {
        text-align: center;
        margin-top: 15px;
        font-size: 14px;
    }
</style>
