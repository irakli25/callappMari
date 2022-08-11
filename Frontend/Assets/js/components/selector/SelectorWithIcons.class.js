
import Helper from "../../helpers/helper.class.js";
import { kendo_setIndex, kendo__refresh, sendKendoRequest } from "../../helpers/kendo.helper.js";

export default class SelectorWithIcons extends Helper {

	constructor(element, callback) {
		super();

		this.state = {
			dom: [],
			element: element,
			callback: callback
		}
	}

	init = (onchange = "") => {

		this.state.element.data = this.state.element.getAttribute("data");
		this.state.element.value = this.state.element.getAttribute("value");
		this.state.element.title = this.state.element.getAttribute("title");
		this.state.element.for = this.state.element.getAttribute("for");
		this.state.element.customData = this.state.element.getAttribute("custom");
		this.state.element.selectorImg = this.state.element.getAttribute("selectorImg");
		this.state.element.selectedImg = this.state.element.getAttribute("selectedImg");

		typeof onchange == 'function' ? this.state.callback = onchange : "";
		this.build();

	}


	build = () => {

		var thisClass = this;

		if (typeof this.state.element.data != 'undefined') {

			$(this.state.element).kendoDropDownList({
				serverFiltering: true,
				filter: "contains",
				optionLabel: this.state.element.title,
				autoBind: true,
				height: 215,
				template: this.state.element.selectorImg,
				valueTemplate: this.state.element.selectedImg,

				dataSource: new kendo.data.DataSource({
					transport: {
						read: function (options) {
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
				dataBound: (callback) => {

					if (!callback.sender._state) {

						if (this.state.element.value != '') {
							var x = $(this.state.element).data("kendoDropDownList");
							x.value(this.state.element.value);
							x.trigger("change");
						}

					}

					if (typeof this.state.callback == 'function') this.state.callback(callback)

				},
				select: this.state.callback,
				change: this.state.callback
			});
		}

		if (typeof this.state.element.customData != 'undefined' && this.state.element.customData != null) {
			var customData = new Array();
			this.state.element.customData = JSON.parse(this.state.element.customData)
			this.state.element.customData.map((x, i) => {
				i += 1;
				customData.push({ id: (typeof x.id != 'undefined' ? x.id : i.toString()), name: x.name })
			})

			$(this.state.element).kendoDropDownList({
				serverFiltering: false,
				filter: "contains",
				optionLabel: this.state.element.title,
				autoBind: true,
				height: 215,
				dataSource: {
					data: customData
				},
				dataTextField: "name",
				dataValueField: "id",
				change: this.state.callback
			});
		} else {
			$(this.state.element).text("Attribute is undefined")
		}

	}

	setDataSource(obj = {}) {


		$(obj.element).data("kendoDropDownList").setDataSource({
			transport: {
				read: function (options) {
					sendKendoRequest(obj.data, options)
				}
			},
			schema: {
				total: 'total',
				data: data => {

					// SET NULL IF EMPTY RESULT
					if (data.length == 1) {
						kendo_setIndex(obj.element, 1)
						//kendo__refresh(obj.element, "s")
					}

					return data;
				}
			}
		});

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