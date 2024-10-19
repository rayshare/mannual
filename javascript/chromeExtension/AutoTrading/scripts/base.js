/**
 * 查询数据源元素
 * @param document  dom元素
 * @param callback  查询到元素后的回调函数
 */
function queryDatasourceElement(document, callback) {
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

    let query = function () {
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
    query();
    if (el_kindle.prototype.element && el_ma.prototype.element && el_volume.prototype.element) {
        console.log(el_kindle.prototype);
        console.log(el_ma.prototype);
        console.log(el_volume.prototype);
        callback(el_kindle, el_ma, el_volume);
        return;
    }
    const observer = new MutationObserver((e) => {
        query();
        if (el_kindle.prototype.element && el_ma.prototype.element && el_volume.prototype.element) {
            console.log(el_kindle.prototype);
            console.log(el_ma.prototype);
            console.log(el_volume.prototype);
            callback(el_kindle, el_ma, el_volume);
            observer.disconnect();
        }
    });
    observer.observe(document, { childList: true, subtree: true });
}

/**
 * 查询个人仓位信息
 * @param document dom元素
 */
function queryPrivateElement(document, callback) {
    let el_private = function () {
        let itemList = el_private.prototype.items;
        let DATA = [
            parseFloat(itemList[0].textContent), //保证金率
            parseFloat(itemList[1].textContent.replaceAll(/usdt|,/gi, "")), //维持保证金
            parseFloat(itemList[2].textContent.replaceAll(/usdt|,/gi, "")), //币种权益
            parseFloat(itemList[3].textContent.replaceAll(/usdt|,/gi, "")), //浮动收益
            parseFloat(itemList[4].textContent.replaceAll(/usdt|,/gi, "")), //占用
        ];
        return DATA;
    };

    let query = function () {
        let levelContentList = document.querySelectorAll('[class^="index_marginLevelContent"]');
        for (const levelContent of levelContentList) {
            let itemList = levelContent.querySelectorAll('[class^="index_infoItemValue"]');
            if (itemList.length == 5) {
                el_private.prototype.element = levelContent;
                el_private.prototype.items = itemList;
                break;
            }
        }
    }
    query();
    if (el_private.prototype.items) {
        console.log(el_private.prototype);
        callback(el_private);
        return;
    }
    const observer = new MutationObserver((e) => {
        query();
        if (el_private.prototype.items) {
            console.log(el_private.prototype);
            callback(el_private);
            observer.disconnect();
        }
    });
    observer.observe(document, { childList: true, subtree: true });
}