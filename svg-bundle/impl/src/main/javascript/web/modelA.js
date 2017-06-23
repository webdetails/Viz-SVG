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
			label: "SVG Map",
			props: [
				{
				 name: "svg",
				 // SVG file name
				 value: function(){ return this.getSvgPath(this.category.attributes.at(0).dataAttribute.label);}
				}
			]
		},
		
		getSvgPath: function(granularity){
			switch(granularity){
				case "Territory": 
					return "./continents.svg";
				case "Country": 
					return  "./country.svg";
				case "State Province": 
					return "./us.svg";
			}
			return "./continents.svg";
		},
		
	  	getSvgPartforDataID: function(dataId){
			return ["fill", "stroke"];
		},
		
		toSvgAttribute: function(dataId, prop, dataValue) {
			return prop;
		},
		
		toSvgValue: function(dataId, prop, dataValue) {
			var granularity = this.category.attributes.at(0).dataAttribute.label;
			var rangeSales = "";
			var rangeQuantity = "";
			
			switch(granularity){
				case "Territory": 
					rangeSales = 2000000;
					rangeQuantity = 15000;
					break;
				case "Country":
					rangeSales = 300000;
					rangeQuantity = 3000;
					break;
				default:
					rangeSales = 250000;
					rangeQuantity = 2500;
			}
			
			switch(prop){
				case "fill": 
					return dataValue[0] > rangeSales ? "red" : "green";
				case "stroke": 
					if(dataValue.length == 1) { 
						return  "#000"
					}
					return dataValue[1] > rangeQuantity ? "red" : "green";
			}
			return dataValue;
		}
    });
    
    return SvgModel;
  };
});