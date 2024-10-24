// 监听 popup 的消息
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === 'sendToContent') {

        // 需要返回 true，表示响应是异步的
        return true;
    }
});
