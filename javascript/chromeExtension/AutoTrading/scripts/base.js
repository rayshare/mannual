let el_kindle = function () {
    let children = el_kindle.prototype.element.children;
    let KD = [
        parseFloat(children[2].textContent), //开
        parseFloat(children[4].textContent), //高
        parseFloat(children[6].textContent), //低
        parseFloat(children[8].textContent), //收
        parseFloat(children[10].textContent), //涨跌幅
        parseFloat(children[12].textContent), //振幅
    ];
    return KD;
};
let el_ma = function () {
    let children = el_ma.prototype.element.children;
    let MA = [
        parseFloat(children[1].textContent), //MA5
        parseFloat(children[3].textContent), //MA10
        parseFloat(children[5].textContent), //MA20
        parseFloat(children[7].textContent), //MA120
    ];
    return MA;
};
let el_volume = function () {
    let children = el_volume.prototype.element.children;
    let VOL = [
        parseFloat(children[2].textContent.replaceAll(",", "")), //DOGE
        parseFloat(children[4].textContent.replaceAll(",", "")), //USDT
    ];
    return VOL;
};

let queryDatasourceElement = function () {
    let legendContentList = document.querySelectorAll('[class^="legendContent"]');
    for (const legendContent of legendContentList) {
        let count = legendContent.childElementCount;
        if (count == 13) {
            el_kindle.prototype.element = legendContent;
        } else if (count == 8) {
            el_ma.prototype.element = legendContent;
        } else if (count == 5) {
            el_volume.prototype.element = legendContent;
        }
    }
}

/**
 * 查询数据源元素
 */
async function observeDatasourceElement() {
    return new Promise((resolve, reject) => {
        queryDatasourceElement();
        if (el_kindle.prototype.element && el_ma.prototype.element && el_volume.prototype.element) {
            resolve();
            console.log("observeDatasourceElement success");
            return;
        }
        const observer = new MutationObserver((e) => {
            queryDatasourceElement();
            if (el_kindle.prototype.element && el_ma.prototype.element && el_volume.prototype.element) {
                resolve();
                console.log("observeDatasourceElement success");
                observer.disconnect();
            }
        });
        observer.observe(document, { childList: true, subtree: true });
    });
}

let el_person = function () {
    let itemList = el_person.prototype.items;
    let DATA = [
        parseFloat(itemList[0].textContent), //保证金率
        parseFloat(itemList[1].textContent.replaceAll(/usdt|,/gi, "")), //维持保证金
        parseFloat(itemList[2].textContent.replaceAll(/usdt|,/gi, "")), //币种权益
        parseFloat(itemList[3].textContent.replaceAll(/usdt|,/gi, "")), //浮动收益
        parseFloat(itemList[4].textContent.replaceAll(/usdt|,/gi, "")), //占用
    ];
    return DATA;
};

let querypersonElement = function () {
    let levelContentList = document.querySelectorAll('[class^="index_marginLevelContent"]');
    for (const levelContent of levelContentList) {
        let itemList = levelContent.querySelectorAll('[class^="index_infoItemValue"]');
        if (itemList.length == 5) {
            el_person.prototype.element = levelContent;
            el_person.prototype.items = itemList;
            break;
        }
    }
}

/**
 * 查询个人仓位信息
 */
async function observepersonElement() {
    return new Promise((resolve, reject) => {
        querypersonElement();
        if (el_person.prototype.items) {
            resolve();
            console.log("observepersonElement success");
            return;
        }
        const observer = new MutationObserver((e) => {
            querypersonElement();
            if (el_person.prototype.items) {
                resolve();
                console.log("observepersonElement success");
                observer.disconnect();
            }
        });
        observer.observe(document, { childList: true, subtree: true });
    });
}