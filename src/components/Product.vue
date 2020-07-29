<template>
    <div class="row product-wrapper">
        <div class="col-12"><h2>{{product.product_name}}</h2></div>
        <div class="col-6"><i class="fa fa-tags"></i><small>{{product.product_code}}</small></div>
        <div class="col-6 text-md-right"><h4><i class="fa fa-coins"></i>{{product.price}} {{$store.state.currency}}</h4></div>
        <div class="col-6 col-md-3"><i class="fa fa-truck"></i><small>{{product.stock}} db</small></div>
        <div class="col-6 col-md-3"><i class="fa fa-eye"></i><small>{{product.availability}}</small></div>
        <div class="col-auto btn-group product-btns" v-if="!visit">
            <router-link :to="'product/' + product.id" class="btn btn-outline-primary">
                <i class="fa fa-eye"></i>
            </router-link>
            <button class="btn btn-outline-secondary" @click="edit(product)"><i class="fa fa-wrench"></i></button>
            <button class="btn btn-outline-danger" @click="del(product.id)"><i class="fa fa-trash"></i></button>
        </div>
    </div>
</template>
<script>
export default {
    name: 'productModal',
    props: {
        product: {
            type: Object
        },
        visit: {
            type: Boolean
        }
    },
    methods: {
        edit(id){
            this.$store.dispatch("editInModal", id)
        },
        del(id) {
            let d = {
                id: id
            }
            this.$store.dispatch('deleteProduct', d)
            .then(()=>this.d = '')
        }
    }
}
</script>
