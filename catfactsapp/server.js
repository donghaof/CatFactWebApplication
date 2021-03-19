let express = require('express');
let app = express();

app.set('view engine', 'ejs'); // All .ejs pages must be inside /views directory.
app.use(express.static(__dirname + '/public')); // Set static dir with css/javascript/images
// static resources. __dirname here means full path to /public directory where all 
// static resources are located.

app.use(require('./routes/index'));  // In this application we have only 1 index
// router.

// Run server on port 4000.
app.listen(4000, () => console.log('Listening on port 4000...'));
