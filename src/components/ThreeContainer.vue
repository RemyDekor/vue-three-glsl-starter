<template>
    <ThreeWrapper style="width: 100%; height: 600px;">
        <ThreeBox
            v-for="(obj, index) of chartValues"
            :key="index"
            :x1="((index / chartValues.length) * 100)"
            :x2="((index / chartValues.length) * 100) + (100 / chartValues.length)"
            :y1="100"
            :y2="100 - obj.val"
            :color="obj.color"
            :value="obj.val"
        ></ThreeBox>
    </ThreeWrapper>
</template>

<script>
import ThreeWrapper from "./ThreeWrapper.vue";
import ThreeBox from "./ThreeBox.vue";

export default {
    name: "ThreeContainer",
    components: {
        ThreeWrapper,
        ThreeBox
    },
    props: {},
    //////////
    data: () => ({
        chartValues: [
            { val: 24, color: "red" },
            { val: 32, color: "#0f0" },
            { val: 66, color: "rebeccapurple" },
            { val: 1, color: "green" },
            { val: 28, color: "blue" },
            { val: 60, color: "rgba(150, 100, 0, 0.2)" }
        ]
    }),
    mounted() {
        let dir = 1;
        let selectedVal = Math.floor(Math.random() * this.chartValues.length);

        setInterval(() => {
            if (Math.random() > 0.995) dir *= -1;
            if (Math.random() > 0.99)
                selectedVal = Math.floor(
                    Math.random() * this.chartValues.length
                );

            this.chartValues[selectedVal].val = Math.min(
                Math.max(this.chartValues[selectedVal].val + dir * 0.5, 0),
                100
            );
        }, 16);
    }
    //////////////
};
</script>

<style lang="scss" scoped>
</style>
