module.exports = function(grunt) {
	var dest = "temp/"
	
	var jshint = {
		run : {
			src : "temp/app/**/*.js"
		}
	}

	//Order core files.
	var files = [];
	[
		"jquery"
		,"underscore"
		,"backbone"
	]
	.forEach(function(f) {
		files.push("temp/js/core/"+ f + "*.js");
	});

	//library files
	files.push("temp/js/lib/**/*.js");

	//application files
	//(naive alphabetical!)
	files.push("temp/app/js/**/*.js");

	//Process templates
	var htmlmin = {
		run : {
			options: {                                 
				removeComments: true
				,collapseWhitespace: true
				,removeEmptyAttributes: true
				,removeRedundantAttributes: true
				,removeAttributeQuotes : true
				,collapseBooleanAttributes : true
			}
			,files : [{
				expand : true
				,src : "temp/app/tpl/**/*.tpl"
				,dest : ""
			}]
		}
	}


	var dum_tpl = {
		run : {
			options : {
				varName : "kogs.tpl"
				,notGlobal : true
			}
			,files : [{
				src : "temp/app/tpl/**/*.tpl"
				,dest : "temp/app/tpl/tpls.js"
			}]
		}
	} 

	files.push("temp/app/tpl/tpls.js");

	var concat = {
		javascript : {
			src : files
			,dest : "temp/main.js"
		}
	};


	grunt.addConfig("htmlmin", htmlmin);
	grunt.addConfig("dum_tpl", dum_tpl);
	grunt.addConfig("jshint", jshint);
	grunt.addConfig("concat", concat);
	
	
	grunt.registerTask("javascript", [
		"htmlmin:run"
		,"dum_tpl:run"
		,"concat:javascript"
	]);
};