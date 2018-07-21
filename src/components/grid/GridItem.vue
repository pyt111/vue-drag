<template>
    <div ref="self" :class="className" :style="style" @mousedown.prevent="mousedown($event)" @touchstart.prevent="mousedown($event)" class="qq">
        <slot/>
    </div>
</template>

<script lang="ts">
// import Vue from 'vue';
import { Component, Vue, Prop, Watch } from "vue-property-decorator";
// import { State, Getter, Action, Mutation, namespace } from "vuex-class";
const CLICK_PIXEL_DISTANCE = 4;
@Component({})
export default class GridItem extends Vue {
    @Prop() index!: number;
    @Prop() cellWidth!: number;
    @Prop() sort!: number;
    @Prop() cellHeight!: number;
    @Prop() rowCount!: number;
    @Prop({ default: 0 })
    rowShift!: number;
    @Prop({ default: 0 })
    cellTop!: number;
    @Prop({ default: 0 })
    cellLeft!: number;
    @Prop({default:false}) draggable!: boolean;
    @Prop({ default: 0 })
    dragDelay!: number;
    animate: any = true;
    dragging: any = false;
    shiftStartX: any = 0;
    shiftStartY: any = 0;
    mouseMoveStartX: any = 0;
    mouseMoveStartY: any = 0;
    shiftX: any = 0;
    shiftY: any = 0;
    timer: any = null;
    zIndex: any = 1;
    mounted() {
        // (this.$refs.self as any).addEventListener(
        //     "transitionend",
        //     (event: any) => {
        //         if (!this.dragging) {
        //             this.zIndex = 1;
        //         }
        //     },
        //     false
        // );
        // console.log(this.cellTop);
    }

    get className() {
        let { animate, dragging } = this;

        return [
            "v-grid-item-wrapper",
            {
                "v-grid-item-animate": animate,
                "v-grid-item-dragging": dragging
            }
        ];
    }
    get style() {
        let { zIndex, cellWidth, cellHeight, top, left } = this;
        // console.log(zIndex,cellWidth,top);
        return {
            zIndex,
            width: cellWidth + "px",
            height: cellHeight + "px",
            transform: `translate3d(${left}px, ${top}px, 0)`
        };
    }

    get left() {
        return this.dragging
            ? this.shiftX
            : this.rowShift + (this.sort % this.rowCount) * this.cellWidth;
    }

    get top() {
        // console.log(this.sort,this.rowCount,this.cellHeight,this.cellTop,"===",Math.floor(this.sort / this.rowCount) * (this.cellHeight + this.cellTop));
        return this.dragging
            ? this.shiftY
            : Math.floor(this.sort / this.rowCount) *
                  (this.cellHeight + this.cellTop);
    }
    wrapEvent(event: any) {
        let { index, sort } = this;
        return { event, index, sort };
    }
    dragStart(event: any) {
        let e = event.touches ? event.touches[0] : event;
        console.log(this.top);
        this.zIndex = 2;

        this.shiftX = this.shiftStartX = this.left;
        this.shiftY = this.shiftStartY = this.top;

        this.mouseMoveStartX = e.pageX;
        this.mouseMoveStartY = e.pageY;

        this.animate = false;
        this.dragging = true;

        document.addEventListener("mousemove", this.documentMouseMove);
        document.addEventListener("touchmove", this.documentMouseMove);

        // this.$emit("dragstart", this.wrapEvent(event));
    }

    drag(event: any) {
        let e = event.touches ? event.touches[0] : event;

        let distanceX = e.pageX - this.mouseMoveStartX; //当前端口移动的X方向以及距离
        let distanceY = e.pageY - this.mouseMoveStartY; //当前端口移动的Y方向以及距离
        console.log(distanceX, distanceY);
        this.shiftX = distanceX + this.shiftStartX;
        this.shiftY = distanceY + this.shiftStartY;

        let gridX = Math.round(this.shiftX / this.cellWidth);
        let gridY = Math.round(this.shiftY / (this.cellHeight + this.cellTop));

        gridX = Math.min(gridX, this.rowCount - 1);
        gridY = Math.max(gridY, 0);

        let gridPosition = gridX + gridY * this.rowCount;

        const $event = {
            event,
            distanceX,
            distanceY,
            positionX: this.shiftX,
            positionY: this.shiftY,
            index: this.index,
            gridX,
            gridY,
            gridPosition
        };

        this.$emit("drag", $event);
    }
    mousedown(e: any) {
        let oe = e || event;
        oe.stopImmediatePropagation();
        oe.stopPropagation();
        console.log(this.draggable);
        if (this.draggable) {
            this.timer = setTimeout(() => {
                this.dragStart(oe);
            }, this.dragDelay);

            document.addEventListener("mouseup", this.documentMouseUp);
            document.addEventListener("touchend", this.documentMouseUp);
        }
    }

    documentMouseMove(event: any) {
        if (this.draggable && this.dragging) {
            this.drag(event);
        }
    }

    documentMouseUp(event: any) {
        if (this.timer) {
            clearTimeout(this.timer);
            this.timer = null;
        }

        let dx = this.shiftStartX - this.shiftX;
        let dy = this.shiftStartY - this.shiftY;

        let distance = Math.sqrt(dx * dx + dy * dy);

        this.animate = true;
        this.dragging = false;
        this.mouseMoveStartX = 0;
        this.mouseMoveStartY = 0;
        this.shiftStartX = 0;
        this.shiftStartY = 0;

        document.removeEventListener("mousemove", this.documentMouseMove);
        document.removeEventListener("touchmove", this.documentMouseMove);

        document.removeEventListener("mouseup", this.documentMouseUp);
        document.removeEventListener("touchend", this.documentMouseUp);

        let $event = this.wrapEvent(event);

        if (distance < CLICK_PIXEL_DISTANCE) {
            this.$emit("click", $event);
        }

        this.$emit("dragend", $event);
    }
}
</script>

<style lang="scss">
.v-grid-item-wrapper {
    display: block;
    position: absolute;
    box-sizing: border-box;

    left: 0;
    top: 0;

    user-select: none;
    transform: translate3d(0px, 0px, 0px);

    z-index: 1;

    &.v-grid-item-animate {
        transition: transform 800ms ease;
    }

    &.v-grid-item-dragging {
        //  z-index: 9000 !important;
    }
    
}
</style>
