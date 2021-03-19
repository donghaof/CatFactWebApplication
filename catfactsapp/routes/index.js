var express = require('express');
var router = express.Router();
let axios = require('axios'); // Required to make a request to API.

// Set time frame within which JSON data should be loaded.
axios.defaults.timeout = 5000;

const maxItemsPerPage = 2; // Constant to indicate maximum number of shown items
// per page.

// This triggers when the user loads applicaton using http://localhost:4000/.
router.get('/', function (req, res, next) {

    // Connect to API using axios library.
    axios.get('https://cat-fact.herokuapp.com/facts/').then(response => {
        let data = response.data; // Get and store json objects as the array.
        let numItems = data.length; // Number of items equals to the length of 
        // returned array.

        let numPages = 0; // Initially assume the number of pages is 0 if
        // only 1 page is needed.

        if (numItems > maxItemsPerPage) { // Add pagination only if it is required.
            numPages = Math.ceil(data.length / maxItemsPerPage); // Calculate number of pages.

            // If parameter 'page' is not defined.
            if (req.query.page === undefined) {
                
                // Just display only first maxItemsPerPage items (i.e., 0 through 3 exclusive).
                data = data.filter((item, idx) => idx < maxItemsPerPage);
                
                // If 'page' is defined (when user clicks on '1', or '2' and so on).
            } else {
                
                // Calculate upper (exclusive) index.
                let upperIdx = req.query.page * maxItemsPerPage;
                
                // Calcuate lower (incluse) index.
                let lowerIdx = upperIdx - maxItemsPerPage;
                
                // Filter array to get subarray only with required items from
                // lower to upper index.
                data = data.filter((item, idx) => idx >= lowerIdx && idx < upperIdx);
            }
        }
        
        // Pass to view only array of data and number of pages for pagination
        // (0 if only 2 items found, so no pagination required).
        res.render('index', {data: data, numPages: numPages});
    });

});

module.exports = router;
