# Viz-SVG

This project holds a set of visualizations created to illustrate Viz-API potentialities in conjunction with SVG images. This pair allows you to create very specific visualizations, using SVG images, that will be available on Pentaho Analyzer, CTools and Pentaho Data Integration (DET).

Use this project to explore these visualizations, by installing the related plugin over Pentaho Marketplace (versions 7.1 and 8.0), or as a reference to create your own custom visualizations.

## How to create new visualizations (or to deploy the current ones)

Viz-SVG is essentially using [Pentaho Viz-API](https://help.pentaho.com/Documentation/8.0/Developer_Center/JavaScript_API/platform/pentaho.visual.html) basic concepts to delivery his visualizations. 

Summarized, visualizations are composed of:

* a generic model, that all new visualizations extend (javascript file)
* a config file to register current available visualizations (js file)
* a view to control the SVG rendering (js file)
* and, a specific model (js file), representing the visualization, that extends the generic model and implements the actual visualizaion logic.

To create a new visualization one must:

* get an SVG that represents the needed visualization (paint the SVG elements that you will change in gray, or another neutral color, to create the change perception)
* create a model with the business logic used to change the SVG
* and, register the new model on config.js

New visualizations are materialized on .kar files that will be deployed on your Pentaho BA server, or on your Pentaho Data Integration. 
Manually, this deploy is done by simply copy your .kar to _..\pentaho-solutions\system\karaf\deploy_ (BA server), or _data-integration\system\karaf\deploy_ (Data Integration), but you can also make your visualizations available over Pentaho Marketplace (the same way we made with Viz-SVG).

### How to build  your own visualization using Viz-SVG project 

**Attention:** due to changes on Pentaho Viz-API from 7.1 to 8.0 the project has two branchs: **master** has code related with 8.0 Pentaho Verison, and branch **7.1** should be used for visualizations on that Pentaho version. Choose your branch before starting.  

A good way to leverage this powerful visualization technology within Pentaho is to start your own project based on Viz-SVG (either by forking it, or by creating a similar project structure, with all the essential files). 

The project structure is composed of two main directories:

* **svg-sandbox** - holds the files that represent the development phase of each new visualization (which improves significantly the process because you don't need to create the .kar)
	* backbone files (those that you don't need to change)
		* modelGeneric.js
		* view-svg.js
	* files to update
		* config.js - to register your new visualization
		* index.html - used to check the current development state. update to reflect the visualization that you are working on (reference to model and data source used)
	* files to add
		* .json file with some fake data to feed your visualization
		* .svg file that will make your visualization
		* your .js model file (use one available has reference) - here is where you will transform your business data into SVG changing elements

* **svg-bundle** - a maven folder structure to produce the .kar file that will be deployed on Pentaho

### Development

With this folder structure, the development process can be summarized in the following steps: 

* you will start by [prepare your environment to develop](http://pentaho.github.io/pentaho-platform-plugin-common-ui/platform/visual/samples/bar-d3-sandbox/step1-environment-preparation)
* then you will create your visualization on **svg-sandbox**, making the necessary changes over the **files to update**, **adding the new files**, and testing it using index.html on your browser
* and finally, you will copy your new visualization to your own **svg-bundle** file structure to produce the intended .kar file

### How to build the .kar file

.kar file is created using the svg-bundle folder structure. This folder has already a maven like structure that you can use to generate your .kar. So, you only need to update some files (_config.js_ and _package.json_), remove the visualizations that doesn't make sense for your project (.svg files and .js models), and add the new files from your new visualizations.

The main artefacts that you developed on svg-sandbox should be copied to **svg-bundle/impl/src/main/javascript/web/**:

* your .svg file
* and, your model.js

Besides that you need to:

* register your model on **svg-bundle/impl/src/main/javascript/web/config.js** 
* and, update **svg-bundle/impl/src/main/resources/META-INF/js/package.json**, replacing the models by your new model.

.kar is generated with _mvn package_ command, executed inside **svg-bundle**, and is going to available for future use inside **svg-bundle/assemblies/target**. Copy it to your current Pentaho installation (..\pentaho-solutions\system\karaf\deploy) and test it on Analyzer.



