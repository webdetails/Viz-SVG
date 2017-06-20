define([
  "module",
  "pentaho/visual/base"
], function(module, baseModelFactory) {
  
  "use strict";
  
  return function(context) {
    
    var BaseModel = context.get(baseModelFactory);
    
    var SvgModel = BaseModel.extend({
      type: {
        id: module.id,
        styleClass: "pentaho-visual-samples-svgA",
        label: "SVG A",
        defaultView: "./view-svg",
        props: [
          {
            name: "svg",
            type: "string",
            value: "./us.svg",
            isRequired: true,
			isBrowsable: false
          },
		  // Visual role properties
          {
            name: "category",
            type: {
              base: "pentaho/visual/role/ordinal",
              props: {attributes: {isRequired: true, countMax: 1}}
            }
          },
          {
            name: "measure",
            type: {
              base: "pentaho/visual/role/quantitative",
              dataType: "number",
              props: {attributes: {isRequired: true, countMax: 1}}
            }
          }
        ]
      }
    });
    
    return SvgModel;
  };
});