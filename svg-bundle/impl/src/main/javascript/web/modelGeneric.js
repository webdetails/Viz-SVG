/*!
 * Copyright 2010 - 2017 Pentaho Corporation. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
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
        styleClass: "pentaho-visual-samples-svg",
        label: "Generic SVG",
        defaultView: "./view-svg",
		isAbstract: true,
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
              props: {attributes: {isRequired: true, countMax: 2}}
            }
          }, {
            name: "svg",
            type: "function",
            isRequired: true,
			isBrowsable: false
          }
        ]
      },
	  toViewModel: function(){
		  
		  var viewModel = [];
		  this.__caches = {};
		  var data = this.data;
		  var nRows = data.getNumberOfRows();
		    
		  var idCol = data.getColumnIndexByAttribute(this.category.attributes.at(0).dataAttribute);
		  var measureCols = this.measure.attributes.toArray(function(attribute){
			  return data.getColumnIndexByAttribute(attribute.dataAttribute);
		  });
		  
		  for(var rowIdx=0; rowIdx < nRows; rowIdx++){
			
			var dataId = data.getFormattedValue(rowIdx, idCol);
			var svgPartforDataID = this.getSvgPartforDataID(dataId);
			var dataValue = measureCols.map(function(measureCol){
				return data.getValue(rowIdx, measureCol);
			});
			var dataValueFormatted = measureCols.map(function(measureCol){
				return data.getFormattedValue(rowIdx, measureCol);
			});
			
			svgPartforDataID.forEach(function(prop){
				
				var id = this.toSvgId(dataId, prop, dataValue); 
				var attr = this.toSvgAttribute(dataId, prop, dataValue);
				var value = this.toSvgValue(dataId, prop, dataValue);
				
				viewModel.push([id, attr, value, dataValueFormatted]);
			},this);
		  }
		  return viewModel;
	  },
		getSvgPartforDataID: function(dataId){
			return dataId;
		},
		
		toSvgId: function(dataId, prop){
			return dataId;
		},
		
		toSvgAttribute: function(dataId, prop, dataValue) {
			return prop;
		},
		
		toSvgValue: function(dataId, prop, dataValue) {
			return dataValue[0];
		}
    });
    
    return SvgModel;
  };
});