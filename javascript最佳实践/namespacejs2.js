//var list = ['圣骑士','大法师','山丘之王'];

var namespace1 = (function(n1){
	
	var listArmy = ['4个蜘蛛','2个食尸鬼','2个冰龙']

	n1.displayArmy = function(){
		n1.display();
		var mylist = document.getElementById("mylist"), 
		    fragment = document.createDocumentFragment(), 
		    element; 
		for(var i = 0, x = listArmy.length; i<x; i++){ 
		    element = document.createElement("li"); 
		    element.appendChild( document.createTextNode( listArmy[i]) ); 
		    fragment.appendChild(element); 
		}
		mylist.appendChild(fragment);
	}

	return n1;
})(namespace1);