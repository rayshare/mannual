function start(callback) {
    let send = chrome.tabs.sendMessage;
    chrome.tabs.query({}, tabs => {
        for (const tab of tabs) {
            send(tab.id, { action: "CONTENT", state: 'on' }, (response) => {
                console.log('Response from content script:', response);
                alert(response);
                callback();
                return true;
            });
        }
    });
}

function stop(callback) {
    let send = chrome.tabs.sendMessage;
    chrome.tabs.query({}, tabs => {
        for (const tab of tabs) {
            send(tab.id, { action: "CONTENT", state: 'off' }, (response) => {
                console.log('Response from content script:', response);
                alert(response);
                callback();
                return true;
            });
        }
    });
}

//加载
window.onload = function () {
    let button = document.getElementById('toggle');
    chrome.storage.local.get(['state', 'href'], function (obj) {
        chrome.tabs.query({ active: true }, ([tab]) => {
            //不能启用
            if (obj.href !== tab.url) {
                button.className = 'disable';
                return;
            }

            //设置初始状态
            if (obj.state !== undefined) {
                button.className = obj.state;
            }

            //设置监听器
            button.onclick = function () {
                let status = button.className;
                if (status === 'on') {
                    button.className = 'disable';
                    stop(() => button.className = 'off');
                } else if (status === 'off') {
                    button.className = 'disable';
                    start(() => button.className = 'on');
                } else if (status === 'disable') {
                    return;
                } else {
                    button.className = 'off';
                }
            };
        });
    });
}


