<template>
    <div class="home">
        <!-- <img src="../assets/logo.png"> -->
        <!-- <icon name="left" :w="200" :h="200"></icon> -->
        <!-- <HelloWorld msg="Welcome to Your Vue.js + TypeScript App" /> -->
        <!-- <div id="divBox">
            <div class="Classification" ref="divs" v-for="item,key,i in allBox" :id="key" @click="change">
                <h2>{{item.}}</h2>

            </div>
        </div> -->
        <h3 class="h3">分拣线配置</h3>
        <div id="Box">
            <el-row class="elRow">
                <el-col :xs="24" :sm="15" :md="15" :lg="16" :xl="17" class="elCol elCol0">
                    <div id="scrollBox" ref="scrollBox">
                        <div id="divBox">
                            <div class="canvasBox" ref="divBox" @click.prevent="deleteLine($event)">
                                <h3 class="portOP">端口关系配置</h3>
                                <div class="Classification" ref="divs" v-for="item,key,i in allBox" :id="key">
                                    <h2>{{item.name}}</h2>
                                    <!-- <grid :draggable="true" :sortable="true" :items="items" :height="100" :width="100">
                                        <template slot="cell" scope="props">
                                            <div class="items">{{props}}</div>
                                        </template>
                                    </grid> -->
                                    <div class="portBox" v-for="(c, x) in item.value" :key="x" ref="portBox">
                                        <div v-if="c.portId" :id="c.portId" class="ports" @mousedown="mousedown($event,c.portId,key)" @mouseup="mouseup($event,c.portId,key)" :ref="c.portId" @click.stop="clickPort($event,key,c.portId,c.name)">
                                            <i class="el-icon-circle-close-outline closes" color="red" @click.stop="dialog($event,c.portId,key,c.name)"></i>
                                            <p class="nameIn">{{c.name}}</p>
                                            <!-- <input type="text" :value="c.name"> -->
                                        </div>
                                    </div>
                                    <el-button icon="el-icon-plus" @click.stop="clickAdd(key)" class="add"></el-button>
                                    <!-- <h2>+</h2> -->
                                </div>
                                <canvas id="myCanvas" ref="myCanvas"></canvas>
                            </div>
                            <!-- <el-button type="primary" @click="sub">保存</el-button> -->
                        </div>

                    </div>
                </el-col>
                <el-col :xs="24" :sm="9" :md="9" :lg="8" :xl="6" class="elCol elCol1">
                    <div id="portMesg">
                        <div class="pbox">
                            <h3 class="portOP1">端口属性</h3>
                        </div>
                        <el-tabs v-model="activeName" @tab-click="handleClick">

                            <el-tab-pane v-for="(item,key, index) in allBox" :key="item.key" :name="key">
                                <!-- {{key}} -->
                                <formCop :tabKey="key" />

                            </el-tab-pane>

                        </el-tabs>
                    </div>
                </el-col>
            </el-row>
        </div>
        <el-dialog title="提示" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
            <span>确定要删除&nbsp;'{{Dname||'新的端口'}}'&nbsp;吗？</span>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="deletePort">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script lang="ts">
import { equals } from "@/assets/js/p.ts";
import { Component, Vue, Watch } from "vue-property-decorator";
import { mapGetters } from "vuex";
import { State, Getter, Action, Mutation, namespace } from "vuex-class";

let UUID = require("es6-uuid");
import HelloWorld from "@/components/HelloWorld.vue"; // @ is an alias to /src
import formCop from "./ConfigurationCompontent/formCop.vue"; // @ is an alias to /src
@Component({ components: { HelloWorld, formCop } })
export default class Home extends Vue {
    @Getter("recordPort") recordPort: any;
    @Getter("nowPort") nowPort: any;
    @Getter("nowKey") nowKey: any;
    @Getter("newName") newName: any;
    @Getter("allBox") allBox: any;

    @Action("getProtRelFun") getProtRelFun: any;

    @Mutation("recordPortFun") recordPortFun: any;
    @Mutation("nowPortFun") nowPortFun: any;
    @Mutation("nowKeyFun") nowKeyFun: any;
    @Mutation("nowNameFun") nowNameFun: any;
    @Mutation("lineListFun") lineListFun: any;
    @Mutation("loadingFun") loadingFun: any;

    // get allBox() {
    //     console.log((this as any).objDeepCopy(this.allBox),'wwwe11111111111111111111111111');
    //     return this.allBoxs
    // }
    // @Watch('allBox')
    // t() {
    //     console.log('666666666666666666666666666');
    //     // this.allBox = this.
    // }
    async created() {
        // console.log(this);
        await this.getProtRelFun();
        let allBox = this.allBox as any;
        // console.log(allBox["upLoad"].value, "wwwwwwwwwwwwwwwww");

        if (allBox["upLoad"].value && allBox["upLoad"].value.length > 0) {
            // console.log('222222222222222222222222222222');
            this.nowPortFun(this.allBox["upLoad"].value[0].portId); //初始化选择的端口ID
        }
        // this.initialize(); //初始化画图

        // .then((res: any) => {
        //   console.log("初始化接口关系", res.list);
        //   let list = res.list;
        //   let allBox = this.allBox;
        //   // store.commit('allBoxFun',res.list)
        //   for (let i in list) {
        //     // console.log(list[i]);
        //     for (let x in allBox) {

        //       if (i === x) {
        //            let allBoxVal = this.allBox[x].value || []
        //            let listVal = list[i].value || []
        //         // console.log(list[i], allBox[x]);
        //         if (listVal.length > 0) {
        //           for(let y in listVal) {
        //               allBoxVal.push(listVal[y])
        //           }
        //           console.log(allBoxVal, list[i].value);
        //         //   allBoxVal = list[i].value;
        //         //   this.allBox[x].name = list[i].name;
        //         }
        //       }
        //     }
        //   }
        //   console.log(this.allBox);
        // });
    }
    //   allBox: any = {
    //     upLoad: {
    //       name: "上货口",
    //       value: [
    //         // {
    //         //   name: "人工上货1",
    //         //   portId: "div1",
    //         //   endId: ["div3"]
    //         // },
    //         // { name: "人工上货2", portId: "div2", endId: ["div4"] }
    //       ]
    //     },
    //     stockLine: {
    //       name: "进货线",
    //     //   value: [
    //     //     // { name: "进货线1", portId: "div3" },
    //     //     // { name: "进货线2", portId: "div4" }
    //     //   ]
    //     },
    //     initialSort: {
    //       name: "初分口",
    //     //   value: [
    //     //     // { name: "初分口1", portId: "div5" }
    //     //     // { name: "初分口2", portId: "div6" }
    //     //   ]
    //     },
    //     downLine: {
    //       name: "下货线",
    //     //   value: [
    //     //     // { name: "初分口1", portId: "div7" }
    //     //     // { name: "初分口2", portId: "div8" }
    //     //   ]
    //     },
    //     downLoad: {
    //       name: "下货口",
    //     //   value: [
    //     //     // { name: "初分口1", portId: "div9" }
    //     //     // { name: "初分口2", portId: "div10" }
    //     //   ]
    //     }
    //   };
    dialogVisible = false;
    activeName = "upLoad" as any;
    lineList = [] as any; //记录所有连的端口参数
    oldLineList = [] as any;
    cantDrowList = [
        ["upLoad", "stockLine"],
        ["stockLine", "initialSort"],
        ["initialSort", "downLine"],
        ["downLine", "downLoad"]
    ];
    cantDrow = ["stockLine", "downLine"];
    scrollBoxH = 0 as number;
    scrollBoxW = 0 as number;
    x1 = 0 as number;
    y1 = 0 as number;
    x2 = 0 as number;
    y2 = 0 as number;
    d = "M0,1.5 L0,5 L6,3 z";
    c: any;
    ctx: any;
    portBoxs = [] as any;
    divBox: any;
    first = true;
    drow = true;
    list: any;
    portBox: any;
    startPort = "" as any;
    endPort = "" as any;
    ports: any;
    ports1: any;
    Did = "";
    Dkey = "";
    Dname = "";
    loadingF: any;
    updated() {
        this.portBox = this.$refs.portBox;
        // console.log(this.portBox);
        // console.log(this.ports1, "222222222222222222222222222");
        this.portBoxs = [];

        if (this.drow) {
            this.divBox = this.$refs.divBox as any; //给canvas定义宽高;
            this.c.width = this.divBox.offsetWidth;
            this.c.height = this.divBox.offsetHeight;
            this.getport();
            this.lineListFun({
                lineList: this.lineList,
                allBox: this.allBox,
                t: true
            });
            // console.log(this.drow, "33333333333333333333333");
        }
        this.drow = false;
        if (this.first) {
            this.initialize();
        }

        // console.log(this.lineList, "ooooooooooooooooooooo");
    }
    mounted() {
        this.portBox = this.$refs.portBox; //所有端口dom元素
        // console.log((this as any).$refs.div2[0].parentNode);
        // console.log(this.scrollBoxW,this.scrollBoxH);
        this.c = this.$refs.myCanvas as any;
        this.ctx = this.c.getContext("2d");
        this.divBox = this.$refs.divBox as any; //给canvas定义宽高;
        this.c.width = this.divBox.offsetWidth;
        this.c.height = this.divBox.offsetHeight;
        console.log(this.divBox.offsetWidth, this.divBox.offsetHeight);

        // console.log(this.lineList,'uuuuuuuuuuuuuuuuuuuuuuuuu');
        this.lineListFun({
            lineList: this.lineList,
            allBox: this.allBox,
            t: true
        });
        this.activeSha();
    }
    activeSha() {
        let portBox = this.portBox;
        for (let i in portBox) {
            //给当前点击的端口添加class
            if (portBox[i].childNodes[0].id === this.nowPort) {
                //  console.log(portBox[i].classList,this.nowPort,'1111111111111111111111');
                portBox[i].classList.add("active");
            } else if (
                portBox[i].childNodes[0].id !== this.nowPort &&
                this.nowPort !== ""
            ) {
                portBox[i].classList.remove("active");
            } else if (this.nowPort === "") {
                portBox[0].classList.add("active");
            }
        }
    }
    // get
    handleClick(tab: any, event: any) {
        // console.log(tab, event);
    }
    @Watch("newName")
    getNewName() {
        let allBox = this.allBox;
        for (let i in allBox) {
            // console.log(allBox[i].value,'eeeeeeeeeeeeeeeeeeeeeeee');
            let v = allBox[i].value;
            for (let x in v) {
                // console.log(v[x], "wwwwwwwwwwwwwwwwwwwwwww", this.nowPort);
                if (v[x].portId === this.nowPort) {
                    // console.log(this.newName);
                    v[x].name = this.newName;
                }
            }
        }
    }
    mousedown(e: any, sid: any, key: any) {
        let oe = e || event;
        oe.stopPropagation();
        oe.cancelBubble = true;
        let start = this.getLocation(oe.clientX, oe.clientY); //获取鼠标在canvans中的坐标
        //    console.log(oe.currentTarget);
        let ports = oe.currentTarget;

        this.startPort = this.getXY(ports);
        // console.log(this.startPort);
        console.log("down");
    }
    mouseup(e: any, eid: any, key: any) {
        let oe = e || event;
        oe.stopPropagation();
        let ports = oe.currentTarget;
        let flag = [] as any;
        let startPort = this.startPort;
        let endPort = (this.endPort = this.getXY(ports));
        // console.log(startPort,'eqeeeeeeeeeeeeeeeee');
        let lineList = this.lineList;
        let cantDrow = this.cantDrow;
        let cantDrow2 = endPort.id;
        let cantDrowList = this.cantDrowList;
        // for(let x in cantDrow) {
        // for(let y in lineList) {
        let list = [];
        console.log(startPort);
        if (startPort !== "" && startPort.type === "stockLine") {
            for (let y in lineList) {
                if (lineList[y].ids.stype === "stockLine") {
                    list.push(lineList[y].ids.eid);
                    // console.log(lineList[y].ids.eid,);
                }
            }
            console.log(list.indexOf(cantDrow2));

            console.log(list, "qqqqqqqqqqqqqqqqqqqqqqqqqqqq");
            // return
        } else if (startPort.type === "downLine") {
            for (let y in lineList) {
                if (lineList[y].ids.stype === "downLine") {
                    list.push(lineList[y].ids.eid);
                    // console.log(lineList[y].ids.eid,);
                }
            }
            console.log("888888888888888888");
        }
        if (list.indexOf(cantDrow2) >= 0) {
            flag.push(true);
        }
        // }
        // }

        let cantDrowList2 = [startPort.type, endPort.type];
        let data = this.lineCondition(startPort, endPort); //获取划线的条件
        let IdList = [] as any; //所有已连接和被链接的端口的id数组
        let typeList = [] as any; //所有已连接起始type与id
        let IdList2 = [startPort.id, endPort.id];
        for (let k in lineList) {
            let list = [] as any;

            let line = lineList[k];
            // console.log(line, "eeeeee99999999999999");
            list.push(line.ids.sid);
            list.push(line.ids.eid);
            let lineType = {
                stype: line.ids.stype,
                sid: line.ids.sid
            };
            IdList.push(list);
            typeList.push(lineType);
        }
        for (let a in IdList) {
            // console.log(IdList[a],IdList2);
            flag.push(equals(IdList[a], IdList2)); //判断已连接的id数组是否存在于已记录所有的id链接数组中
            // console.log(IdList[a]);
            // console.log(IdList[a].equals(IdList2));
        }
        let Clist = [];
        for (let q in cantDrowList) {
            //循环可以画线的端口类型数组
            // console.log(cantDrowList[q],cantDrowList2);
            Clist.push(equals(cantDrowList[q], cantDrowList2)); //对比将要画的线的起始与结束的端口类型是否在指定的数组
            //
            // console.log(equals(cantDrowList[q], cantDrowList2));
        }
        console.log(Clist);
        if (Clist.indexOf(true) >= 0) {
            //判断如果大于0 则表示可以画线  小于0 则两端口类型之间不能连线(如:跨越端口类型连接下一个端口类型中的端口)))
            flag.push(false);
        } else {
            flag.push(true);
        }
        if (startPort.type === "upLoad" || startPort.type === "initialSort") {
            for (let i in typeList) {
                if (startPort.id === typeList[i].sid) {
                    // console.log(typeList[i], "333333333333333333333333");
                    flag.push(true);
                }
            }
        }
        if (flag.indexOf(true) < 0 && startPort.id !== endPort.id) {
            //如果将要链接的两个端口的ID组成的数组不存在，则执行画线方法，否则不执行；
            // this.endDrow(p, XY, null, endId);
            this.drawArrow(data);
            this.lineListFun({
                lineList: this.lineList,
                allBox: this.allBox,
                t: true
            });
        } else if (flag.indexOf(true) > 0) {
            console.log("画线条件不正确");
        } else if (startPort.id === endPort.id) {
            console.log("此链接无效");
        } else {
        }
        // console.log(data);
        this.startPort = "";
        console.log("up---");
    }
    deleteLine(e: any) {
        // console.log('qqqqqqqqqqqqqqqqqqqqqqqqqqqqq');
        let D: any;
        let oe = e || event;
        let start = this.getLocation(oe.clientX, oe.clientY); //获取鼠标在canvans中的坐标
        let px = start.x,
            py = start.y,
            lines = this.lineList,
            offset = 5; // 可接受（偏移）范围
        for (let q in lines) {
            let p1X = lines[q].fromX; // 直线起点X
            let p1Y = lines[q].fromY; // 直线起点
            let p2X = lines[q].toX; // 直线终点
            let p2Y = lines[q].toY; // 直线终点
            let flag = 0; // 1 - 点中
            let minX = Math.min(p1X, p2X); // 较小的X轴坐标值
            let maxX = Math.max(p1X, p2X); // 较大的X轴坐标值
            let minY = Math.min(p1Y, p2Y); // 较小的Y轴坐标值
            let maxY = Math.max(p1Y, p2Y); // 较大的Y轴坐标值
            // console.log(minX,maxX,minY,maxY);
            if (p1Y === p2Y) {
                // 水平线
                // console.log( px >= minX,px <= maxX,py >= minY - offset ,py <= maxY + offset);
                if (
                    px >= minX &&
                    px <= maxX &&
                    (py >= minY - offset && py <= maxY + offset)
                ) {
                    console.log("水平直线");
                    D = lines.splice(q, 1); //删除数组中当前点击的线
                    // console.log(lines.splice(q, 1));
                    let list = lines.slice(0);
                    // console.log(list, "11111111111111111111111111111");
                    this.lineList = [];
                    // console.log(list, "wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww");
                    this.drawAllLines(list);
                    this.lineListFun({
                        lineList: D,
                        allBox: this.allBox,
                        t: false
                    });

                    flag = 1;
                    // lines[q].crossPoint = { x: px, y: p1Y }; // 直线上交叉点
                }
            } else if (p1X === p2X) {
                // 垂直线
                if (
                    py >= minY &&
                    py <= maxY &&
                    (px >= minX - offset && px <= maxX + offset)
                ) {
                    console.log("垂直直线");
                    flag = 1;
                    lines[q].crossPoint = { x: p1X, y: py }; // 直线上交叉点
                }
            } else {
                // 斜线 (先判断点是否进入可接受大范围(矩形)，然后再根据直线上的交叉点进行小范围比较)
                if (
                    px >= minX &&
                    px <= maxX &&
                    (py >= minY - offset && py <= maxY + offset)
                ) {
                    //求Y轴坐标
                    //方法1：根据tanθ= y/x = y1/x1, 即y = (y1/x1)*x  (该方法有局限性，垂直线(p2X - p1X)=0，不能用)
                    //let y = ((p2Y - p1Y) / (p2X - p1X)) * (px - p1X);

                    //方法2：先求弧度hudu，根据cosθ=x/r, r=x/cosθ,求得r，再根据sinθ=y/r, y=sinθ*r, 求得y
                    let hudu = Math.atan2(p2Y - p1Y, p2X - p1X); // 直线的弧度(倾斜度)
                    // 用三角函数计出直线上的交叉点
                    let r = (px - p1X) / Math.cos(hudu); // 直角三角形的斜边（或理解成圆的半径）
                    let y = Math.sin(hudu) * r; // Y轴坐标

                    let p = { x: px, y: p1Y + y }; // 直线上的交叉点
                    if (
                        Math.abs(px - p.x) <= offset &&
                        Math.abs(py - p.y) <= offset
                    ) {
                        console.log("斜线");
                        console.log(lines[q]);
                        D = lines.splice(q, 1); //删除数组中当前点击的线
                        let list = lines.slice(0);
                        //    console.log(list,'11111111111111111111111111111');
                        this.lineList = [];
                        this.drawAllLines(list);
                        this.lineListFun({
                            lineList: D,
                            allBox: this.allBox,
                            t: false
                        });
                        flag = 1; // 1 - 点中
                    }
                    // lines[q].crossPoint = p; // 直线上的交叉点
                }
            }
        }
        // console.log(start, "qweqweqweqweqweqweqweqwe");
        // console.log(this.lineList);
    }
    lineCondition(startPort: any, endPort: any) {
        return {
            // 划线条件
            fromX: startPort.x1,
            fromY: startPort.y + (startPort.y1 - startPort.y) / 2,
            toX: endPort.x,
            toY: endPort.y + (endPort.y1 - endPort.y) / 2,
            ids: {
                sid: startPort.id,
                eid: endPort.id,
                stype: startPort.type,
                etype: endPort.type
            }
        };
    }
    getXY(ports: any) {
        // console.log(ports.parentNode, "qqqqqqqqqqqqqqqqqqqqqqqq");
        let portType = ports.parentNode.parentNode.id;
        // console.log(portType);
        let divL = this.getDivLocation(this.divBox, ports);
        let data = {
            x: divL.x,
            y: divL.y,
            x1: divL.x + ports.offsetWidth,
            y1: divL.y + ports.offsetHeight,
            id: ports.id,
            type: portType
        };
        return data;
    }

    getport() {
        // console.log(this.lineList, "++++++++++++++++++++");
        this.oldLineList = this.lineList.slice(0);
        this.lineList = [];
        //获取所有端口
        let lines = this.oldLineList;
        // console.log(lines, "errrrrrrrrrrrrrrrrr");
        this.drawAllLines(lines);
        this.activeSha(); //当前端口的阴影效果

        // console.log(lines);
    }
    initialize() {
        // console.log(this.portBoxs);
        let ports = (this.ports = this.$refs as any);
        // console.log(ports,'eeeeeeeeeeeeqqqqqqqqqqqqqqqqqqqq');
        // let lines = [];
        this.first = false;
        let allBox = this.allBox as any;
        for (let x in allBox) {
            let value = allBox[x].value;
            // console.log(value);
            for (let y in value) {
                if (value[y].endId && value[y].endId.length > 0) {
                    let endId = value[y].endId;
                    // console.log(endId);
                    // console.log(ports[value[y].portId], "4444444444444444");
                    let startPort = this.getXY(ports[value[y].portId][0]);
                    // console.log(startPort);
                    for (let i in endId) {
                        // console.log(endId[i],'4444444444444444444');

                        if (ports[endId[i]]) {
                            let endPort = this.getXY(ports[endId[i]][0]);
                            let data = this.lineCondition(startPort, endPort); //获取划线的条件
                            // lines.push(data)
                            this.drawArrow(data);
                        }

                        // console.log(ports[value[y].endId],'iiiiiiiiiiiiiiiiiiiiiiiiiii');
                    }
                } else {
                }
            }
        }

        console.log("----初始化端口信息----");

        // }
    }
    clearCanvas() {
        // console.log(list, "xxxxxxxxxxxxxxxxxxxxxxxxxx");
        console.log("--------------已清除-------------");
        this.ctx.clearRect(
            0,
            0,
            this.divBox.offsetWidth,
            this.divBox.offsetHeight
        );
    }
    drawAllLines(list: any) {
        this.clearCanvas();

        for (let i in list) {
            this.drawArrow(list[i]);
        }
    }
    /**ctx：Canvas绘图环境
        fromX, fromY：起点坐标（也可以换成p1，只不过它是一个数组）
        toX, toY：终点坐标 (也可以换成p2，只不过它是一个数组)
        theta：三角斜边一直线夹角
        headlen：三角斜边长度
        width：箭头线宽度
        color：箭头颜色
    */
    drawArrow(data: any) {
        // console.log(data, "1111111111111111111");
        let ctx = this.ctx;
        let fromX = data.fromX,
            fromY = data.fromY,
            toX = data.toX,
            toY = data.toY,
            theta = data.theta,
            headlen = data.headlen,
            width = data.width,
            color = data.color;
        let lineList = {
            fromX,
            fromY,
            toX,
            toY,
            ids: {
                sid: data.ids.sid,
                eid: data.ids.eid,
                stype: data.ids.stype,
                etype: data.ids.etype
            }
        };
        theta = typeof theta != "undefined" ? theta : 30;
        headlen = typeof headlen != "undefined" ? headlen : 10;
        width = typeof width != "undefined" ? width : 1;
        color = typeof color != "undefined" ? color : "#ccc";
        // 计算各角度和对应的P2,P3坐标
        let angle = Math.atan2(fromY - toY, fromX - toX) * 180 / Math.PI,
            angle1 = (angle + theta) * Math.PI / 180,
            angle2 = (angle - theta) * Math.PI / 180,
            topX = headlen * Math.cos(angle1),
            topY = headlen * Math.sin(angle1),
            botX = headlen * Math.cos(angle2),
            botY = headlen * Math.sin(angle2);

        ctx.save();
        ctx.beginPath();

        let arrowX = fromX - topX,
            arrowY = fromY - topY;
        ctx.moveTo(arrowX, arrowY);
        ctx.moveTo(fromX, fromY);
        ctx.lineTo(toX, toY);
        arrowX = toX + topX;
        arrowY = toY + topY;
        ctx.moveTo(arrowX, arrowY);
        ctx.lineTo(toX, toY);
        arrowX = toX + botX;
        arrowY = toY + botY;
        ctx.lineTo(arrowX, arrowY);
        ctx.strokeStyle = color;
        ctx.lineWidth = width;
        ctx.stroke();
        ctx.restore();
        // if(this.add) {
        // console.log(lineList, "53333333333333333333333333");
        this.lineList.push(lineList);
        // console.log(this.lineList);
        // }
    }

    getLocation(x: any, y: any) {
        let c = this.c;
        let bbox = c.getBoundingClientRect();
        return {
            x: (x - bbox.left) * (c.width / bbox.width),
            y: (y - bbox.top) * (c.height / bbox.height)

            /*
				 * 此处不用下面两行是为了防止使用CSS和JS改变了canvas的高宽之后是表面积拉大而实际
				 * 显示像素不变而造成的坐标获取不准的情况
				x: (x - bbox.left),
				y: (y - bbox.top)
				*/
        };
    }
    getDivLocation(divBox: any, odiv: any) {
        //获取元素原点坐标
        //点击的div相对于浏览器的left - divBox相对于浏览器的left为被点击div在canvas中的坐标位置
        let left =
            odiv.getBoundingClientRect().left -
            divBox.getBoundingClientRect().left;
        let top =
            odiv.getBoundingClientRect().top -
            divBox.getBoundingClientRect().top;
        return {
            x: left,
            y: top
        };
    }
    clickAdd(key: any) {
        let addData = {} as any;
        let allBox = this.allBox as any;
        // console.log(allBox,'sddddddddddddddddddddd');
        this.first = false;
        this.drow = true;
        // console.log(this.lineList, "rrrrrrrrrrrrrrrrrrrrrr");
        // console.log(key);
        for (let i in allBox) {
            // console.log(allBox[key],key)
            if (key === i) {
                let v = allBox[i].value || [];
                console.log(v, "tttttttttttttttttttttttttt");
                addData.name = "";
                addData.portId = UUID(32, 60);
                addData.endId = [];
                addData.index = v.length;
                // console.log(allBox[Tkey]);
                // console.log(UUID(32, 60));
                v.push(addData);
                this.activeName = key;
                this.nowNameFun("");
                this.nowKeyFun(key);
                this.nowPortFun(addData.portId); //当前选择的端口ID
            }
        }

        console.log(allBox, "444566666666666666666");
        // this.loadingF.close();

        // console.log(allBox,'qqqqqqqqqqqqqqqqqqqqqqqqqqqq');
        // this.oldLineList = this.lineList.slice(0);
    }
    dialog(e: any, id: any, key: any, name: any) {
        this.Did = id;
        this.Dkey = key;
        this.Dname = name;
        this.dialogVisible = true;
    }
    handleClose(done: any) {
        this.$confirm("确认关闭？")
            .then(_ => {
                done();
            })
            .catch(_ => {});
    }

    deletePort() {
        // console.log("2222222222222222222");
        this.dialogVisible = false;
        let id = this.Did;
        let key = this.Dkey;
        let allBox = this.allBox as any;
        // console.log(id, "eewwwwwwwwwwwwwwe3333333333");
        for (let i in allBox) {
            let v = allBox[i].value;
            //   console.log(allBox[i].value);
            for (let x in v) {
                let endId = v[x].endId || [];
                console.log(v);
                let index = endId.indexOf(id);
                // console.log(v[x].endId, id, index);
                if (index >= 0) {
                    endId.splice(index, 1);
                }
                if (key === i) {
                    if (v[x].portId === id) {
                        console.log(x);
                        v.splice(x, 1);
                        this.clearCanvas();
                        this.lineList = [];
                        this.first = true;
                    }
                    //   if()
                }
            }
            //   console.log(v, id);
        }
    }
    clickPort(e: any, key: any, id: any, name: any) {
        let oe = e || event;
        // console.log(oe.currentTarget.children[1].innerText);
        // console.log(key, id);
        this.activeName = key;
        let data = {
            portId: id
        };
        this.nowNameFun(name);
        this.nowKeyFun(key);
        this.nowPortFun(id); //当前选择的端口ID
        this.activeSha(); //当前端口的阴影效果
    }
}
</script>
<style lang="scss" scoped>
.home {
    position: relative;
    height: 100%;
    padding: 0 5px;
    -moz-user-select: none; //阻止文字被选中
    -khtml-user-select: none;
    user-select: none;

    // padding: 0 20px 20px 20px;
    .h3 {
        text-align: left;
        height: 40px;
        line-height: 40px;
    }
    #Box {
        width: 100%;
        height: 90%;
        #portMesg {
            position: relative;
            width: 100%;
            display: inline-block;
        }
        .elRow,
        .elCol {
            height: 100%;
            height: 100%;
        }
        .elRow {
            .elCol0 {
                border: 0.5px solid #ccc;
            }
            .elCol1 {
                min-width: 350px;
                border: 0.5px solid #ccc;
            }
        }
    }
    #myCanvas {
        position: absolute;
        left: 0;
        top: 0;
        z-index: -1;
    }
    #scrollBox {
        // position: absolute;
        width: 100%;
        // max-width: 800px;
        // min-width: 600px;
        height: 100%;
        z-index: 0;
        overflow: hidden;
    }
    #divBox {
        // position: absolute;
        width: 102%;
        height: 103%;
        margin: -12px 0 0 0;
        padding: 12px 0 45px 0;
        overflow: scroll;
        .canvasBox {
            position: relative;
            display: flex;
            padding: 50px 0 20px 0;
            min-width: 800px;
        }

        .Classification {
            height: 100%;
            width: 100%;
            & > h2 {
                width: 80%;
                border-bottom: 1px solid #ccc;
                margin: 0 auto;
                height: 50px;
            }
            .add {
                height: 40px;
                width: 100px;
                border: 1px solid #ccc;
                margin: 30px auto 0;
                cursor: pointer;
            }
        }
        .active {
            -moz-box-shadow: 0px 0px 10px #333333;
            -webkit-box-shadow: 0px 0px 10px #333333;
            box-shadow: 0px 0px 10px #333333;
            transition: all 0.2s;
            -webkit-transition: all 0.2s;
            -moz-transition: all 0.2s;
            z-index: 0;
        }
        .portBox {
            width: 120px;
            margin: 40px auto;
            border-radius: 15px;

            .ports {
                position: relative;
                min-height: 40px;
                border: 1px solid #ccc;
                z-index: 10;
                border-radius: 15px;
                display: flex;
                justify-content: center;
                align-items: Center;
                .nameIn {
                    width: 100px;
                    clear: both;
                    height: auto;
                    max-height: 100%;
                    word-wrap: break-word;
                    word-break: break-all;
                    overflow: hidden;

                    text-align: center;
                }
                cursor: pointer;
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
                    right: 2px;
                    top: 2px;
                }
                .closes:hover {
                    transition: all 0.1s;
                    -webkit-transition: all 0.1s;
                    -moz-transition: all 0.1s;
                    -webkit-transform: scale(1.1);
                    transform: scale(1.1);
                    -moz-transform: scale(1.1);
                }
            }
        }
        .portBox:hover {
            -moz-box-shadow: 0px 0px 10px #333333;
            -webkit-box-shadow: 0px 0px 10px #333333;
            box-shadow: 0px 0px 10px #333333;
            // -webkit-transform:scale(1.02);
            // transform:scale(1.02);
            // -moz-transform:scale(1.02);
            // border: 10px solid #ccc;
            transition: all 0.2s;
            -webkit-transition: all 0.2s;
            -moz-transition: all 0.2s;
            z-index: 0;
        }
    }
    // #div1,
    // #div2 {
    //   position: absolute;
    //   width: 80px;
    //   height: 80px;
    // }
    // #div1 {
    //   left: 200px;
    //   top: 280px;
    //   background: rgba(205, 233, 198, 0.733);
    // }
    // #div2 {
    //   left: 300px;
    //   top: 160px;
    //   background: rgba(87, 68, 71, 0.479);
    // }
}
</style>

