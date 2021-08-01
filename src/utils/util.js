export const changeValue = function (num) {
    let res = 0;
    if (num >= 100000000) {
        let c = num / 100000000;
        return c.toFixed(2) + "亿";
    } else if (num >= 10000) {
        let c = num / 10000;
        return c.toFixed(2) + "万";
    }
};