import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import logo from '../../image/Logo.png';

function NavScrollExample() {
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container fluid>
        <Navbar.Brand href="#"><img src={logo} alt="logo" className='logo'/></Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
        <Form.Control
              type="search"
              placeholder="Search"
              className="recherche"
              aria-label="Search"
            />
            <Form className="btn_recherche">
            <Button variant="outline-success">Search</Button>
          </Form>
          <Nav
            className="texteNav my-2 my-lg-0"
            style={{ maxHeight: '250px', paddingLeft: '50px' }}
            navbarScroll
          >
            <Nav.Link href="#action1">BATIMENT</Nav.Link>
            <Nav.Link href="#action2">SERVICES</Nav.Link>
            <Nav.Link href="#action2">FABRICATION</Nav.Link>
            <Nav.Link href="#action2">ALIMENTATION</Nav.Link>
          </Nav>

        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavScrollExample;