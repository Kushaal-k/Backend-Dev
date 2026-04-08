const mongoose = require("mongoose");

const softDeletePlugin = (schema) => {
    schema.add({
        isDeleted: { type: Boolean, default: false },
        deletedAt: { type: Date, default: null }
    });

    schema.methods.softDelete = function () {
        this.isDeleted = true;
        this.deletedAt = new Date();
        return this.save();
    };

    schema.pre(/^find/, function (next) {
        this.where({ isDeleted: false });
        next();
    });

    schema.pre("findOneAndDelete", async function (next) {
        const doc = await this.model.findOne(this.getFilter());
        if (doc) {
            doc.isDeleted = true;
            doc.deletedAt = new Date();
            await doc.save();
        }
        next();
    });

    schema.pre("deleteOne", { document: true, query: false }, async function (next) {
        this.isDeleted = true;
        this.deletedAt = new Date();
        await this.save();
        next();
    });
};

module.exports = softDeletePlugin;