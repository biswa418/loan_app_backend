const mongoose = require('mongoose');

const auditSchema = new mongoose.Schema({
    timestamp: Date,
    user: { type: mongoose.Schema.ObjectId, ref: 'User' },
    changes: mongoose.Schema.Types.Mixed,
}, {
    timestamps: true
});


const Audit = mongoose.model('Audit', auditSchema);
module.exports = Audit;