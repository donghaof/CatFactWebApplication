// Simple Nightwatch test to make sure at least 2 elements have been loaded
// to the page.
module.exports = {
    'Demo test catfactsapp': function (browser) {
        browser
                .url('http://localhost:4000/') // Call application (assuming server already running).
                .waitForElementVisible('body') // Wait until <body> is loaded.
                .assert.titleContains('Cat Facts') // Check title.
                .assert.visible('table') // Check <table>.
                .assert.visible('tbody') // Check <tbody>.
                .elements('css selector', 'table tbody tr', function (result) { // Access table rows where
            // 'result' means number of actual rows loaded.
                    this.assert.equal(result.value.length, 2); // 2 is the constant from routes/index.js
                })
                .end();
    }
};