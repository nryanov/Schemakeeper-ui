import {schemaTextToJson, schemaTextToJsonNotEscaped, isSchemaValid} from '../../schema-registry/utils/AvroUtils'

describe("AvroUtils specs", () => {
    it("isSchemaValid should return true ", () => {
        expect(isSchemaValid("\"int\""))
    });

    it("isSchemaValid should return false ", () => {
        expect(!isSchemaValid("not valid schema"))
    });

    it("schemaTextToJson", () => {
        expect(schemaTextToJson("\"int\"")).toEqual("\"int\"")
    });

    it("schemaTextToJsonNotEscaped", () => {
        expect(schemaTextToJsonNotEscaped("\"int\"")).toEqual("int")
    });
});