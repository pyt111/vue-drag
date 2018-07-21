export const equals = (a: any, array: any) => {
    // if the other array is a falsy value, return
    // console.log(a);
    if (!array) {
        return false;
    }

    // compare lengths - can save a lot of time
    if (a.length !== array.length) {
        // console.log(a.length, array.length);
        return false;
    }

    for (var i = 0, l = a.length; i < l; i++) {
        // Check if we have nested arrays
        if (a[i] instanceof Array && array[i] instanceof Array) {
            // recurse into the nested arrays
            if (!a[i].equals(array[i])) {
                return false;
            }
        } else if (a[i] != array[i]) {
            // Warning - two different object instances will never be equal: {x:20} != {x:20}
            return false;
        }
    }
    return true;
};
// Hide method from for-in loops
Object.defineProperty(Array.prototype, "equals", { enumerable: false });

// let r1 = /^\+?[1-9][0-9]*$/ as any; //正整数
const r1 = /^\d+$/; // 非负整数
export const validate = (rule: any, value: any, callback: any) => {
    console.log(rule, value);

    if (rule.field === "portName") {
        if (value === "") {
            callback(new Error("请输入端口名称"));
        } else {
            callback();
        }
    } else if (rule.field === "effectiveTo") {
        if (value === "" || value === null) {
            callback(new Error("请选择日期"));
        } else {
            callback();
        }
    } else if (rule.field === "flowThd") {
        console.log(value);
        let flag = r1.test(value);
        if (value === "") {
            callback(new Error("请输入流量阈值"));
        } else if (!r1.test(value)) {
            callback(new Error("请输入正整数"));
        } else {
            callback();
        }
    } else if (rule.field === "flowWarnCount") {
        // console.log(value);
        if (value === "") {
            callback(new Error("请输入流量阈值"));
        } else if (!r1.test(value)) {
            callback(new Error("请输入正整数"));
        } else {
            callback();
        }
    } else if (rule.field === "transportThd") {
        // console.log(value);
        if (value === "") {
            callback(new Error("请输入货量阈值"));
        } else {
            callback();
        }
    } else if (rule.field === "outcontractCount") {
        if (value === "") {
            callback(new Error("请输入外包人数"));
        } else if (!r1.test(value)) {
            callback(new Error("请输入正整数"));
        } else {
            callback();
        }
    } else if (rule.field === "outlendCount") {
        if (value === "") {
            callback(new Error("请输入外请人数"));
        } else if (!r1.test(value)) {
            callback(new Error("请输入正整数"));
        } else {
            callback();
        }
    } else if (rule.field === "routeJsonArray") {
        let f = [];
        for (let i in value) {
            if (value[i].option.length === 0 || value[i].option === undefined) {
                f.push(false);
            } else if (value[i].option.length > 0) {
                f.push(true);
            }
        }
        let index = f.indexOf(true);
        if (index < 0) {
            callback(new Error("请选择对应路线"));
        } else {
            callback();
        }
    }
};

export const objDeepCopy = (source: any) => {
    //对象深度复制
    // console.log(Vue.prototype.objDeepCopy,'888888888888888888888888888888');
    var sourceCopy = source instanceof Array ? [] : ({} as any);
    for (var item in source) {
        sourceCopy[item] =
            typeof source[item] === "object"
                ? objDeepCopy(source[item])
                : source[item];
    }
    return sourceCopy;
};
// (Object.prototype as any).clone = function(this:any){
//     var obj = {} as any;
//     for(var i in this) {
//         obj[i] = this[i];
//     }

//     return obj;
// };

// (Array.prototype as any).clone = function(this:any) {
//     var len = this.lenght as any,
//         arr = [];
//     for(var i = 0;i < len;i++) {
//         if(typeof this[i] !== "object") {
//             arr.push(this[i]);
//         } else {
//             arr.push(this[i].clone());
//         }
//     }
//     return arr;
// };
