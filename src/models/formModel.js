const mongoose = require('mongoose');

const formSchema = new mongoose.Schema(
    {
        title: { type: String, required: true, trim: true },

        details: { type: Object },

        isDeleted: { type: Boolean, default: false },

    }, { timestamps: true });

module.exports = mongoose.model('form', formSchema);
