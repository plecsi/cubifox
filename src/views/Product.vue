<template>
    <div class="container">
        <h2>Product</h2>
        <a @click="$router.go(-1)" class="btn btn-outline-dark mb-3"><i class="fa fa-arrow-circle-left"></i><span>back</span></a>
        <product :product="product" :visit="true"/>
    </div>
</template>
<script>
import Product from '@/components/Product.vue'
export default {
    components: {
        Product
    },
    data() {
        return {
            product: this.$store.state.products.find(product => product.id == this.$route.params.id)
        }
    }
}
</script>