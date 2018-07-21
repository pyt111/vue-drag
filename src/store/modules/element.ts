import * as API from "@/api/axiosMetonds";
import { validate } from "@/assets/js/p.ts";
// import { getProtRel, saveConfig, getDetials, getPortInfo } from "@/api/url";
const config: any = {
    state: {
        rules: {
            portName: [{ validator: validate, trigger: "blur" }],
            effectiveTo: [{ validator: validate, trigger: "blur" }],
            flowThd: [{ validator: validate, trigger: "blur" }],
            downloadFlag: [
                { required: true, message: "请选择是否即卸", trigger: "change" }
            ],
            uploadFlag: [
                { required: true, message: "请选择是否即装", trigger: "change" }
            ],
            flowWarnCount: [{ validator: validate, trigger: "blur" }],
            transportThd: [{ validator: validate, trigger: "blur" }],
            outlendCount: [{ validator: validate, trigger: "blur" }],
            outcontractCount: [{ validator: validate, trigger: "blur" }],
            routeJsonArray: [{ validator: validate, trigger: "blur" }]
        },
        data: {} as any,
        pickerOptions0: {
            disabledDate(time: any) {
                return time.getTime() < Date.now() - 8.64e7;
            }
        },
        loading: {
            lock: true,
            text: "Loading",
            spinner: "el-icon-loading",
            background: "rgba(0, 0, 0, 0.1)",
            customClass:'loadIng'
        }
    },
    mutations: {
        dataFun: (state: any, data: any) => {
            state.data = data;
        },
        loadingFun: (state: any, data: any) => {
            //修改的名称
            console.log(data, "sssssssssssssssssssssssssssssss");
            state.loading.lock = data;
            console.log(state.loading);
        }
    },
    actions: {
        // getProtRelFun: async ({ commit }: any, data:any) => {
        //     return await API.post(getProtRel, data);
        // },
    }
};
export default config;
