/**
 * class ProxyWebSocket extends window.WebSocket 代理websocket
 * 使用dom更简单
 */
class Person {
    constructor(el_person) {
        this.listeners = [];
        this.el_person = el_person;
        this.h1 = [];
        this.h2 = [];
        this.h3 = [];
        this.h4 = [];
        this.h5 = [];
    }

    extraObserve() {
        const person_Observe = new MutationObserver((e) => {
            let data = this.el_person();
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
        person_Observe.observe(this.el_person.prototype.element, { childList: true, subtree: true, characterData: true });
        console.log("person listening");
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