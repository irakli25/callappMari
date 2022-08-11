import Tdg from "../tdg.class.js";


/**
 * SEND REQUEST FROM KENDO
 * @param {Object} data 
 * @param {Parameters} options 
 */
export const sendKendoRequest = (data, options) => {

    $.ajax({
        data: data,
        success: function(result) {
          options.success(result);
        },
        error: function(result) {
          options.error(result.responseText);
        }
      });

}



/**
 * @name  KENDO
 * @param {String} Element
 * @param {String} type
 */
 export const kendo__refresh = (Element, type) => {
  if (type == "table") {
    $(Element)
      .data("kendoGrid")
      .dataSource.read();
  }

  if (type == "s") {
    $(Element)
      .data("kendoDropDownList")
      .refresh();
  }
}

/**
 * @name  KENDO KENDO MULTISELECTOR SELECTED IDs
 * @param {String} Element
 */
 export const kendo__multiSelectedID = (Element) => {
  let items = $(Element)
    .data("kendoMultiSelect")
    .dataItems();

  let multiIDs = new Array();

  items.map((x, i) => {
    multiIDs.push(x.id);
  });

  return multiIDs;
}

/**
 * @name  KENDO KENDO MULTISELECTOR SELECTED Name
 * @param {String} Element
 */
 export const kendo__multiSelectedName = (Element) => {
  let items = $(Element)
    .data("kendoMultiSelect")
    .dataItems();

  let multiIDs = new Array();

  items.map((x, i) => {
    multiIDs.push(x.name);
  });

  return multiIDs;
}

/**
 * @name  KENDO KENDO SELECTOR SELECTED ID
 * @param {String} Element
 */
 export const kendo_SelectedID = (Element) => {
  return $(Element)
    .data("kendoDropDownList")
    .value();
}

/**
 * @name  KENDO KENDO SELECTOR GET SELECTED TEXT
 * @param {String} Element
 */
 export const kendo_SelectedText = (Element) => {
  return $(Element)
    .data("kendoDropDownList")
    .text();
}

/**
 * @name  KENDO DISABLE KENDO SELECTOR WITH ID
 * @param {*} Element
 */
 export const kendo_DisableID = (Element) => {
  return $(Element)
    .data("kendoDropDownList")
    .enable(false);
}

/**
 *
 * @param {String} Element
 * @param {Number} value
 */
 export const kendo_setValue = (Element, value) => {
  var x = $(Element).data("kendoDropDownList");
  x.value(value);
  x.trigger("change");
}

/**
 *
 * @param {String} Element
 * @param {Number} value
 */
 export const kendo_setIndex = (Element, value) => {
  var x = $(Element).data("kendoDropDownList");
  x.select(value);
  x.trigger("change");
}

/**
 *
 * @param {String} Element
 * @param {Number} value
 */
 export const kendo_setValueByID = (Element, value) => {
  var x = $(Element).data("kendoDropDownList");
  x.select(function(dataItem) {
      return dataItem.id === value;
  });
  x.trigger("change");
}

/**
 *
 * @param {String} Element
 * @param {String} text
 */
 export const kendo_setText = (Element, text) => {
  var x = $(Element).data("kendoDropDownList");
  x.text(text);
  x.trigger("change");
}

/**
 * @name  KENDO ENABLE KENDO SELECTOR WITH ID
 * @param {*} Element
 */
 export const kendo_EnableID = (Element) => {
  return $(Element)
    .data("kendoDropDownList")
    .enable(true);
}

/**
 *
 * @param {Dom} element
 * @param {String} Element
 * @param {function} callback
 */
 export const kendo_dblClick = (element, Element, callback) => {
  // ჭირდება რამოდენიმე თეიბლზე მიმაგრება; ID, ID, iD -> Click
  if (element == "") {
    element = document;
  }
  $(element).on(
    "dblclick",
    Element + " tr.k-state-selected",
    function () {
      var kendoGrid = $(Element).data("kendoGrid");
      kendoGridItem = kendoGrid.dataItem($(this));
      callback(kendoGridItem);
    }
  );
}

/**
 *
 * @param {Dom} element
 * @param {String} Element
 * @param {function} callback
 */
 export const kendo_Click = (element, Element, callback) => {
  if (element == "") {
    element = document;
  }
  $(element).on("click", Element + " tr.k-state-selected", function () {
    var kendoGrid = $(Element).data("kendoGrid");
    kendoGridItem = kendoGrid.dataItem($(this));
    callback(kendoGridItem);
  });
}

/**
 * @description GET SELECTED IDS
 * @param {String} Element
 * @param {function} callback
 * @callback {number, number} IDs, IDs Count
 */
 export const kendo_SelectedRows = (Element, callback) => {
   
  var selected = [];
  var grid = $(Element).data("kendoGrid");

  var rows = grid.select();
  rows.each(function (index, row) {
    const item = grid.dataItem(row);
    selected.push(item.id);
  });

  return selected
}

/**
 *
 * @param {String} Element
 */
 export const kendo_setSuccess = (Element) => {
  $(Element + " .k-state-selected").attr(
    "style",
    "background-color: #d5ffd5 !important"
  );

  setTimeout(() => {
    $(Element + " .k-state-selected").css("background-color", "");
  }, 3000);
}

 export const kendo__callback = (e, c, callback) => {
  callback(e, c);
}

/**
 *
 * @param {String} Element
 */
 export const kendo_setError = (Element) => {
  $(Element + " .k-state-selected").css(
    "style",
    "background-color #ff5a49 !important"
  );

  setTimeout(() => {
    $(Element + " .k-state-selected").css("background-color", "");
  }, 3000);
}



export const kendo__appendToHeader = (callback, ...elements) => {

  let kendo = callback.sender.element[0].parentNode;
  let header = kendo.childNodes[0];

  elements.forEach(x => {
    new Tdg().append(header, x)
  })
  

}



	/**
	 * 
	 * @param {number} Element 
	 * @param {string} url 
	 * @param {string} param 
	 */
  export const kendo__updateUrl = (Element, param) => {

		if (param == undefined) {
			param = '';
		}

		let url = $(Element).data("kendoGrid").dataSource.transport.read
    console.log(url)
    // $(Element).data("kendoGrid").dataSource.transport.options.read.url = url + param;
		// $(Element).data("kendoGrid").dataSource.read().then(function () {
		// 	$(Element).data("kendoGrid").refresh()
		// })


	}

  export const kendo__destroy = (Element) => {

    var grid = $(Element).data("kendoGrid");
    grid.destroy();

  }


 export const forceKendoChange = (element, id, increase = false) => {
    var index = 0;
    var dropdownlist = $(element).data("kendoDropDownList");
  
    var myInterval = setInterval(() => {
      dropdownlist.dataSource.data().forEach((item, ind) => {
  
        if (item.id == id) {
          index = ind;
        }
  
      });
  
      if (increase) {
        index += 1;
      }
  
      dropdownlist.select(index);
  
      if (dropdownlist.dataSource.data().length > 0) {
        clearInterval(myInterval)
      }
  
    }, 500);

  }

  export const kendoResponsive = () => {
    $("kendo .k-grid-header-wrap").css("overflow", "hidden");
    $("kendo .k-grid-content").css("overflow-y", "scroll").css("overflow-x", "auto").scroll(function() {
        var left = $(this).scrollLeft();
        var wrap = $("kendo > .k-grid-header-wrap");
        if (wrap.scrollLeft() != left) wrap.scrollLeft(left);
    });
  }