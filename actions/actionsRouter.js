const express = require('express');

const router = express.Router();

router.use(express.json())


// Access Models to store data-------------------
const actModel = require('../data/helpers/actionModel');
const projModel = require('../data/helpers/projectModel');



// CRUD endpoints -------------------------------

router.get('/', (req, res) => {
    actModel.get(req.query)
        .then(found => {
            res.status(200).json(found)
        })
        .catch(() => {
            res.status(500).json({ message: "Error gathering actions." })
        })

});

router.post('/', validateId, (req, res) => {
    const actBody = req.body
    actModel.insert(actBody)
        .then(createAct => {
            res.status(200).json(createAct)
        })
        .catch(() => {
            res.status(500).json({ message: "There was an error creating that action." })
        })
});

// custom middleware
function validateId(req, res, next) {
    const id = req.params.id
    if (id >= 3) {
        res.status(404).json({ errorMessage: "There is no id with that in the database" })
    } else {
        actModel.getById(id)
            .then(found => {
                res.status(200).json(found)
            })
            .catch(() => {
                res.status(500).json({ message: "There was an error with that id." })
            })
    }
    next();
}


// Export router --------------------------------
module.exports = router;