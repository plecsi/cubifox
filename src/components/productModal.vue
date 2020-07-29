<template>
    <div class="row justify-content-end">
        <div class="col-auto">
            <button type="button" @click="openModal" class="btn btn-primary"><i class="fa fa-cubes"></i><span>Add Product</span></button>
        </div>
        <transition name="modal" v-if="modal.showModal">
            <div class="modal-mask">
            <div class="modal-wrapper">
                <div class="modal-container">
                <div class="modal-header">
                    <span v-if="!modal.edit"><i class="fa fa-cart"></i>Add product</span>
                    <span v-if="modal.edit"><i class="fa fa-wrench"></i>Edit product</span>
                    </div>
                <div class="modal-body">
                    <form @submit.prevent> 
                        <label>product name</label>
                        <input type="text" class="form-control" v-model="modal.editP.product_name" required/>
                        <label>product code</label>
                        <input type="number" class="form-control" v-model="modal.editP.product_code"/>
                        <label>price</label>
                        <input type="number" class="form-control" v-model="modal.editP.price"/>
                        <label>available</label>
                        <input type="number" class="form-control" v-model="modal.editP.stock"/>
                        <label>stock</label>
                        <select v-model="modal.editP.availability" class="form-select">
                            <option disabled value="sdsd">Please select one</option>
                            <option value="true">Van</option>
                            <option value="false">Nincs</option>
                        </select>
                        <div class="modal-btn-group">
                            <button class="btn btn-outline-primary" @click="closeModal"><i class="fa fa-times"></i><span>Cancel</span></button>
                            <button class="btn btn-primary" v-if="!modal.edit" @click="addProduct"><i class="fa fa-save"></i><span>Send</span></button>
                            <button class="btn btn-primary" v-if="modal.edit" @click="edit"><i class="fa fa-save"></i><span>Edit Product</span></button>
                        </div>
                    </form>
                </div>
                </div>
            </div>
            </div>
        </transition>
      </div>
</template>
<script>
export default {
    name: 'productModal',
    data(){
        return {
            modal: this.$store.state.e,
            product: this.$store.state.e
        }
    },
    methods: {
        openModal(){
            this.modal.showModal = true
        },
        closeModal() {
            this.modal.showModal = false
            this.modal.edit = false
            this.modal.editP = []
        },
        addProduct(){
            let product = {
                product_name: this.modal.editP.product_name,
                product_code: this.modal.editP.product_code,
                price: this.modal.editP.price,
                stock: this.modal.editP.stock,
                availability: this.modal.editP.availability,
            }
            this.$store.dispatch('addProduct', product)
            .then(()=>{
                this.modal.showModal = false
                this.modal.edit = false
                this.modal.editP = []
            })
        },
        edit(){
            let product = {
                id: this.modal.editP.id,
                product_name: this.modal.editP.product_name,
                product_code: this.modal.editP.product_code,
                price: this.modal.editP.price,
                stock: this.modal.editP.stock,
                availability: this.modal.editP.availability,
            }
            this.$store.dispatch('editProduct', product)
            .then(()=> {
                this.modal.showModal = false
                this.modal.edit = false
                this.modal.editP = []
            })
        }
    },
}
</script>
