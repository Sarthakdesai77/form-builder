const express = require('express')
const router = express.Router()
const controller = require('../controller/formController')

router.post('/createForm', controller.createForm );
router.get('/getForm', controller.getForm );
router.put('/updateForm/:id', controller.updateForm );
router.delete('/deleteForm/:id', controller.deleteForm );

// global route>>>>>>>>>>
router.all("*", function (req, res) {
    res.status(400).send({
        status: false,
        msg: "please enter valid api"
    })
})

module.exports = router