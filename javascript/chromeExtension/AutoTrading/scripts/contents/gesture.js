/**
 * 监听元素
 * @param phase 阶段
 * @param container 元素或promise或方法
 * @param targetMethod 目标元素获取方法 param: container
 * @param callback 回调函数 param: target
 * @returns promise | callback's promise
 */
async function process(phase, container, targetMethod, callback) {
    let element = container;
    if (Promise.prototype.isPrototypeOf(container)) {
        await container.then(result => element = result);
    } else if (container.nodeType) {
        element = container;
    } else if (typeof container === 'function') {
        element = container();
    } else {
        console.info("Error element: " + phase);
        return;
    }
    if (!element) {
        console.info("Error element: " + phase);
        return;
    }
    let targetElement = targetMethod(element);
    if (targetElement) {
        console.info("Found: " + phase);
        if (callback) {
            let result = callback(targetElement);
            if (Promise.prototype.isPrototypeOf(result)) {
                return result;
            }
        }
        return new Promise((resolve, reject) => {
            resolve(targetElement);
        });
    } else {
        console.info("Not Found: " + phase);
    }
    return new Promise((resolve, reject) => {
        let observer = new MutationObserver((mutationList, observer) => {
            targetElement = targetMethod(element);
            if (targetElement) {
                console.info("Found: " + phase);
                if (callback) {
                    let result = callback(targetElement);
                    if (Promise.prototype.isPrototypeOf(result)) {
                        observer.disconnect();
                        result.then(e => resolve(e));
                        return;
                    }
                }
                observer.disconnect();
                resolve(targetElement);
            } else {
                console.info("Not Found: " + phase);
            }
        });
        observer.observe(element, { childList: true, attributes: true, subtree: true });
    });
}

class Gesture {
    constructor(profitRate, lossRate) {
        if (!profitRate || profitRate <= 0) {
            this.profitRate = 1;
        }
        if (!lossRate || lossRate <= 0 || lossRate >= 100) {
            this.lossRate = -15;
        }
    }
    input(inputElement, newValue) {
        let oldValue = inputElement.value;
        inputElement.value = newValue;
        let event = new Event('input', { bubbles: true });
        let tracker = inputElement._valueTracker;
        if (tracker) {
            tracker.setValue(oldValue);
        }
        inputElement.dispatchEvent(event);
    }
}

class FullGesture extends Gesture {
    apply(final) {
        let inputPanel; //输入面板
        let dialogPanel; //止盈止损对话框
        let optionPanel; //止损选项框
        process("1. 查询输入面板", document, container => container.getElementById("leftPoForm"), target => inputPanel = target)
            .then(el => process("2. 选中数量", inputPanel, container => container.querySelectorAll('span[class^="InputSlider_nodeText"]')[4], target => target.click()))
            .then(el => process("3. 点击止盈止损", inputPanel, container => container.querySelector('input[class="okui-checkbox-input"]'), target => { if (!target.checked) target.click(); }))
            .then(el => process("4. 点击高级", () => el?.parentElement?.parentElement?.parentElement, container => container.querySelector('div[class^="Entry_operatorIcon"]'), target => target.click()))
            .then(el => process("5. 检测止盈止损对话框", document, container => dialogPanel = container.getElementById("scroll-box")))
            .then(el => process("6. 止盈输入", el, container => container.querySelectorAll('div[class="okui-input-box"]')[1]?.querySelector('input[type="text"]'), target => this.input(target, this.profitRate)))
            .then(el => process("7. 选择止损收益率", dialogPanel, container => container.querySelectorAll('div[class="okui-input-box"]')[3]?.querySelector('i'), target => target.click()))
            .then(el => process("8. 检测止损对话框", document, container => optionPanel = container.querySelectorAll("#scroll-box")[1]))
            .then(el => process("9. 点击止损收益率", el, container => {
                let span = container.querySelectorAll('span')[1];
                if (span && span.textContent === '收益率 (%)') {
                    return span;
                } else {
                    return undefined;
                }
            }, target => target.click()))
            .then(el => process("10. 点击确定", optionPanel, container => container.nextElementSibling?.querySelector('button[data-testid="okd-dialog-confirm-btn"]'), target => target.click()))
            .then(el => process("11. 等待设置成功", dialogPanel, container => {
                let span = container.querySelectorAll('div[class="okui-input-box"]')[3]?.querySelector('span[class^="index_textContainer"]');
                if (span && span.textContent === '收益率') {
                    return span;
                } else {
                    return undefined;
                }
            }))
            .then(el => process("12. 止盈输入", dialogPanel, container => container.querySelectorAll('div[class="okui-input-box"]')[3]?.querySelector('input[type="text"]'), target => this.input(target, this.lossRate)))
            .then(el => process("13. 点击确定", dialogPanel, container => container.nextElementSibling?.querySelector('button[data-testid="okd-dialog-confirm-btn"]'), target => target.click()))
            .then(el => process("14. 执行开多", inputPanel, container => container.querySelector('div[class="submit-btn-box"] span'), target => target.click()))
            .then(() => final && final());
    }
}

class EmptyGesture extends Gesture {
    apply(final) {
        let inputPanel; //输入面板
        let dialogPanel; //止盈止损对话框
        let optionPanel; //止损选项框
        process("1. 查询输入面板", document, container => container.getElementById("rightPoForm"), target => inputPanel = target)
            .then(el => process("2. 选中数量", inputPanel, container => container.querySelectorAll('span[class^="InputSlider_nodeText"]')[4], target => target.click()))
            .then(el => process("3. 点击止盈止损", inputPanel, container => container.querySelector('input[class="okui-checkbox-input"]'), target => { if (!target.checked) target.click(); }))
            .then(el => process("4. 点击高级", () => el?.parentElement?.parentElement?.parentElement, container => container.querySelector('div[class^="Entry_operatorIcon"]'), target => target.click()))
            .then(el => process("5. 检测止盈止损对话框", document, container => dialogPanel = container.getElementById("scroll-box")))
            .then(el => process("6. 止盈输入", el, container => container.querySelectorAll('div[class="okui-input-box"]')[1]?.querySelector('input[type="text"]'), target => this.input(target, -this.profitRate)))
            .then(el => process("7. 选择止损收益率", dialogPanel, container => container.querySelectorAll('div[class="okui-input-box"]')[3]?.querySelector('i'), target => target.click()))
            .then(el => process("8. 检测止损对话框", document, container => optionPanel = container.querySelectorAll("#scroll-box")[1]))
            .then(el => process("9. 点击止损收益率", el, container => {
                let span = container.querySelectorAll('span')[1];
                if (span && span.textContent === '收益率 (%)') {
                    return span;
                } else {
                    return undefined;
                }
            }, target => target.click()))
            .then(el => process("10. 点击确定", optionPanel, container => container.nextElementSibling?.querySelector('button[data-testid="okd-dialog-confirm-btn"]'), target => target.click()))
            .then(el => process("11. 等待设置成功", dialogPanel, container => {
                let span = container.querySelectorAll('div[class="okui-input-box"]')[3]?.querySelector('span[class^="index_textContainer"]');
                if (span && span.textContent === '收益率') {
                    return span;
                } else {
                    return undefined;
                }
            }))
            .then(el => process("12. 止盈输入", dialogPanel, container => container.querySelectorAll('div[class="okui-input-box"]')[3]?.querySelector('input[type="text"]'), target => this.input(target, this.lossRate)))
            .then(el => process("13. 点击确定", dialogPanel, container => container.nextElementSibling?.querySelector('button[data-testid="okd-dialog-confirm-btn"]'), target => target.click()))
            .then(el => process("14. 执行开空", inputPanel, container => container.querySelector('div[class="submit-btn-box"] span'), target => target.click()))
            .then(() => final && final());
    }
}

