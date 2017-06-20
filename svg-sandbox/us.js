define(function(){
	
	return {
		toProps: function(id){
			return ["fill"];
		},
		
		toAttribute: function(id, prop, measure) {
			return prop;
		},
		
		toValue: function(id, prop, measure) {
			return measure > 3 ? "red" : "green";
		}
	};
})