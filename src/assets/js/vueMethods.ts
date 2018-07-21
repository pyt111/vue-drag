(Date.prototype as any).Format = function(fmt: any) {
    //author: meizz
    let o: any = {
        "M+": this.getMonth() + 1, //月份
        "d+": this.getDate(), //日
        "h+": this.getHours(), //小时
        "m+": this.getMinutes(), //分
        "s+": this.getSeconds(), //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        S: this.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt))
        fmt = fmt.replace(
            RegExp.$1,
            (this.getFullYear() + "").substr(4 - RegExp.$1.length)
        );
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt))
            fmt = fmt.replace(
                RegExp.$1,
                RegExp.$1.length == 1
                    ? o[k]
                    : ("00" + o[k]).substr(("" + o[k]).length)
            );
    return fmt;
};
export default {
    install: (Vue: any, opt: any) => {
        (Vue.prototype.getTime = (date: any) => {
            console.log(date, "wwwwwwwwwwwwwwwwwwwww");
            let data;
            if (date == "" || date == "undefined" || date == null) {
                data = "loading...";
            } else {
                //	console.log(data)
                date = date.replace(/-/g, "/"); //iphone手机需要将'-' 转换为 '/' 防止出现NAN
                data = new Date(date).getTime();
            }
            console.log(data);
            return data;
        }),
            (Vue.prototype.time1 = (date: any, fomat: any) => {
                // console.log(date);
                let data;
                if (date == "" || date == "undefined" || date == null) {
                    data = "";
                } else {
                    //	console.log(data)
                    data = (new Date(date) as any).Format(
                        fomat || "yyyy-MM-dd"
                    );
                }
                // console.log(data);
                return data;
            }),
            (Vue.prototype.objDeepCopy = (source: any) => {
                //对象深度复制
                // console.log(Vue.prototype.objDeepCopy,'888888888888888888888888888888');
                var sourceCopy = source instanceof Array ? [] : {} as any;
                for (var item in source) {
                    sourceCopy[item] =
                        typeof source[item] === "object"
                            ? Vue.prototype.objDeepCopy(source[item])
                            : source[item];
                }
                return sourceCopy;
            });
    }
};
