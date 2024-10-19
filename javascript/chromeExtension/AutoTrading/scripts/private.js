/**
 * class ProxyWebSocket extends window.WebSocket 代理websocket
 * 使用dom更简单
 */
class Private {
    constructor(el_private) {
        this.listeners = [];
        this.h1 = [];
        this.h2 = [];
        this.h3 = [];
        this.h4 = [];
        this.h5 = [];

        const private_Observe = new MutationObserver((e) => {
            let data = el_private();
            let maxLength = 100;
            this.push(this.h1, data[0], maxLength);
            this.push(this.h2, data[1], maxLength);
            this.push(this.h3, data[2], maxLength);
            this.push(this.h4, data[3], maxLength);
            this.push(this.h5, data[4], maxLength);
            for (let listener of this.listeners) {
                listener.data(data);
            }
        });
        private_Observe.observe(el_private.prototype.element, { childList: true, subtree: true, characterData: true });
        console.log("private listening");
    }

    push(arr, value, maxLength) {
        let len = arr.length;
        let last = arr[len - 1];
        if (last !== value) {
            arr.push(value);
            if (len + 1 > maxLength) {
                let removeLen = len + 1 - maxLength;
                arr.splice(0, removeLen);
            }
        }
    }

    addListener(listener) {
        return this.listeners.push(listener) - 1;
    }

    removeListener(index) {
        this.listeners.splice(index, 1);
    }

    removeAll() {
        this.listeners = [];
    }
}