function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));;
}

class Gesture {
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

    click(element) {
        element.click();
    }

}

const SLEEP_SHORT = 200;
let flag = true;

function pause(msg) {
    console.error(msg);
    alert(msg);
    flag = false;
}

class FullGesture extends Gesture {
    constructor(profitRate, lossRate) {
        super();
        if (!profitRate || profitRate <= 0) {
            this.profitRate = 1;
        }
        if (!lossRate || lossRate <= 0 || lossRate >= 100) {
            this.lossRate = -90;
        }
    }
    async apply() {
        if (!flag) {
            pause("Pause");
            return;
        }
        //Step 1 ======================================================================
        let sliderList = document.querySelectorAll('[class^="InputSlider_nodeText"]');
        if (sliderList.length != 10) {
            pause("FullGesture: Step 1");
            return;
        }
        let el_slider = sliderList[4];
        this.click(el_slider);
        //Step 1 end ==================================================================

        //Step 2 ======================================================================
        let checkBoxList = document.querySelectorAll('[class="okui-checkbox-input"]');
        if (checkBoxList.length != 3) {
            pause("FullGesture: Step 2");
            return;
        }
        let el_checkbox = checkBoxList[1];
        if (!el_checkbox.checked) {
            this.click(el_checkbox);
            await sleep(SLEEP_SHORT);
        }
        //Step 2 end ==================================================================

        //Step 3 ======================================================================
        let advanceList = document.querySelectorAll('[class^="Entry_operatorIcon"]');
        if (advanceList.length < 1) {
            pause("FullGesture: Step 3");
            return;
        }
        let el_advance = advanceList[0];
        if (el_advance.textContent !== '高级') {
            pause("FullGesture: Step 3.1");
            return;
        }
        this.click(el_advance);
        await sleep(SLEEP_SHORT);
        //Step 3 end ==================================================================

        //Step 4 ======================================================================
        let optionList = document.querySelectorAll('#scroll-box [class^="index_textContainer"]');
        if (optionList.length != 3) {
            pause("FullGesture: Step 4");
            return;
        }
        let el_option = optionList[2];
        if (el_option.textContent !== '收益率') {
            this.click(el_option);
            await sleep(SLEEP_SHORT);
            let itemList = document.querySelectorAll('[class^="index_itemContainer"]');
            if (itemList.length != 3) {
                pause("FullGesture: Step 4.1");
                return;
            }
            let el_item = itemList[1];
            if (el_item.querySelectorAll("div span")[0]?.textContent !== '收益率 (%)') {
                pause("FullGesture: Step 4.2");
                return;
            }
            this.click(el_item);
            await sleep(SLEEP_SHORT);
            let confirmList = document.querySelectorAll('[class="okui-btn btn-sm btn-fill-highlight dialog-btn double-btn"]');
            if (confirmList.length != 2) {
                pause("FullGesture: Step 4.3");
                return;
            }
            let el_confirm = confirmList[1];
            this.click(el_confirm);
            await sleep(SLEEP_SHORT);
        }
        //Step 4 end ==================================================================

        //Step 5 ======================================================================
        let inputList = document.querySelectorAll('[class^="okui-input-input index_input"]');
        if (inputList.length != 4) {
            pause("FullGesture: Step 5");
            return;
        }
        let el_profit = inputList[1];
        let el_loss = inputList[3];
        this.input(el_profit, this.profitRate);
        this.input(el_loss, this.lossRate);
        await sleep(SLEEP_SHORT);
        //Step 5 end ==================================================================

        //Step 6 ======================================================================
        let confirmList = document.querySelectorAll('[class="okui-btn btn-sm btn-fill-highlight dialog-btn double-btn"]');
        if (confirmList.length != 1) {
            pause("FullGesture: Step 6");
            return;
        }
        let el_confirm = confirmList[0];
        this.click(el_confirm);
        //Step 6 end ==================================================================
    }
}

class EmptyGesture extends Gesture {

}

