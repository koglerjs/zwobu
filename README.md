#Zwobu

This is yet another application template for Grunt.  

However, this one isn't intended to be used (by anyone but me, anyway); it is a demonstration of principles [discussed in my article here](https://koglerjs.com/verbiage/zwobu).

The main feature of this template is the division of the Gruntfile into stages, which can access this function to construct the config instead of being forced to declare or load it wholesale.  

	grunt.addConfig = function(task, obj) {
		if(!config[task]) {
			config[task]={};
		}

		for(var key in obj) {
			if(config[task][key]) {
				throw new Error("Naming collision!";
			}
			config[task][key] = obj[key];
		}
	}

---

The other assumptions of Zwobu:

* It builds an index.html containing a reference to a javascript file.
* That file contains all of the application code, including:
    * The javascript code (clearly)
    * Templates compiled to javascript
    * CSS wrapped to be added to the page on load (processed from LESS)
    * Any other text-based resources

These somewhat bizarre decisions (why not request styles separately?) are considered in that [same article](https://koglerjs.com/verbiage/zwobu).  