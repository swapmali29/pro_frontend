import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Navbar,
  NavbarBrand,
  NavbarToggler,
  Collapse,
  Nav,
  NavItem,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from 'reactstrap';

export const NavbarComponent = () => {
  const [isOpen, setIsOpen] = useState(false);
  // const { role } = useUserDetails();
  const user = JSON.parse(localStorage.getItem('user'));
  const role = user?.role; // could be 'admin' or 'user'
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';



  console.log(isLoggedIn);



  const toggle = () => setIsOpen(!isOpen);

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('user');

  }

  return (

    <Navbar className={role === 'admin' ? 'admin-class' : 'user-class'} expand="md" container="md">

      <div style={{ display: "flex", alignItems: "center" }}>
        <h1 className='brand'><Link to={"/"} style={{ textDecoration: "none" }}> Product Mangement </Link></h1>
        {role === 'user' && (
          <p className='login_role'> <span>User</span> Dashboard </p>)}
        {role === 'admin' && (
          <p className='login_role'> <span>Admin</span> Dashboard </p>)}
      </div>

      <NavbarToggler onClick={toggle} />
      <Collapse isOpen={isOpen} navbar>
        <Nav className="ms-auto" navbar>
          {role === 'admin' && (
            <NavItem style={{ paddingTop: '8px' }}>
              <Link to={"/add"} style={{ textDecoration: 'none', color: '#000', marginRight: '10px' }}> Add Product</Link>
            </NavItem>)}
            {role === 'user' && (
            <p className='login_role username'  style={{ paddingTop: '8px' }}> Hi, {user.username} </p>)}

          {!isLoggedIn && (
            <NavItem style={{ paddingTop: '8px' }}>
              <Link to="/login" style={{ textDecoration: 'none', color: '#000' }} onClick={handleLogout}> Login</Link>
            </NavItem>)}

          {isLoggedIn && (
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret style={{ color: '#000', fontWeight: "500" }}>
                Profile
              </DropdownToggle>
              <DropdownMenu end>
                <DropdownItem className='username'>Username : {user.username} </DropdownItem>
                <DropdownItem>Role : {user.role} </DropdownItem>
                <DropdownItem divider />
                <DropdownItem><Link to="/" onClick={handleLogout}>Logout</Link></DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>)}
        </Nav>
      </Collapse>
    </Navbar>
  );
}
