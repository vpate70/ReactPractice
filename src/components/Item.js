import React, { useState, useEffect } from 'react';
import { Button, Card, Carousel, Col, Row } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import TopBar from './TopBar';
import { useCart } from './CartContext';

const ItemPage = () => {
    const { id } = useParams();
    const [item, setItem] = useState(null);
    const { addToCart, removeFromCart, checkCart } = useCart();
    const [quantity, setQuantity] = useState(checkCart(id));

    const addOne = (e) => {
        addToCart(item);
        e.preventDefault();
        setQuantity(prevQuantity => prevQuantity + 1);
    };

    const removeOne = (e) => {
        if (quantity > 0) {
            removeFromCart(id)
            e.preventDefault();
            setQuantity(prevQuantity => prevQuantity - 1);
        }
    };

    useEffect(() => {
        const fetchItem = async () => {
            try {
                const response = await fetch(`https://dummyjson.com/products/${id}`);
                const data = await response.json();
                setItem(data);
            } catch (error) {
                console.error('Error fetching item:', error);
            }
        };

        fetchItem();
    }, [id]);

    if (!item) {
        return <p>Loading...</p>;
    }

    return (
        <div>
            <TopBar search={false} />
            <div className="container mt-4">
                <Row>
                    <Col md={6}>
                        <Carousel>
                            {item.images.map((image, index) => (
                                <Carousel.Item key={index}>
                                    <img
                                        className="d-block w-100"
                                        src={image}
                                        alt={`Slide ${index + 1}`}
                                    />
                                </Carousel.Item>
                            ))}
                        </Carousel>
                    </Col>
                    <Col md={6}>
                        <Card>
                            <Card.Body>
                                <Card.Title>{item.title}</Card.Title>
                                <Card.Text>{item.description}</Card.Text>
                                <Card.Text>Price: ${item.price}</Card.Text>
                                <Button onClick={addOne}>+</Button>
                                {checkCart(id) > 0 && (
                                    <>
                                        <span style={{ display: 'inline-block', border: '1px solid #ccc', padding: '2px 5px', marginLeft: '5px', marginRight: '5px' }}>{checkCart(id)}</span>
                                        <Button onClick={removeOne}>-</Button>
                                    </>
                                )}
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </div>
        </div>
    );
}

export default ItemPage;
