const express = require('express');

const router = express.Router();

router.use(express.json())


// Access Models to store data-------------------
const projDB = require('../data/helpers/projectModel');



// CRUD endpoints -------------------------------

router.get('/', (req, res) => {
    const id = req.params.id
    projDB.get(id)
        .then(found => {
            res.status(200).json(found)
        })
        .catch(() => {
            res.status(500).json({ message: "There was an error getting the projects." })
        })
});

router.post('/',  (req, res) => {
    const projBody = req.body
    projDB.insert(projBody)
        .then(createProj => {
            res.status(200).json(createProj)
        })
        .catch(() => {
            res.status(500).json({ message: "There was an error creating that project." })
        })
});

router.delete('/:id', (req, res) => {
    const id = req.params.id
    projDB.remove(id)
        .then(deletedProj => {
            res.status(200).json({ message: `The project with id: ${id} was deleted`, deletedProj })
        })
        .catch((error) => {
            res.status(500).json({ message: "There was an error deleting the project.", error })
        })

});

router.put('/:id', (req, res) => {
    const id = req.params.id
    const creProj = req.body
    if (!creProj.description || !creProj.notes) {
        res.status(400).json({ message: "Please provide update" })
    } else {
        projDB.update(id, creProj)
            .then(updateAction => {
                res.status(200).json({ message: "Updated with", action: `${creProj.description} ${creProj.notes}` })
            })
            .catch((error) => {
                res.status(500).json({ message: "There was an error with the update.", error })
            })
    }


});



// Export router --------------------------------
module.exports = router;