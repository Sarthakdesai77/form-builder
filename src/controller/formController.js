const formModel = require('../models/formModel')

const createForm = async function (req, res) {
    try {
        let data = req.body
        let { title, details } = data

        if (!title) return res.status(400).send({ status: false, message: 'Please enter title name' })
        if (!details) return res.status(400).send({ status: false, message: 'Please enter details' })

        let formData = await formModel.create(data)
        res.status(201).send({ status: true, message: "Success", data: formData })

    } catch (err) {
        return res.status(500).send({ status: false, message: err.message })
    }
}

const getForm = async (req, res) => {
    try {
        let form = await formModel.find({ isDeleted: false });
        if (form.length == 0) return res.status(404).send({ status: false, message: 'no forms found' });
        res.status(200).send({ status: true, message: 'success', data: form });

    } catch (err) {
        return res.status(500).send({ status: false, message: err.message })
    }
}

const getFormById = async (req, res) => {
    try {
        let id = req.params.id;
        
        let form = await formModel.findOne({ _id: id, isDeleted: false });
        if (!form) return res.status(404).send({ status: false, message: 'no forms found' });

        res.status(200).send({ status: true, message: 'success', data: form });

    } catch (err) {
        return res.status(500).send({ status: false, message: err.message })
    }
}

const updateForm = async (req, res) => {
    try {
        let id = req.params.id;
        let body = req.body;
        let { title, details } = body;

        let form = await formModel.findOne({ _id: id, isDeleted: false });
        if (!form) return res.status(404).send({ status: false, message: "no form found" });

        if (title) form.title = title;
        if (details) form.details = details;

        let updatedForm = await formModel.findOneAndUpdate({ _id: id }, form, { new: true });

        res.status(200).send({ status: true, message: 'success', data: updatedForm });

    } catch (err) {
        return res.status(500).send({ status: false, message: err.message })
    }
}

const deleteForm = async (req, res) => {
    try {
        let id = req.params.id;

        let form = await formModel.findOne({ _id: id, isDeleted: false });
        if (!form) return res.status(404).send({ status: false, message: "no form found" });

        await formModel.findOneAndUpdate({ _id: id }, { isDeleted: true });

        res.status(204).send({ status: true, message: 'successfully deleted' });

    } catch (err) {
        return res.status(500).send({ status: false, message: err.message })
    }
}

module.exports = { createForm, getForm, updateForm, getFormById, deleteForm };