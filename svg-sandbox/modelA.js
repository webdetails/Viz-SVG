define([
  "module",
  "pentaho/visual/base"
], function(module, baseModelFactory) {
  
  "use strict";
  
  return function(context) {
    
    var BaseModel = context.get(baseModelFactory);
    
    var svgModel = BaseModel.extend({
      type: {
        id: module.id,
        styleClass: "pentaho-visual-samples-svg",
        label: "SVG",
        defaultView: "./view-svg",
        props: [
          {
            name: "svg",
            type: "string",
            value: "./us.svg",
            isRequired: true
          }
        ]
      }
    });
    
    return svgModel;
  };
});