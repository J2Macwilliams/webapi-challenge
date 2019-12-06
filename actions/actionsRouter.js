const express = require('express');

const router = express.Router();

router.use(express.json())


// Access Models to store data-------------------
const actDB = require('../data/helpers/actionModel');


// CRUD endpoints -------------------------------

router.get('/', (req, res) => {
    actDB.get()
        .then(found => {
            res.status(200).json(found)
        })
        .catch(() => {
            res.status(500).json({ message: "Error gathering actions." })
        })

});

router.get('/:id', (req, res) => {
    const id = req.params.id

    if (id) {
        actDB.get(id)
            .then(found => {
                res.status(200).json(found)
            })
            .catch(() => {
                res.status(500).json({ message: "Error gathering actions." })
            })
    } else {
        res.status(404).json({ message: "There was no  action for the id" })
    }


});

router.post('/', validateProjectId, validatePost, (req, res) => {
    const actBody = req.body

    actDB.insert(actBody)
        .then(createAct => {
            res.status(200).json(createAct)
        })
        .catch(() => {
            res.status(500).json({ message: "There was an error creating that action." })
        })
});

router.delete('/:id', validateProjectId, (req, res) => {
    const id = req.params.id

    actDB.get(id)
        .then(deletedAction => {
            actDB.remove(id, deletedAction)
                .then(gone => {
                    res.status(200).json({ message: `The action with id: ${id} was deleted`, deletedAction })
                })
                .catch((error) => {
                    res.status(500).json({ message: "There was an error deleting the action.", error })
                })
        })
        .catch((error) => {
            res.status(500).json({ message: "Deleting that action...Not Happening!" })
        })

});

router.put('/:id', validateProjectId, (req, res) => {
    const id = req.params.id
    const creAct = req.body
    if (!creAct.description || !creAct.notes) {
        res.status(400).json({ message: "Please provide update" })
    } else {
        actDB.update(id, creAct)
            .then(updateAction => {
                res.status(200).json({ message: "Updated with", id: `${id}`, project_id: `${creAct.project_id}`, description: `${creAct.description}`, notes: `${creAct.notes}` })
            })
            .catch((error) => {
                res.status(500).json({ message: "There was an error with the update.", error })
            })
    }

});

// custom middleware
function validateProjectId(req, res, next) {
    const project_id = req.params.id
    actDB.get(project_id)
        .then(found => {
            if (!found) {
                res.status(404).json({ errorMessage: "There is no id with that in the database" })
            } else {
                next();
            }
        })
        .catch((error) => {
            res.status(500).json({ message: "There was an error accessing that project id.", error })
        })


}

function validatePost(req, res, next) {
    const actionInfo = req.body
    if (!actionInfo.description && !actionInfo.notes) {
        res.status(404).json({ message: "Missing action information" })
    } else {
        next();
    }
}

// Export router --------------------------------
module.exports = router;