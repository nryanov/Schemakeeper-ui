import React from 'react';
import SubjectsContainer from "./schema-registry/components/Subjects";
import SubjectCardContainer from "./schema-registry/components/SubjectCard";
import AlertContainer from "./schema-registry/components/Alert";
import Header from "./schema-registry/components/Header";
import PaginationContainer from "./schema-registry/components/Pagination";
import SearchContainer from "./schema-registry/components/Search";
import SchemakeeperInfoContainer from "./schema-registry/components/SchemakeeperInfo";

const App = () => (
    <div className="container-fluid">
        <div className="row">
            <div className='col-12'>
                <Header/>
            </div>
        </div>

        <div className="row mt-2">
            <div className='col-12'>
                <AlertContainer/>
            </div>
        </div>

        <div className="row mt-2">
            <div className='col-4'>
                <SearchContainer/>
                <SubjectsContainer/>
                <PaginationContainer/>
                <SchemakeeperInfoContainer/>
            </div>
            <div className='col-8'>
                <SubjectCardContainer/>
            </div>
        </div>
    </div>
);

export default App;
