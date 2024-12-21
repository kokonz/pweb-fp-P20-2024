<template>
    <div>
        <div class="btn" @click="$emit('click')">
            <slot></slot>
        </div>
    </div>
</template>

<script>
export default {
    name: "ButtonLayout",
};
</script>

<style scoped>
.btn {
    background-color: #706993;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    color: white;
    border-radius: 25px;
    font-size: 1.1rem;
    padding: 10px 20px;
    transition: 0.15s;
    cursor: pointer;
}

.btn:hover {
    background-color: #554f74;
    color: #ded9fa;
}
</style>
