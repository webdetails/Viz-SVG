define([
  "module",
  "require",
  "pentaho/visual/base/view",
  "./model"
], function(module, require, baseViewFactory, barModelFactory) {

  "use strict";
  
  return function(context) {
    var BaseView = context.get(baseViewFactory);

    var svgView = BaseView.extend({
      type: {
        id: module.id,
      },
    
	  _updateAll: function() {
		var svg = require.toUrl(this.model.svg);
		var template = '<object class="' + this.model.styleClass + '" data="' + svg + '"  type="image/svg+xml" >Your browser doesn\'t support SVG</object>';
       
        this.domContainer.innerHTML = template;
      }
    });

    return svgView;
  };
});