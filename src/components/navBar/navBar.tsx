import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import { logout } from '../../redux/reducers/loginSlice.tsx';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';

function NavBar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout({}));
    navigate("/");
  };

  return (
    <Navbar expand="lg" bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="/" className="fw-bold fs-4">newApp</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/upload">Upload</Nav.Link>
          </Nav>

          <Nav>
            <Button 
              onClick={handleLogout} 
              variant="outline-light"
              size="sm"
            >
              Log Out
            </Button>
          </Nav>

        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;