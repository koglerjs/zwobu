module.exports = function(grunt) {

	var clean = {
		pull : ["temp/"]
	}

	var dest = "temp/"
	var copy = {
		js : {
			files : [{
				src : [
					"js/core/**/*.js"
					,"js/lib/**/*.js"
					,"app/js/**/*.js"
					,"app/manifest.js"
				]
				,dest : dest
			}]
		}
		,css : {
			files: [{
				src: [
					"css/core/**/*"
					,"app/css/**/*"
				]
				,dest : dest
			}]
		}
		,tpl : {
			files : [{
				src : "app/tpl/**/*.tpl"
				,dest : dest
			}]
		}
		,rsrc : {
			files : [{
				src : "app/rsrc/**/*.md"
				,dest : dest
			}]
		}
		,img : {
			files : [{
				src : "app/img/**"
				,dest : dest
			}]
		}
		,index : {
			files : [{
				src : "app/index.html"
				,dest : dest
			}]
		}
		,htaccess : {
			files : [{
				src : ".htaccess"
				,dest : "temp/"
			}]
		}
	};

	grunt.addConfig("clean", clean);
	grunt.addConfig("copy", copy);

	grunt.registerTask("pull", [
		"clean:pull"
		,"copy:js"
		,"copy:css"
		,"copy:tpl"
		,"copy:rsrc"
		,"copy:img"
		,"copy:index"
		,"copy:htaccess"
	]);
};