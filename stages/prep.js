module.exports = function(grunt) {

	var clean = {
		stage : ["build/"]
	}

	var copy = {
		stage : {
			files : [{
				src : ["**", ".htaccess"]
				,cwd : "temp/bundle/"
				,dest : "build/"
				,expand : true
			}]
		}
	}

	grunt.addConfig("copy", copy);
	grunt.addConfig("clean", clean);

	grunt.registerTask("stage", [
		"clean:stage"
		,"copy:stage"
	]);
};