//只在main中定义全局变量
let isInited = false;
let isStarted = false;
let datasource;
let person;
let strategy;

//初始化
function init(callback) {
    if (isStarted) {
        if (callback) {
            callback();
        }
        return;
    }
    Promise.all([observeDatasourceElement(), observepersonElement()]).then(() => {
        isInited = true;
        datasource = new DataSource(el_kindle, el_ma, el_volume);
        person = new Person(el_person);
        strategy = new Strategy(datasource, person);
        if (callback) {
            callback();
        }
    });
}

//开启
function start() {
    if (!isInited) {
        init(start);
        return;
    }
    if (isStarted) {
        return;
    }
    strategy.apply(el_kindle());
    datasource.addListener({
        kd: function (_kd) {
            strategy.apply(_kd);
        }
    });
    isStarted = true;
}

//关闭
function stop() {
    if (!isInited) {
        init();
        return;
    }
    if (!isStarted) {
        return;
    }
    datasource.removeAll();
    isStarted = false;
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === 'popupMessage') {
        console.log('Message from popup:', message.data);

        // 响应 popup 消息
        sendResponse(true);
    }
});




