import React, {useState} from 'react'
import NewSubjectModal from "./NewSubjectModal";
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    Form
} from 'reactstrap';


const Header = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => setIsOpen(!isOpen);

    return (
        <>
            <NewSubjectModal/>
            <Navbar color="light" light expand="lg">
                <NavbarBrand>Schemakeeper</NavbarBrand>
                <NavbarToggler onClick={toggle} />
                <Collapse isOpen={isOpen} navbar>
                    <Nav className="mr-auto" navbar>
                        <NavItem>
                            <Form inline>
                                <button className="btn btn-outline-success" id="newSubjectModalBtn" type="button" data-toggle="modal"
                                        data-target="#newSubjectModal">New subject
                                </button>
                            </Form>
                        </NavItem>
                    </Nav>
                </Collapse>
            </Navbar>
        </>
    );
};

export default Header;