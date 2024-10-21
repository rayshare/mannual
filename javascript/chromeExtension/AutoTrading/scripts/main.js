(function () {
    let document = this.document;
    let C_KD = [];
    let C_MA = [];
    let C_VOL = [];
    let DATA0 = NaN;
    queryDatasourceElement(document, (el_KD, el_MA, el_VOL) => {
        let datasource = new DataSource(el_KD, el_MA, el_VOL);
        this.datasource = datasource;
        datasource.addListener({
            kd: function (KD) {
                C_KD = KD;
                
            },
            ma: function (MA) {
                C_MA = MA;
            },
            vol: function (VOL) {
                C_VOL = VOL;
            },
        });
    });

    queryPrivateElement(document, el_private => {
        let private = new Private(el_private);
        this.private = private;
        private.addListener({
            data: function (data) {
                DATA0 = data[0];
            }
        });
    });

    this.g = new FullGesture();
})();

