<template>
  <div>
    <KostHeader />
    <h1>Fasilitas Kost</h1>
    <p>Di KostIT, kami menjamin kenyamanan para penghuni kost dengan fasilitas - fasilitas yang disediakan berikut.</p>
    <FacilityLayout>
    </FacilityLayout>
  </div>
  <KostFooter />
</template>
  
<script>
  import FacilityLayout from '~/layouts/FacilityLayout.vue';
  
  export default {
    components: {
      FacilityLayout
    }
  };
</script>
  
<style scoped>
  p, h1 {
    text-align: center;
  }

  p {
    font-size: 1.1rem;
    margin-bottom: 40px;
  }

  h1 {
    margin-bottom: 20px;
    margin-top: 100px;
  }
</style>
  