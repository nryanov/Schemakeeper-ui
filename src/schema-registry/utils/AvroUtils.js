import {parse} from 'avro-js'

const parseSchemaText = (schemaText) => {
    return parse(JSON.stringify(schemaText));
};

// eslint-disable-next-line no-unused-vars
const schemaToEscapedString = (schema) => {
    return JSON.stringify(schema.getSchema())
};

export const schemaTextToJson = (schemaText) => {
    return JSON.stringify(JSON.parse(schemaText), null, 2)
};

export const schemaTextToJsonNotEscaped = (schemaText) => {
    return JSON.parse(schemaText)
};

export const isSchemaValid = (schemaText) => {
    try {
        parseSchemaText(schemaText);
        return true;
    } catch (e) {
        return false;
    }
};
