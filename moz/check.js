var Mozscape = require('mozscape').Mozscape;

var moz = new Mozscape('mozscape-400537c3d8','a64ab632e16eaeb5a6673a5290d81aab');

function sleep(delay) 
{
        var start = new Date().getTime();
        while (new Date().getTime() < start + delay);
}

var lineReader = require('readline').createInterface({
  input: require('fs').createReadStream('am.txt')
});

lineReader.on('line', function (line) {
	moz.urlMetrics(line , ['url', 'links','mozRank','upa'], function(err, res) {
    if (err) {
        console.log(err);
        return;
    }

    console.log(res);
	sleep(10000);
	
	});
  
});
