const mongoose = require('mongoose');

const auditSchema = new mongoose.Schema({
    timestamp: Date,
    user: { type: String, ref: 'User' },
    updates: String,
    changes: mongoose.Schema.Types.Mixed,
}, {
    timestamps: true
});


const Audit = mongoose.model('Audit', auditSchema);
module.exports = Audit;