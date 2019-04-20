<template>
    <div class="threeContainer">
        <canvas ref="canvasEl"></canvas>
        <slot></slot>
    </div>
</template>

<script>
export default {
    name: "ThreeCanvas",
    data() {
        return {
            provider: {
                context: null
            }
        };
    },
    provide() {
        return {
            provider: this.provider
        };
    },
    mounted() {
        this.provider.context = this.$refs["canvasEl"].getContext("2d");

        this.$refs["canvasEl"].width = this.$refs[
            "canvasEl"
        ].parentElement.clientWidth;
        this.$refs["canvasEl"].height = this.$refs[
            "canvasEl"
        ].parentElement.clientHeight;
    }
};
</script>

<style lang="scss" scoped>
#threeContainer {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: -1;
    display: block;
}
</style>
