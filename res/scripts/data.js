
var data = {"rotations":[

{
	"date":"2012-09-01",
	"day":"1",
	"type":"0",
	
	"block1":"1",
	"block2":"2",
	"block3":"3",
	"block4":"4",
	
},
{
	"date":"2012-09-02",
	"day":"2",
	"type":"0",
	
	"block1":"5",
	"block2":"6",
	"block3":"7",
	"block4":"8",
}
]};

console.log("Initializing...");
console.log("---------------");


for (var i in data.rotations){

	if (data.rotations[i].type === "0"){
	
		var today = JSON.stringify(data.rotations[i].date);
		console.log(today);
		
	};
}