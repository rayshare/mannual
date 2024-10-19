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

    click(element, percentX, percentY) {
        if (!percentX || percentX < 0 || percentX > 1) {
            percentX = 0.5;
        }
        if (!percentY || percentY < 0 || percentY > 1) {
            percentY = 0.5;
        }
        let rec = element.getBoundingClientRect();
        let x = Math.min(rec.left, rec.right) + percentX * rec.width;
        let y = Math.min(rec.top, rec.bottom) + percentY * rec.height;
        const position = document.elementFromPoint(x, y);
        position.click();
    }

}

class FullGesture extends Gesture {

}

class EmptyGesture extends Gesture {

}