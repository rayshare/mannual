/**
 * 数据源
 */
class DataSource {
    constructor(el_kindle, el_ma, el_volume) {
        this.listeners = [];
        const KD_Observe = new MutationObserver((e) => {
            let data = el_kindle();
            for (let listener of this.listeners) {
                listener.kd(data);
            }
        });
        KD_Observe.observe(el_kindle.prototype.element, { childList: true, subtree: true, characterData: true });
        console.log("kd listening");

        const MA_Observe = new MutationObserver((e) => {
            let data = el_ma();
            for (let listener of this.listeners) {
                listener.ma(data);
            }
        });
        MA_Observe.observe(el_ma.prototype.element, { childList: true, subtree: true, characterData: true });
        console.log("ma listening");

        const VOL_Observe = new MutationObserver((e) => {
            let data = el_volume();
            for (let listener of this.listeners) {
                listener.vol(data);
            }
        });
        VOL_Observe.observe(el_volume.prototype.element, { childList: true, subtree: true, characterData: true });
        console.log("vol listening");
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