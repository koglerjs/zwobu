module.exports = function(grunt) {

	//package.json inspection -- external grunt plugins.
	require("load-grunt-tasks")(grunt);

	var config = {};


	//////////////////////
	//Modules need to utilize common tasks (copy or concat) within their
	//own files.  

	//This is done to avoid having to create a massive config for, say, 
	//'copy' mixing concerns of every module.  
	grunt.addConfig = function(task, obj) {
		if(!config[task]) {
			config[task]={};
		}

		for(var key in obj) {
			//I see no reason to ever rely on precedence overwriting.  
			//The task tree should essentially be static regarding environment.
			if(config[task][key]) {
				throw new Error("Naming collision: task " + task + " already has a target " + key + ".");
			}
			//(also, for reasons of sanity, it shouldn't matter what order
			//in which grunt.loadTasks loads files)

			config[task][key] = obj[key];
		}
	}


	//Each task file calls grunt.addConfig.
	grunt.loadTasks("stages");
	//////////
	//The stages are:

	//  -pull.js: pull from application into temp folder

	//  -javascript.js -- build js source.  core, library, app, templates.  convert rsrc to js text.
	//  -css.js -- compile less/css
	//  -bundle.js -- concat main.js, manifest.js into index.js, version index.js
	//  -prep.js: move to build/*, hash index.js for index.html
	//		
	//
	//  -push.js: s3, sftp
	//



	///////////////////////////////
	//Now we link the modules.  

	grunt.registerTask("compile", [
		"pull"
		,"javascript"
		,"css"
	]);

	grunt.registerTask("default", [
		"compile"
		,"bundle:local"
		,"stage"
	]);

	grunt.registerTask("deploy", [
		"compile"
		,"bundle:deploy"
		,"stage"
		,"push"
	]);

	//////////////////////////////////////////////////////////
	//The watch task is above the modules hierarchically.  Its scope 
	//for working with tasks is shared with the linking of modules.
	grunt.addConfig("watch", {
		all : {
			files : ["app/**/*.{js,tpl,css,less,md}"]
			,tasks: ["default"]
		}
	});

	grunt.initConfig(config);
};