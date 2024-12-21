<template>
    <button @click="goBack" class="back-button">
        <span class="arrow">&larr;</span>
        <span class="text">Kembali</span>
    </button>
</template>

<script>
export default {
    props: {
        to: {
            type: String,
            default: null,
        },
    },
    methods: {
        goBack() {
            if (this.to) {
                this.$router.push(this.to);
            } else {
                this.$router.go(-1);
            }
        },
    },
};
</script>

<style scoped>
.back-button {
    margin-left: 30px;
    margin-top: 20px;
    display: inline-flex;
    align-items: center;
    gap: 8px;
    font-size: 16px;
    font-weight: 500;
    color: white;
    background-color: #706993;
    border: 1px solid #ddd;
    padding: 8px 16px;
    border-radius: 6px;
    cursor: pointer;
    transition: background-color 0.2s ease, box-shadow 0.2s ease;
}

.back-button:hover {
    background-color: #b9adf5;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
}

.arrow {
    font-size: 18px;
    color: white;
}

.text {
    color: white;
}
</style>
