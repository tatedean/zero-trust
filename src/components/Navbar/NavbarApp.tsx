import {useEffect, useRef } from 'react';

import './NavbarApp.css';

import { NavLink } from 'react-router-dom';
import { RxHamburgerMenu } from 'react-icons/rx';

import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import { Toast } from 'primereact/toast';


export default function NavbarApp(props:any){
  const toast = useRef<any>(null);

  // useEffect(() => {

  // }, []);

  useEffect(() => {

  },[]);

  return(
  <>
    <Toast ref={toast} />
    <Navbar expand='lg' className='navbarapp'>
      <Container className='bg-appprimary' fluid>
        <Navbar.Brand className=''>
          {/* <img src='/logo/logotbcs.png' alt='' className='d-inline-block align-top tbcs-logo-image'/> */}
        {/* <Navbar.Collapse className='tbcs-logo-text'>
            ZT
        </Navbar.Collapse> */}
        </Navbar.Brand>
        
        
        <Navbar.Toggle aria-controls="navbarAppContent">
          <RxHamburgerMenu className='navItem-icon'/>
        </Navbar.Toggle>
        <Navbar.Collapse id="navbarAppContent" >
          <Nav className='navbar-main'>
            <NavLink to="/zerotrust" className='navApp-item'>
              <h3 className='navItem-icon'>ZT</h3>
              <div className='navItem-text'>Zero Trust</div>
            </NavLink>
          </Nav>

        </Navbar.Collapse>
      </Container>
    </Navbar>
  </>
)};
