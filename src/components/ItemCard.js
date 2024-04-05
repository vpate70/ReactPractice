import React, { useState } from 'react';
import { Card, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useCart } from './CartContext';
import { generateStars } from '../functions/Rating.js';

const ItemCard = ({ product }) => {
    const { addToCart, removeFromCart, checkCart } = useCart();
    const [quantity, setQuantity] = useState(checkCart(product.id));

    const addOne = (e) => {
        addToCart(product);
        e.preventDefault();
        setQuantity(prevQuantity => prevQuantity + 1);
    };

    const removeOne = (e) => {
        if (quantity > 0) {
            removeFromCart(product.id)
            e.preventDefault();
            setQuantity(prevQuantity => prevQuantity - 1);
        }
    };

    return (
        <Col key={product.id} md={4} lg={3} className="mb-4">
            <Card as={Link} to={`/item/${product.id}`} style={{ textDecoration: 'none' }} >
                <div style={{ position: 'relative', width: '100%', height: '200px', overflow: 'hidden' }}>
                    <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }} >
                        <Card.Img variant="top" src={product.images[0]} style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
                    </div>
                </div>

                <Card.Body>
                    <Card.Title >{product.title}</Card.Title>
                    <Card.Text>
                        Price: ${product.price}
                        <div>{generateStars(product.rating)}</div>
                    </Card.Text>
                    <Button onClick={addOne}>+</Button>
                    {checkCart(product.id) > 0 && (
                        <>
                            <span style={{ display: 'inline-block', border: '1px solid #ccc', padding: '2px 5px', marginLeft: '5px', marginRight: '5px' }}>{checkCart(product.id)}</span>
                            <Button onClick={removeOne}>-</Button>
                        </>
                    )}
                </Card.Body>
            </Card>
        </Col>
    );
}

export default ItemCard;
