import { objDeepCopy } from "@/assets/js/p.ts";
import * as API from "@/api/axiosMetonds";
import { getProtRel, saveConfig, getDetials, getPortInfo } from "@/api/url";
const config: any = {
    state: {
        allBox: {
            upLoad: {
                name: "上货口",
                  value:[],
            },
            stockLine: {
                name: "进货线",
                  value:[],
            },
            initialSort: {
                name: "初分口",
                  value:[],
            },
            downLine: {
                name: "下货线",
                  value:[],
            },
            downLoad: {
                name: "下货口",
                  value:[],
            }
        }, //初始化各端口信息
        recordPort: [], //记录点击过的端口
        nowPort: "",
        nowKey: "upLoad",
        nowName: "",
        newName: "",
        
    },
    mutations: {
        allBoxFun: (state: any, data: any) => {
            // console.log(data, "eeeeeeeeeeeeeeeeeeeeeeeeeeee");
            let list = data.list;
            let allBox = state.allBox;
            // store.commit('allBoxFun',res.list)
            for (let i in list) {
                for (let x in allBox) {
                    if (i === x) {
                        allBox[x].value = [];
                        let allBoxVal = allBox[x].value;
                        let listVal = list[i].value || [];
                        if (listVal.length > 0) {
                            for (let y in listVal) {
                                allBoxVal.push(listVal[y]);
                                // console.log(allBoxVal,'ppppppppppppppppppppppppppppp');
                            }
                            // console.log(allBoxVal, list[i].value);
                            //   allBoxVal = list[i].value;
                            //   this.allBox[x].name = list[i].name;
                        }
                    }
                }
            }
            state.allBox = objDeepCopy(allBox);
            // console.log(objDeepCopy(allBox));
            // state.allBox = data;
        },
        newNameFun: (state: any, data: any) => {
            //修改的名称
            state.newName = data;
        },
        nowNameFun: (state: any, data: any) => {
            //当前点击名称
            state.nowName = data;
        },
        nowPortFun: (state: any, data: any) => {
            //当前点击端口
            state.nowPort = data;
        },
        nowKeyFun: (state: any, data: any) => {
            //当前点击区域
            state.nowKey = data;
        },
        recordPortFun: (state: any, data: any) => {
            state.recordPort.push(data);
            console.log(state.recordPort, "wwwwwwwwwwwww");
        },
        lineListFun: (state: any, data: any) => {
            // console.log('eeeeeeeeeeeeee');
            let allBox = data.allBox;
            let lineList = data.lineList;
            let t = data.t;
            // console.log(allBox,'ewwwwqqqqqqqqqqqqqqqqq',lineList);

            for (let i in lineList) {
                let type = lineList[i].ids.stype;
                let aVla = allBox[type].value;
                for (let x in aVla) {
                    if (aVla[x].portId === lineList[i].ids.sid) {
                        aVla[x].endId = aVla[x].endId || [];
                        // console.log(aVla[x].endId,lineList[i].ids.eid);
                        let index = aVla[x].endId.indexOf(lineList[i].ids.eid);
                        // console.log(index,'iiiiiiiiiiiiiiiiiiiiiiiii');
                        if (index < 0) {
                            //判断相应endId数组中是否有此端口信息 如没有则判断为新增的被连接端口
                            if (t) {
                                console.log("------添加-----endId");
                                aVla[x].endId.push(lineList[i].ids.eid);
                            }
                        } else {
                            if (t === false) {
                                console.log("------删除-----endId");
                                aVla[x].endId.splice(index, 1);
                            }
                        }
                    }
                }
                // console.log(lineList[i].ids);
            }
            state.allBox = allBox;
            console.log(state.allBox, "7777777777777777777777");
        }
    },
    actions: {
        getProtRelFun: async ({ commit }: any, data: any) => {
            let x = await API.post(getProtRel, data);
            commit("allBoxFun", x);
            //  console.log('wwwwwwwwwwwwwwwwwwwwwwwwwww');
        },
        lineDataFun: async (
            {
                //保存端口关系
                commit
            }: any,
            data: any
        ) => {
            console.log(data);
            return await API.post(saveConfig, data);
        },
        getPortInfoFun: async (
            {
                //获取端口信息
                commit
            }: any,
            data: any
        ) => {
            // console.log(data);
            return await API.post(getPortInfo, data);
        }
    }
};
export default config;
