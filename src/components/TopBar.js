import React, { useState, useEffect } from 'react';
import { Navbar, Nav, NavDropdown, Form, FormControl, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Cart from './Cart';
import { useCart } from './CartContext';

const TopBar = ({ search }) => {
    const [categories, setCategories] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const { cartOpen, toggleCart } = useCart();

    const handleInputChange = (e) => {
        setSearchQuery(e.target.value);
    };

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await fetch('https://dummyjson.com/products/categories');
                const data = await response.json();
                setCategories(data);
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };

        fetchCategories();
    }, []);

    const handleCloseCart = () => {
        toggleCart();
    };

    return (
        <>
            <Navbar bg="light" expand="lg">
                <Nav className='m-auto'>
                    <Navbar.Brand as={Link} to="/" className="mx-auto">
                        <img
                            src="/images/logo.png"
                            alt="DShop Logo"
                            height="30"
                            className="d-inline-block align-top"
                        />
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className='px-2'>
                            <NavDropdown title="Categories" id="dropdown-size-small" >
                                {categories.map(category => (
                                    <NavDropdown.Item key={category} as={Link} to={`/categories/${category}`}>
                                        {category}
                                    </NavDropdown.Item>
                                ))}
                            </NavDropdown>
                            {!search && (<>
                                <Nav.Item className='ms-auto'>
                                    <Form inline>
                                        <FormControl
                                            type="text"
                                            placeholder={'Search'}
                                            value={searchQuery}
                                            onChange={handleInputChange}
                                            onKeyDown={(e) => { if (e.key === 'Enter') e.preventDefault() }}
                                        />
                                    </Form>
                                </Nav.Item>
                                <Nav.Item >
                                    <Button
                                        as={Link}
                                        to={searchQuery ? `/search?q=${searchQuery}` : '#'} variant="outline-primary">{String.fromCodePoint(parseInt('0x1f50d', 16))}</Button>
                                </Nav.Item>
                            </>
                            )}
                            <Nav.Item className='px-2'>
                                <Button variant="outline-primary" onClick={() => toggleCart()}>
                                    {String.fromCodePoint(parseInt('0x1F6D2', 16))}
                                </Button>
                            </Nav.Item>
                        </Nav>
                    </Navbar.Collapse>
                </Nav>
            </Navbar>
            <Cart show={cartOpen} handleClose={handleCloseCart} />
        </>
    );
}

export default TopBar;
