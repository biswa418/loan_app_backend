const AuditLog = require('../models/Audit');
const JSum = require('jsum');

function hash(string) {
    return JSum.digest(string, 'SHA256', 'hex');
}

// function stringify

// Create a middleware for tracking changes
module.exports.auditMiddleware = function (schema, options) {
    schema.pre('findOneAndUpdate', async function (next) {
        // older doc
        const docToUpdate = await this.model.findOne(this.getQuery());
        const originalDoc = docToUpdate.toObject();

        // Compare the original and updated documents to find changes
        const changes = [];

        for (const path in this.getUpdate()) {
            if (path == '$set' || path == '$setOnInsert')
                continue;

            if (originalDoc[path] === null) // $set value is undefined for ogDoc
                originalDoc[path] = null;

            if (originalDoc[path] === undefined) // $set value is undefined for ogDoc
                originalDoc[path] = null;

            //checksums
            let ogCheck = hash(JSON.stringify(originalDoc[path], "", 2));
            let newCheck = hash(JSON.stringify(this.getUpdate()[path], "", 2));

            if (newCheck !== ogCheck) {
                console.log(path, originalDoc[path], this.getUpdate()[path], ogCheck, newCheck, ogCheck == newCheck);
                changes.push({
                    field: path,
                    oldValue: originalDoc[path],
                    newValue: this.getUpdate()[path],
                });
            }
        }

        if (changes.length === 0) {
            next();
        }

        // Create an audit log entry
        const auditLog = new AuditLog({
            timestamp: new Date(),
            user: originalDoc.customer_id,
            changes: changes,
        });
        await auditLog.save();
    });
};