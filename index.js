
var AWS = require("aws-sdk");
var fs = require("fs");
var wkhtmltopdf = require("wkhtmltopdf");

var s3 = new AWS.S3();

process.env["PATH"] = process.env["PATH"] + ":" + process.env["LAMBDA_TASK_ROOT"];

exports.handler = function(event, context) {
    console.log(event);
   if (event.url) {
		var filename = Math.random().toString(36).slice(2) + ".pdf";
		var output = "/tmp/" + filename;

		var writeStream = fs.createWriteStream(output);

		wkhtmltopdf(event.url, event.options, function(code, signal) {
            console.log(code);
            console.log(signal);    
			s3.putObject({
				Bucket : event.bucket,
				Key : filename,
				Body : fs.createReadStream(output),
				ContentType : "application/pdf"
			}, function(error, data) {
				if (error != null) {
					context.fail("error: " + error);
				} 
                else {
					var result = {
                        filename : filename
                    };
				    context.succeed(result);
				}
				
			});

		}).pipe(writeStream);
	} 
    else {
		context.fail("unable to render url");
	}
};