const express = require('express');

const router = express.Router();

router.use(express.json())


// Access Models to store data-------------------
const actModel = require('../data/helpers/actionModel');
const projModel = require('../data/helpers/projectModel');



// CRUD endpoints -------------------------------

router.get('/', (req, res) => {
    const id = req.params.id
    projModel.get(id)
        .then(found => {
            res.status(200).json(found)
        })
        .catch(() => {
            res.status(500).json({ message: "There was an error getting the projects." })
        })
});

router.post('/', (req, res) => {
    const projBody = req.body
    projModel.insert(projBody)
        .then(createProj => {
            res.status(200).json(createProj)
        })
        .catch(() => {
            res.status(500).json({ message: "There was an error creating that project." })
        })
});

router.delete('/:id', (req, res) => {
    const id = req.params.insert
    projModel.remove(id)
        .then(deletedProj => {
            res.status(200).json({ message: `The project with id: ${id} was deleted`, deletedProj })
        })
        .catch((error) => {
            res.status(500).json({ message: "There was an error deleting the project.", error })
        })

});






// Export router --------------------------------
module.exports = router;