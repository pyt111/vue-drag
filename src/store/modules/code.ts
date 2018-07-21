import * as API from "@/api/axiosMetonds";
import { getProtRel, saveConfig, getDetials, getPortInfo } from "@/api/url";
const config: any = {
    state: {
        pickingLineId:'',
    },
    mutations: {
        recordPortFun: (state: any, data: any) => {
            state.recordPort.push(data);
            // console.log(state.recordPort, "wwwwwwwwwwwww");
        },
        getPickingLineId:(state: any, data: any) => {
            state.pickingLineId = data
            console.log(state.pickingLineId, "-------pickingLineId----------");
        },
    },
    actions: {
        // getProtRelFun: async ({ commit }: any, data:any) => {
        //     return await API.post(getProtRel, data);
        // },
    }
};
export default config;
