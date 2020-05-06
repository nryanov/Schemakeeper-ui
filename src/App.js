import React from 'react';
import {Container, Grid} from "@material-ui/core";
import SubjectCardContainer from "./schema-registry/components/SubjectCard";
import AlertContainer from "./schema-registry/components/Alert";
import Header from "./schema-registry/components/Header";
import SchemakeeperInfoContainer from "./schema-registry/components/SchemakeeperInfo";
import SubjectList from "./schema-registry/components/SubjectList";

const App = () => (
    <Container>
        <Grid container spacing={3}>
            <Grid item xs={12}>
                <Header/>
                <AlertContainer/>
            </Grid>
            <Grid item xs={4}>
                <SubjectList/>
                <SchemakeeperInfoContainer/>
            </Grid>
            <Grid item xs={8}>
                <SubjectCardContainer/>
            </Grid>
        </Grid>
    </Container>
);

export default App;
