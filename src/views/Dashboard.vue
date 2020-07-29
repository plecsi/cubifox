<template>
    <div>
        <h1>Dashboard</h1>
        <productModal/>
        <h2 class="border-bottom">Products</h2>
        <product v-for="product in products" :key="product.id" :product="product"/>
    </div>
</template>
<script>
import productModal from '@/components/productModal.vue'
import product from '@/components/Product.vue'
export default {
    name: "Dashboard",
     components: {
        productModal,
        product
    },
    computed: {
        products: function() {
            return this.$store.state.products
        }
    }
}
</script>
