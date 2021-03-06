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
define(function() {
  
  "use strict";
  
  return ["./modelGeneric", function(BaseModel) {
    
    var SvgModel = BaseModel.extend({
		$type: {
			// SVG Label and Class
			styleClass: "pentaho-visual-samples-svg",
			label: "SVG Car"
		},
		
		getSvgPath: function(){
			return "./utility-vehicle-health.svg";
		},
		
		//get
	  	getSvgPartforDataID: function(dataId){
			return ["Status", "Circle"];
		},
		
		toSvgId: function(dataId, prop){
			return dataId + prop;
		},
		
		toSvgAttribute: function(dataId, prop, dataValue) {
			switch(prop){
				case "Status": return "text";
				case "Circle": return "fill";
			}
			return prop;
		},
		
		toSvgValue: function(dataId, prop, dataValue) {
			switch(prop){
				case "Status": return dataValue;
				case "Circle": return dataValue > 5 ? "green" : "red";
			}
		}
    });
    
    return SvgModel;
  }];
});