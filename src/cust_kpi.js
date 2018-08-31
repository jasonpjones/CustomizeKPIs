/* Globals ActInsight*/

var ActInsight = ActInsight || {};

ActInsight.KPICustomizer = function() {
    this.data = new ActInsight.KPICustomizerData();
};

ActInsight.KPICustomizer.prototype = {

    initialize: function() {
        return this.data.initialize()
            .then(this.loadAvailableAndSelectedLists.bind(this))
            .then(this.loadFieldPicklist.bind(this));
    },
    loadAvailableAndSelectedLists: function() {
        console.log(this.data.KPIDefinition);
    },
    loadFieldPicklist: function() {
        console.log(this.data.opportunityFields);
    }


};