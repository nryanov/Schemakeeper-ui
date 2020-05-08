import axios from 'axios'

const schemaRegistryUrl = process.env.REACT_APP_SCHEMAKEEPER_URL;
const apiVersion = "v2";
const apiUrl = `${schemaRegistryUrl}/${apiVersion}`;

axios.defaults.headers.common = {
    ...axios.defaults.headers.common
};

export const subjects = () => axios.get(`${apiUrl}/subjects`);
export const subjectMetadata = (subjectName) => axios.get(`${apiUrl}/subjects/${subjectName}`);
export const subjectSchemasMetadata = (subjectName) => axios.get(`${apiUrl}/subjects/${subjectName}/schemas`);
export const deleteSubject = (subjectName) => axios.delete(`${apiUrl}/subjects/${subjectName}`);
export const deleteSubjectSchemaByVersion = (subjectName, version) => axios.delete(`${apiUrl}/subjects/${subjectName}/versions/${version}`);
export const updateSubjectSettings = (subjectName, compatibilityType, isLocked) => axios.put(`${apiUrl}/subjects/${subjectName}`, {
    compatibilityType: compatibilityType,
    isLocked: isLocked
});
export const registerSchemaAndSubject = (subjectName, compatibilityType, schema) => axios.post(`${apiUrl}/subjects/${subjectName}/schemas`, {
    schemaText: schema,
    schemaType: "avro",
    compatibilityType: compatibilityType
});
export const registerSubject = (subjectName, compatibilityType, isLocked) => axios.post(`${apiUrl}/subjects`, {
    subject: subjectName,
    compatibilityType: compatibilityType,
    isLocked: isLocked
});
