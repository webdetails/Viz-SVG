define([
  "module",
  "pentaho/visual/base/view",
  "./model",
  "d3"
], function(module, baseViewFactory, barModelFactory, d3) {

  "use strict";
  
  return function(context) {
	var svg = "./utility-vehicle-health.svg";
	var template = '<object id="' + "mySvg" + '" data="' + svg + '"  type="image/svg+xml" >Your browser doesn\'t support SVG</object>';
       
    var BaseView = context.get(baseViewFactory);

    var BarView = BaseView.extend({
      type: {
        id: module.id,
        props: [
          {
            name: "model",
            type: barModelFactory
          }
        ]
      },
    
    _updateAll: function() {
        d3.select(this.domContainer).html(template);
      }
    });

    return BarView;
  };
});