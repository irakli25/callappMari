
import Helper from "../../helpers/helper.class.js";
import {sendKendoRequest} from "../../helpers/kendo.helper.js";

export default class Selector extends Helper{

    constructor(element){
        super();

        this.state = {
			dom: [],
			element: element,
		}
        console.log("sd")
    }

    init = () => {

		this.state.element.data 	= this.state.element.getAttribute("data");
		this.state.element.value 	= this.state.element.getAttribute("value");
		this.state.element.title 	= this.state.element.getAttribute("title");
		this.state.element.for 		= this.state.element.getAttribute("for");

		this.build();

    }


    build = () => {

		var thisClass = this;

		$(this.state.element).kendoDropDownList({
			serverFiltering: true,
			filter: "contains",
			optionLabel: this.state.title,
			autoBind: true,
			height: 290,
			dataSource: new kendo.data.DataSource({
				transport: {
					read: function(options){
						sendKendoRequest(thisClass.state.element.data, options)
					}
				},
				schema: {
					total: 'total',
					data: function (data) {

						// ცარიელი მონაცემის გამორიცხვა, რათა არ მოახდინოს დაჭრა (slice)
						if (data == null) {
							data = [];
							return data
						}

						return data;
					}
				},
			}),
			dataTextField: "name",
			dataValueField: "id",
			dataBound: function (e) {
				if (!e.sender._state) {

					$(e.sender.element[0]).attr('isLoaded', true)

					if (thisClass.state.element.value != '') {
						var x = $(e.sender.element[0]).data("kendoDropDownList");
						x.value(thisClass.state.element.value);
						x.trigger("change");
					}
					if (typeof (callback) === 'function') {
						callback(e)
					}

				}
			},
			select: (c) => {
				if (typeof (callback) === 'function') {
					callback('', c);
				}
			},
			change: (e) => {

				if (this.state.element.for != undefined) {
					let id = thisClass.kendo_SelectedID(e.sender.element[0]); 

					let forTitle = $(this.state.element.for).attr("title");
					let forSelecttitle = $(this.state.element.for).data("select-title");

					// $(this.state.element.for).kendoDropDownList({
					// 	optionLabel: forTitle,
					// 	serverFiltering: true,
					// 	filter: "contains",
					// 	autoBind: true,
					// 	height: 290,
					// 	dataSource: new kendo.data.DataSource({
					// 		transport: {
					// 			read: {
					// 				url: forURL + "?act=" + forAction,
					// 				dataType: "json"
					// 			}
					// 		},
					// 		schema: {
					// 			total: 'total',
					// 			data: data => {
					// 				data = data.result;
					// 				if (data == null) {
					// 					$("#" + forElem).kendoDropDownList({
					// 						dataSource: [],
					// 						optionLabel: forTitle,
					// 						height: 290,
					// 						autoBind: true,
					// 						noRecords: true,
					// 						dataTextField: "name",
					// 						dataValueField: "id",
					// 						noDataTemplate: forSelecttitle
					// 					});

					// 					data = [];
					// 					return data
					// 				}
					// 				return data;
					// 			}
					// 		},
					// 	}),
					// 	select: (c) => {
					// 		if (typeof (callback) === 'function') {
					// 			callback('', c);
					// 		}
					// 	},
					// 	change: (e) => {
					// 		if (typeof (callback) === 'function') {
					// 			callback(e);
					// 		}
					// 	},
					// 	dataTextField: "name",
					// 	dataValueField: "id"
					// });
				}
			}
		});

				// if (this.customData) {
				// 	var customData = new Array();
				// 	this.customData.map((x, i) => {
				// 		i += 1
				// 		customData.push({ id: i.toString(), name: x })
				// 	})
				// 	$("#" + this.id).kendoDropDownList({
				// 		serverFiltering: false,
				// 		filter: "contains",
				// 		optionLabel: title,
				// 		autoBind: true,
				// 		height: 290,
				// 		dataSource: {
				// 			data: customData
				// 		},
				// 		dataTextField: "name",
				// 		dataValueField: "id",
				// 		dataBound: function (e) {
				// 			if (!e.sender._state) {

				// 				$("#" + e.sender.element[0].id).attr('isLoaded', true)

				// 				if (SelectedValue != '') {
				// 					var x = $("#" + e.sender.element[0].id).data("kendoDropDownList");
				// 					x.value(SelectedValue);
				// 					x.trigger("change");
				// 				}
				// 				if (typeof (callback) === 'function') {
				// 					callback(e)
				// 				}

				// 			}
				// 		},
				// 		select: (c) => {
				// 			if (typeof (callback) === 'function') {
				// 				callback('', c);
				// 			}
				// 		}
				// 	});
				// } else {
				// 	$('#' + this.id).text("Attribute is undefined")
				// }

    }

	setDataSource(obj = {}) {


		if (obj.id != '' && obj.url != '' && obj.action != '') {
			$("#" + obj.id).data("kendoDropDownList").setDataSource({
				transport: {
					read: {
						url: obj.url + "?act=" + obj.action,
						dataType: "json"
					}
				},
				schema: {
					total: 'total',
					data: data => {
						data = data.result;

						// SET NULL IF EMPTY RESULT
						if (data == null) {
							$("#" + forElem).kendoDropDownList({
								dataSource: [],
								optionLabel: forTitle,
								height: 290,
								autoBind: true,
								noRecords: true,
								dataTextField: "name",
								dataValueField: "id",
								noDataTemplate: forSelecttitle
							});
							data = [];
							return data
						}

						return data;
					}
				}
			});
		}

		// if(obj.selectBy == 'index'){
		// 	kendo_setIndex(obj.id, obj.value);
		// }else if(obj.selectBy == "value"){
		// 	kendo_setValue(obj.id, obj.value);
		// }else if(obj.selectBy == "text"){
		// 	kendo_setText(obj.id, obj.value);
		// }

	}


	kendoDropDownListCustom(data, input_ID, title, icons = true) {
		var options = [];

		$.each(data, function (i) {
			options.push({ id: this.id, name: this.name });
		});

		$("#" + input_ID).kendoDropDownList({
			dataSource: options,
			dataTextField: "name",
			dataValueField: "id",
			optionLabel: {
				name: title,
				id: ""
			},
			optionLabelTemplate: ""
		});

		if (icons) {
			$.each(data, function (i) {
				$("#" + input_ID + "_listbox li:eq(" + i + ")").html("<span style=\"display: flex; padding: 0px; opacity: 1; z-index: 1; border-radius: 50%; justify-content: center; position: relative; align-items: center; width: 17px; height: 17px; background-color: " + this.color + "; cursor: pointer;margin-right:5px;\"><img src=\"" + this.image_url + "\" style=\"width: 12px;\"></span>" + $("#" + input_ID + "_listbox li:eq(" + i + ")").html());
			});
		}
	}
}