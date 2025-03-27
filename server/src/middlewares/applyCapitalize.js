import { capitalizeWords } from "../utils/capitalizeWords.js";

export const applyCapitalizeMongoDB = (schema, fields) => {
    schema.pre('save', function (next) {
        fields.forEach(field => {
            if (this[field]) {
                this[field] = capitalizeWords(this[field]);
            }
        });
        next();
    });
}

export const applyCapitalizeSQL = (model, fields) => {
    model.addHook("beforeCreate", (instance) => {
        fields.forEach((field) => {
            if (instance[field]) {
                instance[field] = instance[field]
                    .toLowerCase()
                    .split(" ")
                    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                    .join(" ");
            }
        });
    });
    model.addHook("beforeUpdate", (instance) => {
        fields.forEach((field) => {
            if (instance.changed(field)) {
                instance.set(field, instance[field]
                    .toLowerCase()
                    .split(" ")
                    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                    .join(" "));
            }
        });
    });
};