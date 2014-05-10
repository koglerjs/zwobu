module.exports = function(grunt) {

	var replace = {
		deploy : {
			options : {
				variables : {
					"cdn" : "https://d3ftq1sg1re24s.cloudfront.net"
				}
				,prefix : "@@@"
			}
			,files : [
				{src:"temp/app/manifest.js", dest : "temp/app/manifest.js"}
				,{src:"temp/app/index.html", dest : "temp/app/index.html"}
			]
		}
		,local : {
			options : {
				variables : {
					"cdn" : ""
				}
				,prefix : "@@@"
			}
			,files : [
				{src:"temp/app/manifest.js", dest : "temp/app/manifest.js"}
				,{src:"temp/app/index.html", dest : "temp/app/index.html"}
			]
		}
	}
	
	var concat = {
		indexjs : {
			files : [{
				src : ["temp/app/manifest.js","temp/main.js", "temp/rsrc.js", "temp/css.js"]
				,dest : "temp/index.js"
			}]
		}
	}

	var ver = {
		js : {
			phases : [{
				files : ["temp/index.js"]
				,references : [
					"temp/app/index.html"
				]
			}]
		}
	}

	var copy = {
		bundle : {
			files : [{
				src : "index*.js"
				,cwd : "temp/"
				,dest : "temp/bundle/"
				,expand: true
			}
			,{
				src : "**"
				,cwd : "temp/app/img/"
				,dest : "temp/bundle/img/"
				,expand : true
			}
			,{
				src : "index.html"
				,cwd : "temp/app/"
				,dest : "temp/bundle/"
				,expand : true
			}
			,{
				src : ".htaccess"
				,cwd : "temp/"
				,dest : "temp/bundle"
				,expand : true
			}
		]}
	}

	var uglify = {
		js : {
			src : "temp/index.js"
			,dest : "temp/index.js"
		}
	}


	grunt.addConfig("replace", replace);
	grunt.addConfig("uglify", uglify);
	grunt.addConfig("concat", concat);
	grunt.addConfig("copy", copy);
	grunt.addConfig("ver", ver);
	

	grunt.registerTask("bundle:deploy",[
		"replace:deploy", "concat:indexjs", "uglify:js", "ver:js", "copy:bundle"
	]);

	grunt.registerTask("bundle:local", [
		"replace:local", "concat:indexjs", "ver:js", "copy:bundle"
	]);
};