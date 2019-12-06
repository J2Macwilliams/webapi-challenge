const express = require('express');

const router = express.Router();

router.use(express.json())


// Access Models to store data-------------------
const actModel = require('../data/helpers/actionModel');
const projModel = require('../data/helpers/projectModel');



// CRUD endpoints -------------------------------

router.get('/', (req, res) => {
    
});





// Export router --------------------------------
module.exports = router;