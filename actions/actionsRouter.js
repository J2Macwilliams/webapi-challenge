const express = require('express');

const router = express.Router();

router.use(express.json())


// Access Models to store data-------------------
const actModel = require('../data/helpers/actionModel');
const projModel = require('../data/helpers/projectModel');



// CRUD endpoints -------------------------------

router.get('/', (req, res) => {
    const id = req.params.id
    actModel.get(id)
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

router.delete('/:id', (req, res) => {
    const id = req.params.insert
    actModel.remove(id)
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
        actModel.update(id, creAct)
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
    const id = req.params.id
    if (id >= 3) {
        res.status(404).json({ errorMessage: "There is no id with that in the database" })
    } else {
        res.status(200).json({ message: "The id is good" })
    }
    next();
}


// Export router --------------------------------
module.exports = router;