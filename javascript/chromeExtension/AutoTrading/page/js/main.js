function start(callback) {
    chrome.runtime.sendMessage({ action: 'sendToContent', state: 'on' }, (response) => {
        console.log('Response from content script:', response);
        if (response) {
            callback();
        }
    });
}

function stop(callback) {
    chrome.runtime.sendMessage({ action: 'sendToContent', state: 'off' }, (response) => {
        console.log('Response from content script:', response);
        if (response) {
            callback();
        }
    });
}

window.onload = function () {
    let button = document.getElementById('toggle');
    chrome.storage.local.get(['state'], function (state) {
        button.className = state;
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
}


