function foreach(list, func){
	while(list){
		func(list.val);
		list=list.next;
	}
}

var list = null;
for (var i = 0; i < 4; i++) {
	list = {val:i, next:list};
}

var i = 0;
foreach(list,function(n){
	console.log("node("+ i +") = " +n);
	i++;
});