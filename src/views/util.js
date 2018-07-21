export const randomInt = (fr: any, to: any) => {
    return Math.round(fr + Math.random() * to)
}

export const generateRGBColors = (count: any) => {
    return Array.apply(null, new Array(count)).map((none, i) => {
        return {
            r: randomInt(0, 255),
            g: randomInt(0, 255),
            b: randomInt(0, 255)
        }
    })
}
/** ctx：Canvas绘图环境
    fromX, fromY：起点坐标（也可以换成p1，只不过它是一个数组）
    toX, toY：终点坐标 (也可以换成p2，只不过它是一个数组)
    theta：三角斜边一直线夹角
    headlen：三角斜边长度
    width：箭头线宽度
    color：箭头颜色
*/
export const drawArrow = (data: any) => {
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


export default {
    randomInt,
    generateRGBColors
}