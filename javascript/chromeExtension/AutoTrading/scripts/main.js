(function () {
    let document = this.document;
    queryDatasourceElement(document, (el_KD, el_MA, el_VOL) => {
        let datasource = new DataSource(el_KD, el_MA, el_VOL);
        this.datasource = datasource;
        datasource.addListener({
            kd: function (KD) {
                //console.log(KD);
            },
            ma: function (MA) {
                // console.log(MA);
            },
            vol: function (VOL) {
                // console.log(VOL);
            },
        });
    });

    queryPrivateElement(document, el_private => {
        let private = new Private(el_private);
        this.private = private;
        private.addListener({
            data: function (data) {
                // console.log(data);
            }
        });
    });

    this.g = new Gesture();
})();

