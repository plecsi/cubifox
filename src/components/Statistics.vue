<template>
    <aside>
        <h2>Stat</h2>
        <div class="d-flex justify-content-between align-items-center">
            <label>All products</label>
            <div class="badge bg-danger">{{$store.state.products.length}}</div>
        </div>
        <div class="d-flex justify-content-between align-items-center">
            <label>Product in stock</label>
            <div class="badge bg-success">{{$store.state.products.filter(product => product.stock > 0).length}}</div>
        </div>
         <div class="d-flex justify-content-between align-items-center">
            <label>Available</label>
            <div class="badge bg-warning">{{$store.state.products.filter(product => product.availability == "true").length}}</div>
        </div>
    </aside>
</template>
<script>
export default {
    name: "Statistics",
}
</script>