<template>
    <div class="v-grid" :style="style" >
        <GridItem v-for="v in list" :key="v.index" :index="v.index" :sort="v.sort" :cellTop="cellTop" :cellLeft="0" :draggable="draggable" :drag-delay="dragDelay" :row-count="rowCount" :cell-width="cellWidth" :cell-height="cellHeight" :window-width="windowWidth" :row-shift="rowShift" @dragstart="onDragStart" @dragend="onDragEnd" @drag="onDrag" @click="click">
            <slot name="cell" :item="v.item" :index="v.index" :sort="v.sort" :remove="() => { removeItem(v) }"  />
            </slot>
        </GridItem>
    </div>
</template>
<script lang="ts">
import { Component, Vue, Prop, Watch } from "vue-property-decorator";
import { State, Getter, Action, Mutation, namespace } from "vuex-class";
// import windowSize from "../mixins/window_size";
import GridItem from "@/components/grid/GridItem.vue";
@Component({ components: { GridItem } })
export default class Grid extends Vue {
    // mixins: [windowSize]
    @Prop({ default: () => [] })
    items!: [object];
    @Prop() refKey!: string;
    @Prop({ default: 80 })
    cellWidth!: number;
    @Prop({ default: 80 })
    cellHeight!: number;
    @Prop({ default: 0 })
    cellTop!: number;
    @Prop({ default: 0 })
    cellLeft!: number;
    @Prop({ default: false })
    draggable!: boolean;
    @Prop({ default: 0 })
    dragDelay!: number;
    @Prop({ default: false })
    sortable!: boolean;
    @Prop({ default: true })
    center!: boolean;
    windowWidth: any = 0;
    windowHeight: any = 0;
    list: any = [];
    parentRef: any;
    created() {
        // window.addEventListener("resize", this.getWindowSize);
        // this.getWindowSize();
        // console.log(this.refKey);
    }
    mounted() {
        // console.log(this.cellTop);
        this.parentRef = (this.$parent.$refs as any)[this.refKey][0];
        window.addEventListener("resize", this.getWindowSize);
        this.getWindowSize();
        // console.log(this.rowCount);
    }
    @Watch("items", { immediate: true, deep: true })
    handler(nextItems = []) {
        this.list = nextItems.map((item, index) => {
            return {
                item,
                index: index,
                sort: index
            };
        });
    }
    get rowCount() {
        return Math.floor(this.windowWidth / this.cellWidth);
    }
    get height() {
        // console.log(this.cellHeight);
        return (
            Math.ceil(this.items.length / this.rowCount) *
            (this.cellHeight + this.cellTop)
        );
    }
    get style() {
        return {
            height: this.height + "px"
            // margin:this.margin
        };
    }
    get rowShift() {
        if (this.center) {
            let contentWidth = this.items.length * this.cellWidth;
            let rowShift =
                contentWidth < this.windowWidth
                    ? (this.windowWidth - contentWidth) / 2
                    : (this.windowWidth % this.cellWidth) / 2;
            // console.log(rowShift);
            return Math.floor(rowShift);
        }

        return 0;
    }
    beforeDestroy() {
        window.removeEventListener("resize", this.getWindowSize);
    }
    getWindowSize() {
        let parentRef = this.parentRef;
        // console.log(parentRef);
        this.windowHeight = parentRef.offsetHeight;
        this.windowWidth = parentRef.offsetWidth;
        // console.log( parentRef.offsetHeight,parentRef.offsetWidth);
    }
    /* Returns merged event object */
    wrapEvent(other = {}) {
        return {
            datetime: Date.now(),
            items: this.getListClone(),
            ...other
        };
    }
    /* Returns sorted clone of "list" array */
    getListClone() {
        return this.list.slice(0).sort((a: any, b: any) => {
            return a.sort - b.sort;
        });
        //  .map(v => {
        //    return { ...v.item }
        //  })
    }

    removeItem({ index }: any) {
        let removeItem = this.list.find((v: any) => v.index === index);
        let removeItemSort = removeItem.sort;

        this.list = this.list
            .filter((v: any) => {
                return v.index !== index;
            })
            .map((v: any) => {
                let sort = v.sort > removeItemSort ? v.sort - 1 : v.sort;

                return { ...v, sort };
            });
            let x = this.wrapEvent({ index })
        this.$emit("remove", x);
    }

    onDragStart(event: any) {
        this.$emit("dragstart", this.wrapEvent(event));
    }

    onDragEnd(event: any) {
        this.$emit("dragend", this.wrapEvent(event));
    }

    click(event: any) {
        this.$emit("click", this.wrapEvent(event));
    }

    onDrag(event: any) {
        if (this.sortable) {
            this.sortList(event.index, event.gridPosition);
        }

        this.$emit("drag", this.wrapEvent({ event }));
    }

    sortList(itemIndex: any, gridPosition: any) {
        let targetItem = this.list.find(
            (item: any) => item.index === itemIndex
        );
        let targetItemSort = targetItem.sort;

        /*
        Normalizing new grid position
      */
        gridPosition = Math.max(gridPosition, 0);
        /*
        If you remove this line you can drag items to positions that
        are further than items array length
      */
        gridPosition = Math.min(gridPosition, this.list.length - 1);

        if (targetItemSort !== gridPosition) {
            this.list = this.list.map((item: any) => {
                if (item.index === targetItem.index) {
                    return {
                        ...item,
                        sort: gridPosition
                    };
                }

                const { sort } = item;

                if (targetItemSort > gridPosition) {
                    if (sort <= targetItemSort && sort >= gridPosition) {
                        return {
                            ...item,
                            sort: sort + 1
                        };
                    }
                }

                if (targetItemSort < gridPosition) {
                    if (sort >= targetItemSort && sort <= gridPosition) {
                        return {
                            ...item,
                            sort: sort - 1
                        };
                    }
                }

                return item;
            });

            this.$emit("sort", this.wrapEvent());
        }
    }
}
</script>
<style lang="scss">
body {
    margin: 0;
    padding: 0;
}

.v-grid {
    display: block;
    position: relative;
    width: 100%;
}
</style>
