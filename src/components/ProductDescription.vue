<template>
    <div>

    </div>
</template>

<script>
export default {
    name : "ProductDescription",
    props:{
        name,
        price,
        description,
        wayOfUse,
        seller,
        image
    },
    data(){
        return {
            defaultImage: require("@/assets/defaultHoneyImage.jpg");
        }
    },
    computed:{
        realOrDefaultImage() {
            if(typeof(this.image) !== 'undefined' && this.image != null){
                return this.image;
            }else{
                return this.defaultImage;
            }
        }
    }
}
</script>