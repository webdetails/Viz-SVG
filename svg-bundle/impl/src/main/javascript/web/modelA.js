define([
  "module",
  "pentaho/visual/base",
  "./us"
], function(module, baseModelFactory, viewModelGenerators) {
  
  "use strict";
  
  return function(context) {
    
    var BaseModel = context.get(baseModelFactory);
    
    var SvgModel = BaseModel.extend({
      type: {
        id: module.id,
        styleClass: "pentaho-visual-samples-svg",
        label: "SVG Map US",
        defaultView: "./view-svg",
        props: [
		  // Visual role properties
          {
            name: "category",
            type: {
              base: "pentaho/visual/role/ordinal",
              props: {attributes: {isRequired: true, countMax: 1}}
            }
          },{
            name: "measure",
            type: {
              base: "pentaho/visual/role/quantitative",
              dataType: "number",
              props: {attributes: {isRequired: true, countMax: 1}}
            }
          }, {
            name: "svg",
            type: "string",
            value: "./us.svg",
            isRequired: true,
			isBrowsable: false
          }
        ]
      },
	  toViewModel: function(){
		  
		  var viewModel = [];
		  
		  var data = this.data;
		  var nRows = data.getNumberOfRows();
		  
		  var fAttr = viewModelGenerators.toAttribute;
		  var fValue = viewModelGenerators.toValue;
		  var fProps = viewModelGenerators.toProps;
		  
		  var idCol = data.getColumnIndexByAttribute(this.category.attributes.at(0).dataAttribute);
		  var measureCol = data.getColumnIndexByAttribute(this.measure.attributes.at(0).dataAttribute);
		  
		  for(var rowIdx=0; rowIdx < nRows; rowIdx++){
			
			var id = data.getFormattedValue(rowIdx, idCol);
			var props = fProps(id);
			var measure = data.getValue(rowIdx, measureCol);
			
			props.forEach(function(prop){
				
				var attr = fAttr(id, prop, measure);
				var value = fValue(id, prop, measure);

				viewModel.push([id, attr, value]);
			});
		  }
		  return viewModel;
	  }
    });
    
    return SvgModel;
  };
});