const mongoose = require('mongoose')

const PermissionSchema = new mongoose.Schema({
    role: { type: String, require: true },
    name: { type: String, require: true },
    code: { type: String, require: false, default: '' },
    status: { type: Boolean, require: false, default: true }
}, { timestamps: true })

module.exports = mongoose.model('Permission', PermissionSchema)