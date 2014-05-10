module.exports = function(grunt) {
	
	var concat = {
		css : {
			files : [{
				src : ["temp/css/core/**/*", "temp/app/css/**/*"]
				,dest : "temp/css/preless.txt"
			}]
		}
		,wrapcss : {
			files : [{
				src : "temp/index.css"
				,dest : "temp/css.js"
			}]
			,options : {
				process : function(src, filepath) {
					src = src.replace(/"/g, '\\\"').replace(/\n/g, "\\n") 
					return '"' + src + '"';
				}
				,banner : "(function(){kogs.css="
				,footer : ";})();"
				,separator: ","
			}
		}
	};

	var less = {
		run : {
			src : "temp/css/preless.txt"
			,dest : "temp/index.css"
		}
	};

	var cssmin = {
		run : {
			src : "temp/index.css"
			,dest : "temp/index.css"
		}
	}
	
	grunt.addConfig("concat", concat);
	grunt.addConfig("less", less);
	grunt.addConfig("cssmin", cssmin);

	grunt.registerTask("css", [
		"concat:css"
		,"less:run"
		,"cssmin:run"
		,"concat:wrapcss"
	]);
};