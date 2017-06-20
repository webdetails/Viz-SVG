define([
  "module",
  "pentaho/visual/base",
  "./cars"
], function(module, baseModelFactory, viewModelGenerators) {
  
  "use strict";
  
  return function(context) {
    
    var BaseModel = context.get(baseModelFactory);
    
    var SvgModel = BaseModel.extend({
      type: {
        id: module.id,
        styleClass: "pentaho-visual-samples-svg",
        label: "SVG",
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
            value: "./utility-vehicle-health.svg",
            isRequired: true
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
			
			var idBase = data.getValue(rowIdx, idCol);
			var props = fProps(idBase);
			var measure = data.getValue(rowIdx, measureCol);
			
			props.forEach(function(prop){
				 
				var attr = fAttr(idBase, prop, measure);
				var value = fValue(idBase, prop, measure);
				var id = idBase + prop;
				viewModel.push([id, attr, value]);
			});
		  }
		  return viewModel;
	  }
    });
    
    return SvgModel;
  };
});