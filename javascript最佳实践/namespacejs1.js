var namespace1 = {
	list : ['死亡骑士','巫妖','恐惧魔王'],
	display : function display(){
		var mylist = document.getElementById("mylist"), 
	    fragment = document.createDocumentFragment(), 
	    element; 

		for(var i = 0, x = list.length; i<x; i++){ 
		    element = document.createElement("li"); 
		    element.appendChild( document.createTextNode( this.list[i]) ); 
		    fragment.appendChild(element); 
		}

		mylist.appendChild(fragment);
	}
};


var globalVariable = "我是外层变量,从disply函数找到我需要很久很久";

var namespace1 = (function(gv){
	
	var importGlobalVariable = gv;
	var list = ['死亡骑士','巫妖','恐惧魔王'];

	function display(){
		var mylist = document.getElementById("mylist"), 
	    fragment = document.createDocumentFragment(), 
	    element; 
		for(var i = 0, x = list.length; i<x; i++){ 
		    element = document.createElement("li"); 
		    element.appendChild( document.createTextNode( list[i]) ); 
		    fragment.appendChild(element); 
		}
		console.log(importGlobalVariable);
		mylist.appendChild(fragment);
	}
	return {
		display:display
	};
})(globalVariable);



