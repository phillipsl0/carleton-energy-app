How we got these data into a useable format:

	• Downloaded a data dump CSV file from Lucid 
	
	• Removed top 3 rows (redundant names of buildings/meters)

	• TRANSPOSED COLUMNS & ROWS using excel

	• Converted CSV to JSON (see directions below)

	• Made JSON output into one large array and
		exported that array in the “JanData.js” file


==================== CSV -> JSON ==============================

Installation
$ npm i -g csvtojson

Usage
$ csvtojson [options] <csv file path>

Example (Convert csv file and save result to json file):

$ csvtojson source.csv > converted.json


===============================================================