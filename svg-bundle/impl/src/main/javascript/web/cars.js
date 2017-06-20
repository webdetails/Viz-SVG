define(function(){
	
	return {
		toProps: function(id){
			return ["Status", "Circle"];
		},
		
		toAttribute: function(id, prop, measure) {
			switch(prop){
				case "Status": return "text";
				case "Circle": return "fill";
			}
			return prop;
		},
		
		toValue: function(id, prop, measure) {
			switch(prop){
				case "Status": return measure;
				case "Circle": return measure > 5 ? "green" : "red";
			}
		}
	};
})