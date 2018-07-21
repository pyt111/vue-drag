<template>
    <div class="wrapper">
        <div id="scrollBox" ref="scrollBox">
            <div v-for="item,key,i in allBox" class="portsKey" :id="key" :ref="key">

                <Grid :center="true" :draggable="draggable" @remove="remove" :refKey="key" :cellTop="30" :cellWidth="100" :cellHeight="50" :sortable="true" :items="item.value" width="100" class="gards">

                    <template slot="cell" slot-scope="props">
                        <div :id="props.item.portId" class="ports" ref="ports" >
                            <span class="leftArc" @mousedown="mDown($event)" @mouseup="mUp($event)" @mousemove="mUp($event)"></span>

                            <i class="el-icon-circle-close-outline closes" color="red" @click="(v) => {  props.remove() }" @mousedown="mDown($event)" @mouseup="mUp($event)"></i>

                            {{key}}--{{props.item.name}} : {{props.index}}/{{props.sort}}
                            <span class="rightArc" @mousedown="mDown($event)" @mouseup="mUp($event)" @mousemove="mUp($event)"></span>

                        </div>
                    </template>

                </Grid>
            </div>
            <canvas id="myCanvas" ref="myCanvas"></canvas>
        </div>

    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from "vue-property-decorator";
import { State, Getter, Action, Mutation, namespace } from "vuex-class";
import Grid from "@/components/grid/Grid.vue";
@Component({ components: { Grid } })
export default class MyName extends Vue {
    // @Prop()
    // @Getter("")
    // @State("")
    // @Action("")
    // @Mutation("")
    // data = "";
    // created() {}
    c: any;
    ctx: any;
    mounted() {
        this.c = this.$refs.myCanvas as any;
        this.ctx = this.c.getContext("2d");
    }
    // @Watch("")
    // do1() {}
    items = ["a", "b", "c"] as any;
    draggable: boolean = true;
    allBox: any = {
        upLoad: {
            name: "上货口",
            value: [ {name: "人工上货1",portId: "div1",endId: ["div3"]},
                { name: "qq", portId: "2", endId: ["div4"] },
                { name: "bb", portId: "3", endId: [] },
                { name: "cc", portId: "4", endId: [] },
                { name: "dd", portId: "5", endId: [] },
                { name: "ee", portId: "6", endId: [] }
            ]
        },
        stockLine: {
            name: "进货线",
            value: [
                { name: "xx", portId: "7", endId: [] },
                { name: "yy", portId: "8", endId: [] },
                { name: "zz", portId: "9", endId: [] },
                { name: "uu", portId: "10", endId: [] },
                { name: "vv", portId: "", endId: [] }
            ]
        }
        // initialSort: {
        //     name: "初分口",
        //     value: [
        //         { name: "1", portId: "11", endId: [] },
        //         { name: "1", portId: "12", endId: [] },
        //         { name: "1", portId: "13", endId: [] },
        //         { name: "1", portId: "14", endId: [] }
        //     ]
        // },
        // downLine: {
        //     name: "下货线",
        //     value: [
        //         { name: "1", portId: "15", endId: [] },
        //         { name: "1", portId: "16", endId: [] },
        //         { name: "1", portId: "17", endId: [] },
        //         { name: "1", portId: "18", endId: [] },
        //         { name: "1", portId: "19", endId: [] },
        //         { name: "1", portId: "20", endId: [] }
        //     ]
        // },
        // downLoad: {
        //     name: "下货口",
        //     value: [
        //         { name: "1", portId: "21", endId: [] },
        //         { name: "1", portId: "22", endId: [] },
        //         { name: "1", portId: "23", endId: [] }
        //     ]
        // }
    }; //初始化各端口信息

    drowCondition() {
        
    }
    mDown(e: any) {
        let oe = e || event;
        oe.stopPropagation();
        oe.stopImmediatePropagation();
        console.log("wwwwwwwww");
        // this.draggable = false;
    }
    mUp(e: any) {
        let oe = e || event;
        oe.stopPropagation();
        oe.stopImmediatePropagation();
        // this.draggable = true;
    }
    remove(v: any) {
        console.log(v);
    }
    get compontedData() {
        return "";
    }
}
</script>
<style lang="scss" scoped>
* {
    box-sizing: border-box;
}
.wrapper {
    height: 95%;
    #scrollBox {
        position: relative;
        border: 1px solid #ccc;
        display: flex;
        height: 100%;
        width: 100%;
        .gards {
            width: 100%;
        }
        .portsKey {
            width: 20%;
            height: 100%;
            .ports {
                border: 1px solid #ccc;
                width: 100%;
                height: 100%;
                position: relative;
                .leftArc,
                .rightArc {
                    position: absolute;
                    display: inline-block;
                    width: 10px;
                    height: 10px;
                    border-radius: 50%;
                    border: 1px solid #ccc;
                    top: 0;
                    bottom: 0;
                    margin: auto;
                }
                .leftArc {
                    left: -10px;
                }
                .rightArc {
                    right: -10px;
                }

                .closes {
                    display: none;
                }
                .closes:before {
                    color: #de8787;
                }
            }
            .ports:hover {
                .closes {
                    display: block;
                    position: absolute;
                    right: 1px;
                    top: 1px;
                    -webkit-transform: scale(0.7);
                    transform: scale(0.7);
                    -moz-transform: scale(0.7);
                }
                .closes:hover {
                    transition: all 0.1s;
                    -webkit-transition: all 0.1s;
                    -moz-transition: all 0.1s;
                    -webkit-transform: scale(1);
                    transform: scale(1);
                    -moz-transform: scale(1);
                }
            }
        }
        #myCanvas {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
        }
    }
    .leftArc,
    .rightArc {
        position: absolute;
        display: inline-block;
        width: 10px;
        height: 10px;
        border-radius: 50%;
        border: 1px solid #ccc;
        top: 0;
        bottom: 0;
        margin: auto;
    }
    .leftArc {
        left: -10px;
    }
    .rightArc {
        right: -10px;
    }
}
</style>