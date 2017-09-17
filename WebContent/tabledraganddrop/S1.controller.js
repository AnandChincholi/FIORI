sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/m/MessageToast",
	"sap/ui/thirdparty/jqueryui/jquery-ui-core",
	"sap/ui/thirdparty/jqueryui/jquery-ui-widget",
	"sap/ui/thirdparty/jqueryui/jquery-ui-mouse",
	"sap/ui/thirdparty/jqueryui/jquery-ui-sortable",
	"sap/ui/thirdparty/jqueryui/jquery-ui-droppable",
	"sap/ui/thirdparty/jqueryui/jquery-ui-draggable"
])

sap.ui.controller("tabledraganddrop.S1", {

/**
* Called when a controller is instantiated and its View controls (if available) are already created.
* Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
* @memberOf tabledraganddrop.S1
*/
	onInit: function() {
		var that = this;
  
		
		that.dataCreation();
		var obj = {};
		obj.val1 = "10";
		that.dragAndDropFun();

	},

	dataCreation: function() {
		var that = this;
		that.dataA1 = [];

		for (var i = 0; i < 10; i++) {
			var object = {};
			object.EmpName = "Mr. TestABC" + i;
			object.EmpName1 = "Mr. TestXYZ" + i;
			that.dataA1.push(object);
		}
	},

	dragAndDropFun: function() {
		var that = this;
		var oSortableList = that.getView().byId("dragableList");
		var listId1 = oSortableList.getId();
		that.materialModel1 = new sap.ui.model.json.JSONModel();
		that.materialModel1.setData(that.dataA1);
		//	that.materialModel1.setSizeLimit(that.dataA1.length);
		oSortableList.setModel(that.materialModel1, "materials1");
		//that.getView().setModel( materialModel1, "materials1");  

		oSortableList.onAfterRendering = function() {
			that.materialModel1.refresh();
			oSortableList.setModel(that.materialModel1, "materials1");
			if (sap.m.List.prototype.onAfterRendering) {
				sap.m.List.prototype.onAfterRendering.apply(this);
			}
			$(".draggable").draggable({
				helper: "clone"
			});

			$(".draggable").droppable({
				drop: function(event, ui) {
					var listElementId = ui.draggable.context.id;
					var draggedElement = sap.ui.getCore().byId(listElementId);
					//	if (ui.draggable.context.id.indexOf("dropablelist1") != -1) {
					var oPath = draggedElement.getBindingContext("materials1").getPath();
					var split = oPath.split("/");
					var i = split[1];
					//	alert(i);
					var dropedIndex = $(event.target).index();
					//	alert(dropedIndex);

					if (i < dropedIndex) {
						that.dataA1.splice(dropedIndex + 1, 0, that.materialModel1.getData()[i]);
						//that.materialModel1.setData(that.dataA1);
						that.materialModel1.oData.splice(i, 1);
					} else {
						var j = JSON.parse(JSON.stringify(that.materialModel1.getData()[i]));
						that.materialModel1.oData.splice(i, 1);
						that.dataA1.splice(dropedIndex, 0, j);

						//that.materialModel1.setData(that.dataA1);
					}

					that.materialModel1.refresh();
					oSortableList.invalidate();

					//	}
				}

			});
		};
	}

/**
* Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
* (NOT before the first rendering! onInit() is used for that one!).
* @memberOf tabledraganddrop.S1
*/
//	onBeforeRendering: function() {
//
//	},

/**
* Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
* This hook is the same one that SAPUI5 controls get after being rendered.
* @memberOf tabledraganddrop.S1
*/
//	onAfterRendering: function() {
//
//	},

/**
* Called when the Controller is destroyed. Use this one to free resources and finalize activities.
* @memberOf tabledraganddrop.S1
*/
//	onExit: function() {
//
//	}

});