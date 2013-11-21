var http=require('http'),
	fs = require('fs'),
	querystring =require('querystring'),
	url = require('url');

http.createServer(function(req,res){
	var options = {
		hostname:'nodejs.org',
		port:80,
		path:'/api/all.json'
	}
	var request = http.get(options,function(response){
		response.setEncoding('utf-8');

		var callback  = querystring.parse(req.url)['/?callback'];
		var data = callback+"(";
		response.on('data',function(chunk){
			data+=chunk;
        });
        response.on('end',function(){
        	data+=")";
        	res.write(data);
			res.end();
        })
	});

	

}).listen(3000);

console.log("server started");
	