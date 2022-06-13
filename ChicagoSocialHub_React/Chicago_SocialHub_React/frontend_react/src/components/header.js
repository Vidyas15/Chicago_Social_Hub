import React, { Component } from "react";
import { Navbar, NavItem, NavbarBrand, Nav, Collapse, NavLink} from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCoffee, faWineGlass } from "@fortawesome/free-solid-svg-icons";


class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        return (
            <div style={{
                display: 'block', width: "100%"
            }}>
                <Navbar style = {{backgroundColor: "#7D0552"}} light expand="md">
                    <NavbarBrand style = {{color: "white"}} href="/">Chicago Social Hub</NavbarBrand>
                    <Collapse isOpen={true} navbar>
                        <Nav className="mr-auto" navbar>
                            <NavItem>
                                <NavLink href="#"><i style = {{fontSize: "30px", cursor: "pointer", color: "white"}} className="fa fa-cutlery" aria-hidden="true"></i></NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink href="#"><FontAwesomeIcon style = {{fontSize: "30px", cursor: "pointer", color: "white"}} icon={faWineGlass} /></NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink href="#"><FontAwesomeIcon style = {{fontSize: "30px", cursor: "pointer", color: "white"}} icon={faCoffee} /></NavLink>
                            </NavItem>
                        </Nav>
                    </Collapse>
                </Navbar>
            </div >
        );
    }
}

export default (Header);