
	In this project I used the following tools:
	-- NodeJS (to run http server and deploy catfactsapp)
	-- npm (package manager to add required libraries)
	-- axious (library to make a request to API and obtain elements in JSON format)
	-- ejs (library to create .ejs page instead of .html to display passed elements obtained from API)
	-- express (library to configure routes when user loads the application ('/'), or clicks on the specific page ('/?page=2'))
	-- nightwatch (test library to test the application)
	-- geckodriver (driver for selenium server to run test on Firefox browser)
	-- selenium-server (server to deploy catfactsapp and run test)
	
	To run the application you need the following command:
	npm install
	npm start
	Then you need to open http://localhost:4000/ in the browser.
	
	To test the application you need the following command (make sure server is running!):
	npm test
	
	The flow is the following:
	When you run 'npm install' command, npm searches for the required dependencies in 
	package.json file and creates node_modules folder. After that, when you run 'npm start',
	npm searches for the 'start' coommand ('node server'), and runs server using server.js
	file on port 4000.
	When you open browser and access http://localhost:4000/, server searches for the route
	(because we used express library) inside ./routes/index file (see server.js). Once found, 
	it searches for the GET request (see router.get('/'... in /routes/index.js). Once found, 
	it uses axious library to get JSON data from API, configure them to display only 2 items
	per page (see const maxItemsPerPage = 2, it can be changed if you want, but then please 
	change tests/test.js as well to avoid failing test), and finally returns data back to the
	browser (views/index.ejs file) with 2 parameters as a little JSON object: {data: data, numPages: numPages}. Since
	we use ejs library, we can easy access them using scriptlet <%= %>.
	When you click on '1', or '2', ... page (pagination), then this get request is also intercepts by 
	index.js (router.get), yet in this case parameter 'page' is defined and 'data' array is filtered
	by appropriate way to display only desired pages.
	
	Folder 'public' contains static resources, such that javascript files (not used), images (not used), 
	and style sheets (used). Please see server.js file to understand how this folder can be found through
	express library.
	