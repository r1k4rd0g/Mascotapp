import { capitalizeWords } from "../utils/capitalizeWords.js";

export const applyCapitalize = (schema, fields) => {
    schema.pre('save', function(next) {
        fields.forEach(field => {
            if (this[field]) {
                this[field] = capitalizeWords(this[field]);
            }
        });
        next();
    });
}