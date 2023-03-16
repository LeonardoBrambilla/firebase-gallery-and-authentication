import React from 'react'
import { useNavigate } from 'react-router-dom';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { Outlet } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { Button } from "react-bootstrap"

const Header = () => {
  const {currentUser,logout} = useAuth()
  const navigate = useNavigate()
  const handleLogout = async () => {
    try {
      await logout()
      navigate("/login")
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className='d-flex flex-column'>
      <Navbar className="p-2" bg="light" expand="lg" >
      <Navbar.Brand href="#home">My App</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse className="flex-row-reverse" id="basic-navbar-nav">
          {currentUser && 
          <Button variant="link" onClick={handleLogout}>
              Log Out
          </Button>
          }
        <Nav className="mr-auto">
          <Nav.Link href="/">Home</Nav.Link>
          <Nav.Link href="/">Link</Nav.Link>
          <NavDropdown title="Dropdown" id="basic-nav-dropdown" >
            <NavDropdown.Item href="/">Action</NavDropdown.Item>
            <NavDropdown.Item href="/">Another action</NavDropdown.Item>
            <NavDropdown.Item href="/">Something</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="/">Separated link</NavDropdown.Item>
          </NavDropdown>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
      <Outlet />
    </div>
  )
}

export default Header