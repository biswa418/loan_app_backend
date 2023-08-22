const AuditLog = require('../models/Audit');

// Create a middleware for tracking changes
module.exports.auditMiddleware = function (schema, options) {
    schema.pre('findOneAndUpdate', async function () {
        const docToUpdate = await this.model.findOne(this.getQuery());

        console.log(docToUpdate);

        const modifiedPaths = this.modifiedPaths();
        const changes = modifiedPaths.map(path => ({
            field: path,
            oldValue: docToUpdate[path],
            newValue: this.getUpdate()[path],
        }));

        console.log(changes);

        // Create an audit log entry
        const auditLog = new AuditLog({
            timestamp: new Date(),
            user: 'user_id',
            changes: changes,
        });
        await auditLog.save();
    });
};