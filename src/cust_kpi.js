/* Globals ActInsight*/

var ActInsight = ActInsight || {};

ActInsight.KPICustomizer = function() {
    this.data = new ActInsight.KPICustomizerData();
};

ActInsight.KPICustomizer.prototype = {

    initialize: function() {
        this._setupButtonHandlers();
        return this.data.initialize()
            .then(this.loadAvailableAndSelectedLists.bind(this))
            .then(this.loadFieldPicklist.bind(this));
    },
    loadAvailableAndSelectedLists: function() {
        var $avail = $("#available-kpis"),
            $selected = $("#selected-kpis");

        this.data.KPIDefinition.forEach(function(kpiDefn){
            var $kpiDiv = $("<div>", {
                class: "ck-kpi-div",
                text: kpiDefn.label,
                "data-isactive": kpiDefn.isActive? "true": "false"
            });

            $kpiDiv.on("click", this.handleKPIClick.bind(this));

            if(kpiDefn.isActive) {
                $selected.append($kpiDiv);
            }
            else {
                $avail.append($kpiDiv);
            }
        }.bind(this));
    },
    loadFieldPicklist: function() {
        console.log(this.data.opportunityFields);
    },
    handleKPIClick: function(e) {
        var $el = $(e.target),
            isSelected = $el.hasClass("ck-selected"),
            isActive = $el.attr("data-isactive") === "true";

        $(".ck-kpi-div").removeClass("ck-selected");
        $(".ck-button").addClass("ck-button-disabled");

        if(!isSelected) {
            $el.addClass("ck-selected");
            this.updateButtonStatus(isActive)
        }

    },
    updateButtonStatus: function(isActive) {
        var activeCount = $(".ck-kpi-div[data-isactive='true']").length;

        $(".ck-button").addClass("ck-button-disabled");
        if(isActive) {
            $("#btn-remove").removeClass("ck-button-disabled");
            if(activeCount > 1) {
                $("#btn-move-up").removeClass("ck-button-disabled");
                $("#btn-move-down").removeClass("ck-button-disabled");
            }
        }
        else
        {
            $("#btn-add").removeClass("ck-button-disabled");
        }
    },
    moveKPI: function(e) {
        var $el = $(e.target),
            btnId = $el.attr("id");

        switch (btnId) {
            case "btn-add":
                this.moveKPILeftRight("right");
                break;
            case "btn-remove":
                this.moveKPILeftRight("left");
                break;
        }


    },
    moveKPILeftRight: function(dir) {
        var $target = (dir === "right") ? $("#selected-kpis") : $("#available-kpis"),
            $selKPI = $(".ck-kpi-div.ck-selected"),
            newStatus = ($selKPI.attr("data-isactive") ==="true")? "false" : "true";

        $selKPI.attr("data-isactive", newStatus);

        $selKPI.appendTo($target);
        this.updateButtonStatus(newStatus === "true");

    },
    _setupButtonHandlers: function(){
        $(".ck-button").on("click", this.moveKPI.bind(this));
    }



};