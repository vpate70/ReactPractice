import React from 'react';
import { Button, Col, Offcanvas, Row } from 'react-bootstrap';
import { useCart } from './CartContext';
import CartItem from './CartItem';

const Cart = ({ show, handleClose }) => {
    const { cartItems, cartTotal, clearCart } = useCart();

    const itemsArray = Object.values(cartItems);

    return (
        <Offcanvas show={show} onHide={handleClose}>
            <Offcanvas.Header closeButton>
                <Row>
                    <Col md={8}>
                        <Offcanvas.Title>Shopping Cart Total: ${cartTotal} </Offcanvas.Title>
                    </Col>
                    <Col md={4}>
                        <Button variant="danger" onClick={clearCart}>Clear</Button>
                    </Col>
                </Row>
            </Offcanvas.Header>
            <Offcanvas.Body>
                {itemsArray.length === 0 ? (
                    <p>Your shopping cart is empty.</p>
                ) : (
                    <ul>
                        {itemsArray.map(item => (
                            <CartItem item={item} />
                        ))}
                    </ul>
                )}
            </Offcanvas.Body>
        </Offcanvas>
    );
}

export default Cart;
