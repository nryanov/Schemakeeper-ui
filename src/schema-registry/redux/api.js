import axios from 'axios'

//todo: get from config
const schemaRegistryUrl = "http://192.168.99.100:9081";
// const schemaRegistryUrl = "http://localhost:9081";

axios.defaults.headers.common = {
    ...axios.defaults.headers.common
};

export const subjects = () => axios.get(`${schemaRegistryUrl}/v1/subjects`);
export const subjectMetadata = (subjectName) => axios.get(`${schemaRegistryUrl}/v1/subjects/${subjectName}`);
export const subjectVersions = (subjectName) => axios.get(schemaRegistryUrl + "/v1/subjects/" + subjectName + "/versions");
export const subjectSchemasMetadata = (subjectName) => axios.get(schemaRegistryUrl + "/v1/subjects/" + subjectName + "/schemas");
export const subjectSchemaByVersion = (subjectName, version) => axios.get(schemaRegistryUrl + "/v1/subjects/" + subjectName + "/schemas/" + version);
export const lockSubject = (subjectName) => axios.post(schemaRegistryUrl + "/v1/subjects/" + subjectName + "/lock");
export const unlockSubject = (subjectName) => axios.post(schemaRegistryUrl + "/v1/subjects/" + subjectName + "/unlock");
export const schemaById = (id) => axios.get(schemaRegistryUrl + "/v1/schemas/" + id);
export const schemaIdBySubjectAndSchema = (subjectName, schema) => axios.post(schemaRegistryUrl + "/v1/subjects/" + subjectName + "/schemas/id", {
    schemaText: schema,
    schemaType: "avro"
});
export const deleteSubject = (subjectName) => axios.delete(schemaRegistryUrl + "/v1/subjects/" + subjectName);
export const deleteSubjectSchemaByVersion = (subjectName, version) => axios.delete(schemaRegistryUrl + "/v1/subjects/" + subjectName + "/versions/" + version);
export const checkSubjectSchemaCompatibility = (subjectName, schema) => axios.post(schemaRegistryUrl + "/v1/subjects/" + subjectName + "/compatibility/schemas", {
    schemaText: schema,
    schemaType: "avro"
});
export const updateSubjectCompatibility = (subjectName, compatibilityType) => axios.post(schemaRegistryUrl + "/v1/subjects/" + subjectName + "/compatibility", {
    compatibilityType: compatibilityType
});
export const getSubjectCompatibility = (subjectName) => axios.get(schemaRegistryUrl + "/v1/subjects/" + subjectName + "/compatibility");
export const registerSchema = (schema) => axios.put(schemaRegistryUrl + "/v1/schemas", {
    schemaText: schema,
    schemaType: "avro"
});
export const registerSchemaAndSubject = (subjectName, schema) => axios.put(schemaRegistryUrl + "/v1/subjects/" + subjectName + "/schemas", {
    schemaText: schema,
    schemaType: "avro"
});
export const registerSubject = (subjectName, compatibilityType, isLocked) => axios.put(schemaRegistryUrl + "/v1/subjects", {
    subjectName: subjectName,
    compatibilityType: compatibilityType,
    isLocked: isLocked
});
export const addSchemaToSubject = (subjectName, id) => axios.put(schemaRegistryUrl + "/v1/subjects/" + subjectName + "/schemas/" + id);
export const isSubjectExist = (subjectName) => axios.post(schemaRegistryUrl + "/v1/subjects/" + subjectName);