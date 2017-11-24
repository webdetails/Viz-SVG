# Viz-SVG

This project holds a set of visualizations created to illustrate Viz-API potentialities in conjunction with SVG images. This pair allows you to create very specific visualizations, using SVG images, that will be available on Pentaho Analyzer, CTools and Pentaho Data Integration (DET).

Use this project to explore these visualizations, by installing the related plugin over Pentaho Marketplace (versions 7.1 and 8.0), or as a reference to create your own custom visualizations.

## How to create new visualizations (or to deploy the current ones)

Viz-SVG is essentially using [Pentaho Viz-API](https://help.pentaho.com/Documentation/8.0/Developer_Center/JavaScript_API/platform/pentaho.visual.html) basic concepts to delivery his visualizations. 

Summarized, visualizations are composed of:

* a generic model, that all new visualizations extend (javascript file)
* a config file to register current available visualizations (js file)
* a view to implement the SVG rendering (js file)
* and, a specific model, representing the visualization, that extends the generic model and implements the actual visualizaion logic.

To create a new visualization one must:

* get an SVG that represents the needed visualization (paint the SVG elements that you will change in gray, or another neutral color, to create the change perception)
* create a model with the business logic used to change the SVG
* and, register the new model on config.js

New visualizations are materialized on .kar files that will be deployed on your Pentaho BA server, or on your Pentaho Data Integration. 
Manually, this deploy is done by simply copy your .kar to pentaho-solutions\system\karaf\deploy (BA server), or data-integration\system\karaf\deploy (Data Integration), but you can also make your visualizations available over Pentaho Marketplace (the same way we made Viz-API).

### How to build  your own visualization using Viz-API project 

A good way to leverage this powerful visualization technology within Pentaho is to start your own project based on Viz-API (either by forkingit, or by creating a similar project structure, with all the essential files). 

The project structure is composed of two main directories:

* svg-sandbox - holds the files that represent the development phase of each new visualizatio (improves significantly the process because you don't need to create the .kar)
* svg-bandle - a maven folder structure to produce the .kar file that will be 


