const AuditLog = require('../models/Audit');
const JSum = require('jsum');

function hash(string) {
    return JSum.digest(string, 'SHA256', 'hex');
}

// better one
const compareObjects = (oldObj, newObj, parentField = '') => {
    let changes = [];

    for (const key in newObj) {
        if (key == '$set' || key == '$setOnInsert') {
            continue;
        }

        const fieldPath = parentField ? `${parentField} -> ${key}` : key;

        if (typeof newObj[key] === 'object' && newObj[key] !== null && typeof oldObj[key] === 'object' && oldObj[key] !== null) {
            const nestedChanges = compareObjects(oldObj[key], newObj[key], fieldPath);
            changes.push(...nestedChanges);

        } else if (newObj[key] !== oldObj[key]) {
            changes.push({
                field: fieldPath,
                oldValue: oldObj[key],
                newValue: newObj[key],
            });
        }
    }

    return changes;
};

// Create a middleware for tracking changes
module.exports.auditMiddleware = function (schema, options) {
    schema.pre('findOneAndUpdate', async function (next) {
        // older doc
        const docToUpdate = await this.model.findOne(this.getQuery());
        const originalDoc = docToUpdate.toObject();
        const updatedDoc = this.getUpdate();

        // Compare the original and updated documents to find changes
        let changes = [];

        for (const path in updatedDoc) {
            if (path == '$set' || path == '$setOnInsert') {
                continue;
            }

            if (originalDoc[path] === null) // $set value is undefined for ogDoc
                originalDoc[path] = null;

            if (originalDoc[path] === undefined) // $set value is undefined for ogDoc
                originalDoc[path] = null;

            //checksums
            let ogCheck = hash(JSON.stringify(originalDoc[path], "", 2));
            let newCheck = hash(JSON.stringify(updatedDoc[path], "", 2));

            if (newCheck !== ogCheck) {
                console.log(path, originalDoc[path], updatedDoc[path]);
                if (typeof updatedDoc[path] === 'object')
                    changes = compareObjects(originalDoc[path], updatedDoc[path], path);
                else {
                    changes.push({
                        field: path,
                        oldValue: originalDoc[path],
                        newValue: updatedDoc[path],
                    });
                }
            }
        }

        if (changes.length === 0) {
            return;
        }

        // Create an audit log entry if there's any changes
        const auditLog = new AuditLog({
            timestamp: new Date(),
            user: originalDoc.customer_id,
            updates: this.model.modelName,
            changes: changes,
        });
        await auditLog.save();
    });
};