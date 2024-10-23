(function () {
    Promise.all([observeDatasourceElement(), observepersonElement()]).then(() => {
        let datasource = new DataSource(el_kindle, el_ma, el_volume);
        let person = new Person(el_person);
        let strategy = new Strategy(datasource, person);
        strategy.apply(el_kindle());
        datasource.addListener({
            kd: function(_kd) {
                strategy.apply(_kd);
            }
        });
    });
})();

