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
  "./modelGeneric"
], function(module, baseModelFactory) {
  
  "use strict";
  
  return function(context) {
    
    var BaseModel = context.get(baseModelFactory);
    
    var SvgModel = BaseModel.extend({
		type: {
			id: module.id,
			// SVG Label and Class
			styleClass: "pentaho-visual-samples-svg",
			label: "SVG Product Line",
			props: [
				{
					 name: "svg",
					 // SVG file name
					 value: function(){return "./SteelWheels.svg";}
				},
				{
					name: "measure",
					type: {
					  props: {attributes: { countMax: 1}}
					}
				}
			]
		},
		//get
	  	getSvgPartforDataID: function(dataId){
			return ["Value", "Fill", "TextFill"];
		},
		
		toSvgId: function(dataId, prop){
			return dataId + prop;
		},
		
		toSvgAttribute: function(dataId, prop, dataValue) {
			switch(prop){
				case "Value": return "text";
				case "Fill": return "fill";
				case "TextFill": return "fill";
			}
			return prop;
		},
		
		
		
		toSvgValue: function(dataId, prop, dataValue) {
			switch(prop){
				case "Value": return dataValue[0];
				
				case "Fill":
				case "TextFill":
					if(!this.__caches.fillRange) {
						var data = this.data;
						var measureCols = this.measure.attributes.toArray(function(attribute){
							return data.getColumnIndexByAttribute(attribute.dataAttribute);
						});
						this.__caches.fillRange = this.data.getColumnRange(measureCols[0]);
					}
					var ratioValue = (dataValue[0] -  this.__caches.fillRange.min) / (this.__caches.fillRange.max - this.__caches.fillRange.min);
					return ratioValue > 0.66 ? "#0f8b8d" : (ratioValue > 0.33 ? "#ffbb00" : "#ff5838");
			}
		}
    });
    
    return SvgModel;
  };
});