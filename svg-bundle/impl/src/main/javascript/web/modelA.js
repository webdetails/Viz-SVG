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
			label: "SVG Map US",
			props: [
				{
				 name: "svg",
				 // SVG file name
				 value: "./us.svg"
				}
			]
		},
		
	  	toProps: function(id){
			return ["fill", "stroke"];
		},
		
		toAttribute: function(id, prop, measures) {
			return prop;
		},
		
		toValue: function(id, prop, measures) {
			switch(prop){
				case "fill": 
					return measures[0] > 3000 ? "red" : "green";
				case "stroke": 
					if(measures.length == 1) { 
						return  "#000"
					}
					return measures[1] > 3000 ? "red" : "green";
			}
			return measures;
		}
    });
    
    return SvgModel;
  };
});