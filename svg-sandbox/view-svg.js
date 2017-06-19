define([
  "module",
  "require",
  "pentaho/visual/base/view",
  "./model"
], function(module, require, baseViewFactory, barModelFactory) {

  "use strict";
  
  return function(context) {
    var BaseView = context.get(baseViewFactory);

    var SvgView = BaseView.extend({
      type: {
        id: module.id,
      },
    
	  _updateAll: function() {
		var svg = require.toUrl(this.model.svg);
		var template = '<object class="' + this.model.type.styleClass + '" data="' + svg + '"  width="100%" type="image/svg+xml"  >Your browser doesn\'t support SVG</object>';
        this.domContainer.innerHTML = template;
		
		 // The data Model
        var model = this.model;

        var dataTable = model.data;
		var that = this;

		
		var domObject = this.domContainer.querySelector("object");
		domObject.addEventListener("load", function(event) {
			var svgDoc = this.getSVGDocument();
			that.changeSVG(svgDoc, dataTable);
		});
		
      },
		changeSVG: function(svgDoc, dataTable){
			debugger;
			var nRows = dataTable.getNumberOfRows();
			
			//Change to visual Row
			var changeTypeColumn = 0;
			var svgElementID = 1;
			var value = 2; 
					
			for (var i = 0; i < nRows; i++) {
                       
				if (svgDoc) {
					var attr = dataTable.getValue(i, changeTypeColumn)
				
					if (attr == "text") {
						//CHANGING TEXT CONTENT based on svgElementID
						var svgId = dataTable.getValue(i,svgElementID);
						var text = svgDoc.getElementById(svgId);
						
						text.textContent = dataTable.getValue(i,value);
                           
                    } else  {
						//CHANGING ITEM STYLE ATTRIBUTES
						var svgId = dataTable.getValue(i,svgElementID);
						var item = svgDoc.getElementById(svgId);
						
						item.style[attr] = dataTable.getValue(i,value);
						
					} 
				} else {
				   Logger.log("### UNABLE TO GET SVG DOCUMENT ###");
				}
			}
		}
    });

    return SvgView;
  };
});