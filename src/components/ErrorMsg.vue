<template>
    <div class="alert" :class="[msg.msg_type, def]">
        <span>{{msg.message}}</span>
    </div>
</template>
<script>
export default {
    name: 'ErrorMsg',
    data() {
        return {
            def: 'msg',
        }
    },
    props:{
        msg:{
            type: Object,
            message: {
                type: String
            },
            msg_type: {
                type: String
            }
        }
    }
}
</script>