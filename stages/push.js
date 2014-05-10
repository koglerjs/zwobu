module.exports = function(grunt) {

	var secrets = grunt.file.readJSON('nosecretsongithub');
	var s3 = {
		options : {

		}
		,run : {

		}
	}

	var sftp = {
		run : {
			
		}
	}

	grunt.addConfig("s3", s3);
	grunt.addConfig("sftp", sftp);

	grunt.registerTask("push", [
		"s3:run", "sftp:run"
	]);
};