import { Vue, Component } from "vue-property-decorator";

export default class windowSize extends Vue {
    windowHeight: any = 0;
    windowWidth: any = 0;

    created() {
        window.addEventListener("resize", this.getWindowSize);
        this.getWindowSize();
    }

    beforeDestroy() {
        window.removeEventListener("resize", this.getWindowSize);
    }

    getWindowSize() {
        this.windowHeight = window.innerHeight;
        this.windowWidth = window.innerWidth;
    }
}
