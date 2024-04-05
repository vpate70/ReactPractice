import React from 'react';
import { Button, Card, Image } from 'react-bootstrap';
import { useCart } from './CartContext';

const CartItem = ({ item }) => {
    const { removeItemFromCart } = useCart();

    const handleRemove = () => {
        removeItemFromCart(item.id);
    };

    return (
        <Card className="mb-2">
            <Card.Body>
                <div className="d-flex align-items-center">
                    <div className="mr-3">
                        <Image src={item.images[0]} style={{ width: '80px', height: '80px' }} rounded />
                    </div>
                    <div>
                        <Card.Title>{item.title}</Card.Title>
                        <Card.Text>Quantity: {item.quantity}</Card.Text>
                        <Card.Text>Total Price: ${(item.quantity * item.price).toFixed(2)}</Card.Text>
                    </div>
                </div>
            </Card.Body>
            <Card.Footer>
                <Button variant="danger" onClick={handleRemove}>Remove</Button>
            </Card.Footer>
        </Card>
    );
};

export default CartItem;
