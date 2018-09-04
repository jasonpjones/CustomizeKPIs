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
                "data-kpi-name": kpiDefn.name,
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
            isSelected = $el.hasClass("ck-selected");


        $(".ck-kpi-div").removeClass("ck-selected");
        $(".ck-button").addClass("ck-button-disabled");

        if(!isSelected) {
            $el.addClass("ck-selected");
            this.updateButtonStatus($el)
        }

    },
    updateButtonStatus: function($el) {
        var $activeItems = $(".ck-kpi-div[data-isactive='true']"),
            activeCount = $activeItems.length,
            isActive = $el.attr("data-isactive") === "true";

        $(".ck-button").addClass("ck-button-disabled");
        if(isActive) {
            $("#btn-remove").removeClass("ck-button-disabled");
            if(activeCount > 1) {
                if($activeItems.first().attr('data-kpi-name') !== $el.attr('data-kpi-name')) {
                    $("#btn-move-up").removeClass("ck-button-disabled");
                }
                if($activeItems.last().attr('data-kpi-name') !== $el.attr('data-kpi-name')) {
                    $("#btn-move-down").removeClass("ck-button-disabled");
                }
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

        if($el.hasClass("ck-button-disabled")) {
            return;
        }

        switch (btnId) {
            case "btn-add":
                this.moveKPILeftRight("right");
                break;
            case "btn-remove":
                this.moveKPILeftRight("left");
                break;
            case "btn-move-up":
                this.moveKPIUpDown("up");
                break;
            case "btn-move-down":
                this.moveKPIUpDown("down");
                break;
        }
    },
    moveKPILeftRight: function(dir) {
        var $target = (dir === "right") ? $("#selected-kpis") : $("#available-kpis"),
            $selKPI = $(".ck-kpi-div.ck-selected"),
            newStatus = ($selKPI.attr("data-isactive") ==="true")? "false" : "true";

        $selKPI.attr("data-isactive", newStatus);

        $selKPI.appendTo($target);
        this.updateButtonStatus($selKPI);

    },
    moveKPIUpDown: function(dir) {
        var $selKPI = $(".ck-kpi-div.ck-selected");

        if(dir === "up") {
            $selKPI.prev().insertAfter($selKPI);
        }
        else {
            $selKPI.next().insertBefore($selKPI);
        }
        this.updateButtonStatus($selKPI);


    },


    _setupButtonHandlers: function(){
        $(".ck-button").on("click", this.moveKPI.bind(this));
    }



};