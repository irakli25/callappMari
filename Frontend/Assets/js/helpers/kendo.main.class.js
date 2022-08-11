class kendoSelector {

	MultiSelector(callback) {

		this.typeName = $("kendo[type='multiselector']");
		const kendoType = this.typeName;

		for (let i = 0; i < kendoType.length; i++) {

			this.id = $(kendoType[i])[0].id;
			this.url = $("#" + this.id).attr("url");
			this.action = $("#" + this.id).attr("action");
			this.title = $("#" + this.id).attr("title");
			this.height = $("#" + this.id).attr("height");

			if (!this.height || this.height == '') {
				this.height = 200;
			}

			$("#" + this.id).kendoMultiSelect({

				placeholder: this.title,
				dataTextField: "name",
				dataValueField: "id",
				headerTemplate: '<div class="dropdown-header k-widget k-header">' +
					'<span></span>' +
					'<span></span>' +
					'</div>',
				footerTemplate: '',
				itemTemplate: '<span class="k-state-default" style="font-size: 13px">#: data.name #</span>',
				tagTemplate: '<span>#:data.name#</span>',
				dataSource: new kendo.data.DataSource({
					transport: {
						read: {
							dataType: "json",
							url: this.url + "?act=" + this.action,
						}
					},
					schema: {
						data: (res) => {
							res = res.result;
							if (typeof (callback) === 'function') {
								callback(res);
							}

							if (res == null) {
								res = [];
								return res
							}
							return res;
						}
					}
				}),
				height: this.height
			});

		}
	}

	kendoSelector(callback) {


		this.typeName = $("kendo[type='selector']");
		const kendoType = this.typeName;

		for (let i = 0; i < kendoType.length; i++) {

			this.id = $(kendoType[i])[0].id;
			this.url = $("#" + this.id).attr("url");
			this.action = $("#" + this.id).attr("action");
			this.customData = $("#" + this.id).data("data");
			const SelectedValue = $("#" + this.id).attr("value");
			const title = $("#" + this.id).attr("title");
			const forElem = $("#" + this.id).attr("for");
			const Setid = $("#" + this.id).data("setid");

			if (this.url != undefined && this.action != undefined && this.data == undefined) {

				$("#" + this.id).kendoDropDownList({
					serverFiltering: true,
					filter: "contains",
					optionLabel: title,
					autoBind: true,
					height: 290,
					dataSource: new kendo.data.DataSource({
						transport: {
							read: {
								url: this.url + "?act=" + this.action,
								dataType: "json"
							}
						},
						schema: {
							total: 'total',
							data: function (data) {
								data = data.result;

								// ცარიელი მონაცემის გამორიცხვა, რათა არ მოახდინოს დაჭრა (slice)
								if (data == null) {
									data = [];
									return data
								}

								if (typeof data[0] !== 'object' && data[0] !== null) {
									var dataArr = [];
									if (Setid) {
										data.map((x, i) => {
											i += 1
											dataArr.push({ id: i.toString(), name: x })
										})
									} else {
										data.map((x, i) => {
											dataArr.push({ id: x, name: x })
										})
									}

									return dataArr;
								}
								return data;
							}
						},
					}),
					dataTextField: "name",
					dataValueField: "id",
					dataBound: function (e) {
						if (!e.sender._state) {

							$("#" + e.sender.element[0].id).attr('isLoaded', true)

							if (SelectedValue != '') {
								var x = $("#" + e.sender.element[0].id).data("kendoDropDownList");
								x.value(SelectedValue);
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

						if (forElem != undefined) {
							let id = kendo_SelectedID(e.sender.element[0].id);

							let forURL = $("#" + forElem).attr("url");
							let forAction = $("#" + forElem).attr("action") + "&id=" + id;
							let forTitle = $("#" + forElem).attr("title");
							let forSelecttitle = $("#" + forElem).data("select-title");

							$("#" + forElem).kendoDropDownList({
								optionLabel: forTitle,
								serverFiltering: true,
								filter: "contains",
								autoBind: true,
								height: 290,
								dataSource: new kendo.data.DataSource({
									transport: {
										read: {
											url: forURL + "?act=" + forAction,
											dataType: "json"
										}
									},
									schema: {
										total: 'total',
										data: data => {
											data = data.result;
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
									},
								}),
								select: (c) => {
									if (typeof (callback) === 'function') {
										callback('', c);
									}
								},
								change: (e) => {
									if (typeof (callback) === 'function') {
										callback(e);
									}
								},
								dataTextField: "name",
								dataValueField: "id"
							});
						}
					}
				});

			} else {

				if (this.customData) {
					var customData = new Array();
					this.customData.map((x, i) => {
						i += 1
						customData.push({ id: i.toString(), name: x })
					})
					$("#" + this.id).kendoDropDownList({
						serverFiltering: false,
						filter: "contains",
						optionLabel: title,
						autoBind: true,
						height: 290,
						dataSource: {
							data: customData
						},
						dataTextField: "name",
						dataValueField: "id",
						dataBound: function (e) {
							if (!e.sender._state) {

								$("#" + e.sender.element[0].id).attr('isLoaded', true)

								if (SelectedValue != '') {
									var x = $("#" + e.sender.element[0].id).data("kendoDropDownList");
									x.value(SelectedValue);
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
						}
					});
				} else {
					$('#' + this.id).text("Attribute is undefined")
				}
			}

		}


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




class kendoTable {

	constructor(props) {
		this.actionUrl = '';
	}

	kendoData(typeName, i) {

		this.id = $(typeName[i])[0].id;

		this.state = {
			columns: $("#" + this.id).data("columns"),
			hidden: $("#" + this.id).data("hidden"),
			size: $("#" + this.id).data("size")
		}

		// სვეტების რაოდენობა
		this.columnCount = this.state.columns.length
		// სვეტების პარამეტრების მასივი
		this.columnSettings = [];
		// სვეტების ტიპის მასივი
		this.columnsSQL = [];
		// სვეტების სახელების მასივი
		this.columnNames = '{ "fields": {';
		this.state.columns.map((x, i) => {
			let name = geo_to_latin(x);
			let hidden = false;
			let width = '';
			let headerAttributes = '';

			if (this.state.hidden != undefined) {
				if (this.state.hidden[i]) {
					hidden = true;
				}
			}
			if (name == "id" || name == "ID" || name == 'Id') {
				width = 100
			}

			if (this.state.size != undefined) {
				if (this.state.size[i]) {
					width = this.state.size[i];
				}
			}

			if (name == 'manqanis_tipi') {
				headerAttributes = {
					class: "table-header-cell",
					style: ""
				}
			} else {
				headerAttributes = {
					"class": "table-header-cell",
					style: ""
				}
			}


			this.columnNames += `"${[name]}" : { "editable": true, "type": "string" },`

			this.columnSettings.push({
				field: name,
				hidden: hidden,
				encoded: false,
				title: x,
				filterable: {
					multi: true,
					search: true
				},
				headerAttributes: headerAttributes,
				width
			})
			this.columnsSQL.push(`${name}:string`)
		})

		// სვეტების სახელების მასივიდან ბოლო მძიმის წაშლა
		this.columnNames = this.columnNames.replace(/,\s*$/, "");
		this.columnNames += '}}';
		this.columnNames = JSON.parse(this.columnNames);

	}

	/**
	 * 
	 * @param {number} id 
	 * @param {string} url 
	 * @param {string} param 
	 */
	updateUrl(id, url, param) {

		if (param == undefined) {
			param = '';
		}

		$("#" + id).data("kendoGrid").dataSource.transport.options.read.url = url + param
		$("#" + id).data("kendoGrid").dataSource.read().then(function () {
			$("#" + id).data("kendoGrid").refresh();
		});
	}


	kendoTable(callback, param = '') {

		// დოკუენტში არსებული ყველა კენდო თეიბლი ტიპის ელემენტი;
		this.tableId = "kendo[type='table']";

		if (typeof param == "object") {
			if (param.id != '' || param.id != undefined) {
				this.tableId = param.id
			}
		}

		this.typeName = $(this.tableId);

		for (let i = 0; i < this.typeName.length; i++) {

			// CONSTRUCTOR 
			this.kendoData(this.typeName, i);

			// RETRIEVED DATA
			this.url = $("#" + this.id).attr("url");
			this.action = $("#" + this.id).attr("action");
			this.tableHeight = $("#" + this.id).data("height");
			this.addedParam = $("#" + this.id).data("param");

			this.search = $("#" + this.id).data("search");


			if (this.url != undefined && this.action != undefined) {

				this.actionUrl = this.url;
				this.actionUrl += `?act=${this.action}`
				this.actionUrl += `&count=${this.columnCount}&cols=${this.columnsSQL}`

				if (this.addedParam != undefined) {
					this.actionUrl += `&${this.addedParam}`;
				}

				this.dataSource = new kendo.data.DataSource({
					transport: {
						read: {
							url: this.actionUrl,
							dataType: "json"
						}
					},
					batch: true,
					pageSize: 10,
					schema: {
						model: this.columnNames,
						total: 'total',
						data: function (data) {
							return data.data;
						}
					},
					serverFiltering: false,
					serverPaging: false
				});

				var customTools = [];
				// customTools.push({ name: "pdf" });
				customTools.push({ name: "excel", text: "Excel" });
				if (this.search != undefined) {
					if (this.search != false) {
						customTools.push({ template: `<input id="${this.id}__start_date" autocomplete="off" data-url="${this.actionUrl}" data-id="${this.id}" class="kendo_date" value="${currentDate("-")}" placeholder="Start"  /> - <input id="${this.id}__end_date" autocomplete="off" data-url="${this.actionUrl}" data-id="${this.id}" class="kendo_date" value="${currentDate("-")}"  placeholder="End" />` });
					}
				}


				$("#" + this.id).kendoGrid({
					toolbar: customTools,
					pdf: {
						allPages: true,
						avoidLinks: true,
						paperSize: "A4",
						margin: { top: "2cm", left: "1cm", right: "1cm", bottom: "1cm" },
						landscape: true,
						repeatHeaders: true,
						template: $("#page-template").html(),
						scale: 0.8
					},
					messages: {
						noRecords: "ინფორმაცია არ არის"
					},
					dataSource: this.dataSource,
					selectable: "multiple",
					allowCopy: true,
					persistSelection: true,
					sortable: true,
					filterable: true,
					height: this.tableHeight,
					noRecords: true,
					pageable: {
						refresh: true,
						pageSizes: true,
						buttonCount: 5
					},
					columns: this.columnSettings,
					dataBound: callback
				});

				let thisId = this.id;
				let thisClass = this;
				let thisUrl = this.actionUrl;
				let thisSearch = this.search

				$("#" + this.id).data("kendoGrid").bind("dataBound", (e) => {

					switch (thisSearch) {
						case "date":
							GetDate(`${thisId}__start_date`);
							GetDate(`${thisId}__end_date`);
							break;
						case "datetime":
							GetDateTimes(`${thisId}__start_date`);
							GetDateTimes(`${thisId}__end_date`);
							break;
					}

					$(`#${thisId}__start_date`).change(function () {

						let start_date = this.value;
						let end_date = $(`#${thisId}__end_date`).val();
						let param = `&start_date=${start_date}&end_date=${end_date}`;

						thisClass.updateUrl(thisId, thisUrl, param)

					})

					$(`#${thisId}__end_date`).change(function () {

						let end_date = this.value;
						let start_date = $(`#${thisId}__start_date`).val();
						let param = `&start_date=${start_date}&end_date=${end_date}`;

						thisClass.updateUrl(thisId, thisUrl, param)

					})

				})
			}

		}
	}




	kendoData2(typeName, i) {

		this.id = $(typeName[i])[0].id;

		this.state = {
			columns: $("#" + this.id).data("columns"),
			hidden: $("#" + this.id).data("hidden"),
			size: $("#" + this.id).data("size"),
			header: $("#" + this.id).data('header'),
			hashing: $("#" + this.id).data('hashing')
		}

		// სვეტების რაოდენობა
		this.columnCount = 0;
		// სვეტების პარამეტრების მასივი
		this.columnSettings = [];
		// სვეტების ტიპის მასივი
		this.columnsSQL = [];
		// სვეტების სახელების მასივი
		this.columnNames = '{ "fields": {';

		this.state.header.map((x, i) => {

			// console.log(x, i)
			for (var [key, value] of Object.entries(x)) {

				this.columnCount += value.length;

				var columns = [];
				value.map((c, ii) => {
					let name = geo_to_latin(c);
					let hidden = false;
					let width = '';

					if (this.state.hidden != undefined) {
						if (this.state.hidden[i]) {
							hidden = true;
						}
					}

					if (name == this.state.hashing[i]) {
						name = name;
					} else {
						name = name + "_" + getSequence('eeee');
					}

					if (this.state.size != undefined) {
						if (this.state.size[i]) {
							width = this.state.size[i];
						}
					}

					columns.push({
						title: c,
						field: name,
						hidden: hidden,
						headerAttributes: {
							"class": "table-header-cell",
							style: "padding: 5px; text-align: center"
						},
						width
					});

					this.columnNames += `"${[name]}" : { "editable": true, "type": "string" },`
					this.columnsSQL.push(`${name}:string`)
				});


				if (geo_to_latin(key) == "foti" || geo_to_latin(key) == "batumi") {
					this.columnSettings.push({
						title: key,
						columns: columns,
						headerAttributes: {
							"class": "table-header-cell",
							style: "padding: 5px; text-align: center; background-color: #F0013A; color: white; "
						}
					})
				} else {
					this.columnSettings.push({
						title: key,
						columns: columns,
						headerAttributes: {
							"class": "table-header-cell",
							style: "background-color:#EDEDED;padding: 5px; text-align: center"
						}
					})
				}

			}


		})

		// სვეტების სახელების მასივიდან ბოლო მძიმის წაშლა
		this.columnNames = this.columnNames.replace(/,\s*$/, "");
		this.columnNames += '}}';
		this.columnNames = JSON.parse(this.columnNames);

	}



	KT_MultiCollumn() {

		// დოკუენტში არსებული ყველა კენდო თეიბლი ტიპის ელემენტი;
		this.typeName = $("kendo[type='multitable']");
		for (let i = 0; i < this.typeName.length; i++) {

			// CONSTRUCTOR 
			this.kendoData2(this.typeName, i);

			// RETRIEVED DATA
			this.url = $("#" + this.id).attr("url");
			this.action = $("#" + this.id).attr("action");
			this.tableHeight = $("#" + this.id).data("height");
			this.pagination = $("#" + this.id).data("pagination");

			if (this.pagination == undefined) {
				this.pagination = true;
			}

			if (this.url != undefined && this.action != undefined) {

				this.dataSource = new kendo.data.DataSource({
					transport: {
						read: {
							url: this.url + "?act=" + this.action + "&count=" + this.columnCount + "&cols=" + this.columnsSQL,
							dataType: "json"
						}
					},
					batch: true,
					pageSize: 10,
					schema: {
						model: this.columnNames,
						total: 'total',
						data: function (data) {
							return data.data;
						}
					},
					serverFiltering: false,
					serverPaging: false
				});


				$("#" + this.id).kendoGrid({
					dataSource: this.dataSource,
					selectable: "single",
					allowCopy: true,
					persistSelection: false,
					groupable: false,
					sortable: true,
					resizable: false,
					reorderable: false,
					pageable: this.pagination,
					columnMenu: false,
					columns: this.columnSettings
				});

			}
		}
	}





}
