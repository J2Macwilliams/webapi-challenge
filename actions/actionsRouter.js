const express = require('express');

const router = express.Router();

router.use(express.json())


// Access Models to store data-------------------
const actDB = require('../data/helpers/actionModel');


// CRUD endpoints -------------------------------

router.get('/', (req, res) => {
    const id = req.params.id
    actDB.get(id)
        .then(found => {
            res.status(200).json(found)
        })
        .catch(() => {
            res.status(500).json({ message: "Error gathering actions." })
        })

});

router.post('/', validateId, (req, res) => {
    const actBody = req.body
    actDB.insert(actBody)
        .then(createAct => {
            res.status(200).json(createAct)
        })
        .catch(() => {
            res.status(500).json({ message: "There was an error creating that action." })
        })
});

router.delete('/:id', (req, res) => {
    const id = req.params.id
    actDB.remove(id)
        .then(deletedAction => {
            res.status(200).json({ message: `The action with id: ${id} was deleted`, deletedAction })
        })
        .catch((error) => {
            res.status(500).json({ message: "There was an error deleting the action.", error })
        })

});

router.put('/:id', validateId, (req, res) => {
    const id = req.params.id
    const creAct = req.body
    if (!creAct.description || !creAct.notes) {
        res.status(400).json({ message: "Please provide update" })
    } else {
        actDB.update(id, creAct)
            .then(updateAction => {
                res.status(200).json({ message: "Updated with", action: `${creAct.description} ${creAct.notes}` })
            })
            .catch((error) => {
                res.status(500).json({ message: "There was an error with the update.", error })
            })
    }


});

// custom middleware
function validateId(req, res, next) {
    const project_id = req.params.id
    if ( project_id>= 3) {
        res.status(404).json({ errorMessage: "There is no id with that in the database" })
    } else {
        next();
    }
}


// Export router --------------------------------
module.exports = router;