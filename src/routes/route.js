const express = require('express')
const router = express.Router()
const controller = require('../controller/formController')

router.post('/form/create', controller.createForm );
router.get('/', controller.getForm );
router.get('/form/:id', controller.getFormById );
router.put('/form/:id/edit', controller.updateForm );
router.delete('/deleteForm/:id', controller.deleteForm );

// global route>>>>>>>>>>
router.all("*", function (req, res) {
    res.status(400).send({
        status: false,
        msg: "please enter valid api"
    })
})

module.exports = router