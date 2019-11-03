import React from 'react'
import NewSubjectModal from "./NewSubjectModal";

const Header = () => (
    <>
        <NewSubjectModal/>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <span className="navbar-brand">Schemakeeper</span>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup"
                    aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"/>
            </button>
            <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                <form className="form-inline">
                    <button className="btn btn-outline-success" type="button" data-toggle="modal"
                            data-target="#newSubjectModal">New subject
                    </button>
                </form>
            </div>
        </nav>
    </>
);

export default Header;