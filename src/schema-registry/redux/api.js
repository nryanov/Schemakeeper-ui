import axios from 'axios'

//todo: get from config
const schemaRegistryUrl = "http://192.168.99.100:9081";
// const schemaRegistryUrl = "http://localhost:9081";

axios.defaults.headers.common = {
    ...axios.defaults.headers.common
};

export const subjects = () => axios.get(`${schemaRegistryUrl}/v1/subjects`);
export const subjectMetadata = (subjectName) => axios.get(`${schemaRegistryUrl}/v1/subjects/${subjectName}`);
export const subjectSchemasMetadata = (subjectName) => axios.get(schemaRegistryUrl + "/v1/subjects/" + subjectName + "/schemas");
export const subjectSchemaByVersion = (subjectName, version) => axios.get(schemaRegistryUrl + "/v1/subjects/" + subjectName + "/schemas/" + version);
export const lockSubject = (subjectName) => axios.post(schemaRegistryUrl + "/v1/subjects/" + subjectName + "/lock");
export const unlockSubject = (subjectName) => axios.post(schemaRegistryUrl + "/v1/subjects/" + subjectName + "/unlock");
export const deleteSubject = (subjectName) => axios.delete(schemaRegistryUrl + "/v1/subjects/" + subjectName);
export const deleteSubjectSchemaByVersion = (subjectName, version) => axios.delete(schemaRegistryUrl + "/v1/subjects/" + subjectName + "/versions/" + version);
export const updateSubjectCompatibility = (subjectName, compatibilityType) => axios.post(schemaRegistryUrl + "/v1/subjects/" + subjectName + "/compatibility", {
    compatibilityType: compatibilityType
});
export const registerSchemaAndSubject = (subjectName, compatibilityType, schema) => axios.put(schemaRegistryUrl + "/v1/subjects/" + subjectName + "/schemas", {
    schemaText: schema,
    schemaType: "avro",
    compatibilityType: compatibilityType
});
export const registerSubject = (subjectName, compatibilityType, isLocked) => axios.put(schemaRegistryUrl + "/v1/subjects", {
    subject: subjectName,
    compatibilityType: compatibilityType,
    isLocked: isLocked
});
