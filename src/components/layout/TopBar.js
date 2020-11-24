import React from 'react';
import { Navbar, Nav, NavDropdown, Form, FormControl, Button, InputGroup } from 'react-bootstrap';

import SearchIcon from '@material-ui/icons/Search';
import Container from '@material-ui/core/Container';

const TopBar = () => {
  return (
    <Navbar collapseOnSelect expand="lg" bg="light" variant="light">
      <Navbar.Brand href="#home" style={{fontWeight: 'bold'}}>D.App</Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse className="row" id="responsive-navbar-nav">
        <Nav className="col-9 justify-content-center">
          <Nav.Item>
            <Nav.Link href="#">Posts</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link href="#">Proposals</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link href="#">Witnesses</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link href="#">Our dApps</Nav.Link>
          </Nav.Item>
        </Nav>

        <Form class="col-3 col-md-3 col-sm-8  justify-content-end row" inline>
        <InputGroup>
          <FormControl
            type="text"
            placeholder="Input group example"
            aria-label="Input group example"
            aria-describedby="btnGroupAddon"
          />
          <InputGroup.Append>
            <InputGroup.Text class="btn btn-outline-secondary" id="btnGroupAddon">
             <SearchIcon />
            </InputGroup.Text>
          </InputGroup.Append>
        </InputGroup>
        </Form>
      </Navbar.Collapse>
     
    </Navbar>
  )
}

export default TopBar;
