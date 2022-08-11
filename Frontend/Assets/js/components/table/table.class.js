import {sendKendoRequest} from "../../helpers/kendo.helper.js";
import Helper from "../../helpers/helper.class.js";


export default class Table extends Helper{

    constructor(element, callback){
			super();

			this.state = {
				dom: [],
				element: element,
				data: {},
				option: {
					footer: {},
					count: 10
				},
				callback: callback,
				aggregates: []

			}
    }


    init = () => {

			this.state.element.data   = this.state.element.getAttribute("data") || {};
		
			this.state.element.jsonData = (this.state.element.getAttribute("jsondata") ? JSON.parse(this.state.element.getAttribute("jsondata")) : null)
			this.state.element.height = this.state.element.getAttribute("height");
			this.state.element.ws 	  = this.state.element.getAttribute("ws") || false;

			this.state.template = $(this.state.element).children('script');
			
			this.state.element.template = this.state.template.length > 0 ? {rowTemplate: kendo.template($(this.state.template).html()) } : ''
		
			this.kendoData();
			this.kendoOption()
			

			let dataSource = this.buildDataSource();
			this.build(dataSource);
	

    }


    build = (dataSource) => {
		
		
		// CUSTOM VARIABLES -------------------------------------

		var customTools = [];

		if(!this.state.option.header){
			customTools = false;
		}else{
			if(this.state.option.export){
				if(this.state.option.export.pdf) customTools.push({ name: "pdf", text: "PDF" });
				if(this.state.option.export.excel) customTools.push({ name: "excel", text: "Excel" });
			}

			if(this.state.option.search) customTools.push("search");

		}
		
		// customTools.push({ name: "search" });



		// -------------------------------------------------------
		// TABLE CONFIGURATION
		// -------------------------------------------------------
		
		$(this.state.element).kendoGrid({
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
			dataSource: dataSource,
			allowCopy: true,
			persistSelection: false,
			sortable: true,
			height: this.state.element.tableHeight,
			noRecords: true,
			...this.state.element.template,
			selectable: this.state.option.footer.selectable,
			pageable: this.state.option.footer,
			filterable: {
				mode: "menu, row"
			},
			columns: this.columnSettings
		});


    }

	send = (socket, request, data, callback) => {
		
        // if (socket.readyState != 1) {

		// 	this.buildModal(null, {
		// 		title: "Alert",
		// 		content: "Cant Connect to Server",
		// 		overlayClass: 'alert-overlay',
		// 		addClass: 'alert-modal'
				
		// 	})

        //     return;
			
        // }
		
		socket.onmessage = function (e) {

			var data = JSON.parse(e.data);
			
			// if(typeof data.result.length == 'undefined') return false;
			
			if (data.id == request.id) {
				callback(data.result);
			}
			
			if (data.wsRoute == request.wsRoute) {
				callback(data.result);
			}

		};

		Object.assign(request, data)
        socket.send(JSON.stringify(request));
		
    }

	buildDataSource = () => {

		// DATA SOURCE FOR TABLE
		this.actionUrl = {
			count: this.columnCount,
			cols: this.columnsSQL
		}

		let data = this.toJsonUrl(this.state.element.data);

		Object.assign(this.actionUrl, data)

		let transport;
		
		if(this.state.element.ws == "true"){

			transport = {
				read:  (options) => {
					var request = { type: "read" };

					request.id = kendo.guid();
					
					$.socket.kendo[data.wsRoute] = new this.Connection()
					
					$.socket.kendo[data.wsRoute].open((e) => {
					
						this.send(e.target, request, data, (result) => {
						
							options.success(result);
						});
						
					});

					// $.socket.kendo[data.wsRoute].onopen = (e) => {
						
					// 	this.send($.socket.kendo[data.wsRoute], request, data, (result) => {
					// 		options.success(result);
					// 	});
					// }
					
				}
			}

		}else if(typeof this.state.element.jsonData == 'object' && this.state.element.jsonData != null){
			transport = {
				read: (option) => {
					
					option.success(this.state.element.jsonData)
				}
			}
		}else{
			transport = {
				read: (options) =>{
					sendKendoRequest(this.actionUrl, options)
				}
			}
		}


		let dataSource = new kendo.data.DataSource({
			transport: transport,
			autoSync: true,
			schema: {
				model: this.columnNames,
				total: function(data) {

					if(data == null) data = []
					return data.length; 
					
				},
				data: function (data) {
				
					if (data == null) {
						data = [];
						return data
					}
					
					return data;
				}
			},
			serverFiltering: false,
			serverPaging: false,
			serverSorting: false,
			pageSize: this.state.option.count,
			aggregate: this.state.aggregates
		});

		return dataSource;
	}


    kendoData() {

		let column = this.state.element.getAttribute("column")
		let option = this.state.element.getAttribute("option");

		this.state.data = {
			column: JSON.parse(column),
			option: (option != undefined ? JSON.parse(option) : {}),
		}

		// სვეტების რაოდენობა
		this.columnCount = this.state.data.column.length
		// სვეტების პარამეტრების მასივი
		this.columnSettings = [];
		// სვეტების ტიპის მასივი
		this.columnsSQL = [];
		// სვეტების სახელების მასივი
		this.columnNames = '{ "fields": {';
		
		this.state.data.column.map((x, i) => {
			let field = (x.name ? x.name : this.geo_to_latin(x.field));
			let hidden = false;
			let width = '';
		
			if(x.hidden) hidden = x.hidden;
			if(field == "id" || field == "ID" || field == 'Id') width = 100
			if(x.size != undefined) width = x.size
				
		
			let cell;

			if(field == "id"){
				cell = {
					showOperators: false,
					operator: "contains",
					suggestionOperator: "contains",
					template: function (args) {
						args.element.css({"width": "90%", "background": "transparent", "height": "unset"}).addClass("k-textbox").attr("data-value-update", "input");
					},
					enabled: true
				}

			}else{

				cell = {
					showOperators: false,
					operator: "contains",
					suggestionOperator: "contains",
					template: function (args) {
						args.element.css({"width": "90%", "background": "transparent", "height": "unset"}).addClass("k-textbox").attr("data-value-update", "input");
					},
					// template: (args) => {
					// 	args.element.kendoDropDownList({
					// 		serverFiltering: true,
					// 		filter: "contains",
					// 		autoBind: true,
					// 		dataSource: args.dataSource,
					// 		dataTextField: field,
					// 		dataValueField: "test",
					// 		valuePrimitive: true
					// 	})

					// }
				}
			}

			let searchObj = {
				multi: true,
				search: (typeof x.search != "undefined" ? x.search : true),
				cell: cell
			};

			let filterable = (typeof x.filter == "undefined" ? 
			searchObj : (x.filter ? searchObj : x.filter))
			

			let headerAttributes = {
				class: "table-header-cell",
				style: ""
			}

			let aggregateFooter = ``;
			let aggregates = [];


			if(x.aggregates){
				aggregates = x.aggregates;
				aggregateFooter = x.aggregateTemplate

				aggregates.forEach(x => {
					this.state.aggregates.push({
						field: field,
						aggregate: x
					})
				})
				
				this.columnNames += `"${[field]}" : { "type": "number" },`
			}else{
				this.columnNames += `"${[field]}" : { "type": "string" },`
			}
			
			// SET AND CONFIGURE SINGLE TEMPLATE
			// PLEASE DO NOT TOUCH THIS CODE~~~ ! ჭკვას უხმე პაწა!
			let temp;

			if(typeof x.template != 'undefined'){
				if(x.template.charAt(0) != '<'){
					if(typeof eval(x.template)){
						temp = eval(x.template)
						
					}else{
						temp = x.template
					}
				}else{
					temp  = x.template
				}
			}

	
			let template = (typeof x.template == "undefined" ? {} : { template: temp } )

			// END THIS SHIT

			this.columnSettings.push({
				field: field,
				hidden: hidden,
				encoded: (x.encoded ? x.encoded : false ),
				title: x.field,
				...template,
				filterable: filterable,
				headerAttributes: headerAttributes,
				width: width,
				footerTemplate: aggregateFooter,
				aggregates: aggregates
			})
			
			this.columnsSQL.push(`${field}:string`)
		})

		// სვეტების სახელების მასივიდან ბოლო მძიმის წაშლა
		this.columnNames = this.columnNames.replace(/,\s*$/, "");
		this.columnNames += '}}';
		this.columnNames = JSON.parse(this.columnNames);

	}


	kendoOption = () => {

		this.state.option.footer = {
				refresh: (typeof this.state.data.option.refresh != "undefined" ? this.state.data.option.refresh : true),
				pageSizes: (typeof this.state.data.option.pageSizes != "undefined" ? this.state.data.option.pageSizes : true),
				position: "bottom",
				numeric: (typeof this.state.data.option.numeric != "undefined" ? this.state.data.option.numeric : false),
				alwaysVisible: (typeof this.state.data.option.footer != "undefined" ? this.state.data.option.footer : true),
				responsive: true,
				info: (typeof this.state.data.option.info != "undefined" ? this.state.data.option.info : true),
				previousNext: (typeof this.state.data.option.previousNext != "undefined" ? this.state.data.option.previousNext : true),
				selectable: (typeof this.state.data.option.selectable != "undefined" ? this.state.data.option.selectable : "multiple")
		}

		this.state.data.option.footer == false && (this.state.option.footer = false)
		
		if(typeof this.state.data.option.count != "undefined"){
			this.state.option.count = this.state.data.option.count
		}else{
			this.state.option.count = 10
		}

		if(typeof this.state.data.option.search != 'undefined'){
			this.state.option.search = this.state.data.option.search
		}else{
			this.state.option.search = false

		}

		this.state.option.header = (typeof this.state.data.option.header != "undefined" ? this.state.data.option.header : false)
		this.state.option.export = (typeof this.state.data.option.export != "undefined" ? this.state.data.option.export : true)
		this.state.option.button = this.state.data.option.button
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


	
    

}