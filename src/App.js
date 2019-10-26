import React from 'react';
import SubjectsContainer from "./schema-registry/components/SubjectsContainer";
import SubjectCardContainer from "./schema-registry/components/SubjectCardContainer";
import AlertContainer from "./schema-registry/components/Alert";
import Header from "./schema-registry/components/Header";
import NewSubjectModal from "./schema-registry/components/NewSubjectModal";
import PaginationContainer from "./schema-registry/components/Pagination";

const App = () => (
    <div className="container-fluid">
        <NewSubjectModal/>
        <Header/>
        <AlertContainer/>
        <div className="row mt-4">
            <div className='col-4'>
                <SubjectsContainer/>
                <PaginationContainer/>
            </div>
            <div className='col-8'>
                <SubjectCardContainer/>
            </div>
        </div>
    </div>
);

export default App;
