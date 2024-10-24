class Strategy {
    constructor(datasource, person) {
        this.datasource = datasource;
        this.person = person;
        this.full = new FullGesture();
        this.empty = new EmptyGesture();
        this.locked = false;
    }

    lock() {
        this.locked = true;
    }

    unlock() {
        this.locked = false;
    }

    apply(_kd) { //高 开 低 收 涨跌幅 振幅
        let _ma = this.datasource.el_ma(); //ma5 ma10 ma20 ma120
        let _person = this.person.el_person(); //保证金率 维持保证金 币种权益 浮动收益 占用
        let isRunning = _person[0];
        let assets = _person[2];

        if (isRunning || assets < 0.1) {
            return;
        }

        let sub = _kd[3] - _ma[0]; //收 - ma5
        let abs = Math.abs(sub);
        let threshold = abs / _kd[3];

        let expectProfitRate = 0.25; //期望收益率
        let multiply = 50; //放大倍数
        let scale = 0.6; //比例
        let testThreshold = expectProfitRate * scale / multiply; //检测阈值

        if (threshold >= testThreshold) {
            if (sub > 0 && !this.locked) {
                this.lock();
                this.empty.apply(this.unlock);
                console.log("开空: " + threshold);
            } else {
                this.lock();
                this.full.apply(this.unlock);
                console.log("开多: " + threshold);
            }
        }
    }
}
