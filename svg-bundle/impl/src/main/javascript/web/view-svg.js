define([
  "require"
], function(require) {

  "use strict";
  
  return [
    "pentaho/visual/base/view",
    "./modelGeneric",
	function(BaseView, ModelGeneric) {
    
		var SvgView = BaseView.extend({
		  
		  _updateAll: function() {
			var svg = require.toUrl(this.model.getSvgPath());
			var template = '<object class="' + this.model.$type.styleClass + '" data="' + svg + '"  width="100%" type="image/svg+xml"  >Your browser doesn\'t support SVG</object>';
			this.domContainer.innerHTML = template;
			
			
			var viewModel = this.model.toViewModel();
		
			var that = this;

			
			var domObject = this.domContainer.querySelector("object");
			domObject.addEventListener("load", function(event) {
				var svgDoc = this.getSVGDocument();
				that.changeSVG(svgDoc, viewModel);
			});
			
		  },
			changeSVG: function(svgDoc, viewModel){
				if (!svgDoc){
				   Logger.log("### UNABLE TO GET SVG DOCUMENT ###");
				   return;
				}
				
				//Change to visual Row
				var idIdx = 0;
				var attributeIdx = 1;
				var valueIdx = 2; 
				var formattedValueIdx = 3; 
						
				viewModel.forEach(function(row, rowIdx){
					
					var svgId = row[idIdx];
					var attr = row[attributeIdx];
					var value = row[valueIdx];
					
					
					var item = svgDoc.getElementById(svgId);
					if(!item) {
						return;
					}
					
					if (attr == "text") {
						//CHANGING TEXT CONTENT based on svgElementID
						
						var formattedValue = row[formattedValueIdx]
						item.textContent = formattedValue;
						return;
					}

					//CHANGING ITEM STYLE ATTRIBUTES						
					item.style[attr] = value;
				});
			}
		});

		return SvgView;
	  }
  ];
});