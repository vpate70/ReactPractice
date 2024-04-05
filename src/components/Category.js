import React, { useState, useEffect } from 'react';
import { Container, Spinner, Row, Col } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import ItemCard from './ItemCard';
import TopBar from './TopBar';

const CategoryPage = () => {
    const { category } = useParams();
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchItemsByCategory = async () => {
            try {
                const response = await fetch(`https://dummyjson.com/products/category/${category}`);
                const data = await response.json();
                setItems(data.products);
                setLoading(false);
            } catch (error) {
                setLoading(false);
                console.error('Error fetching items:', error);
            }
        };

        fetchItemsByCategory();
    }, [category]);

    return (
        <div>
            <TopBar search={false} />
            <Container className="mt-4">
                <h2>{category} Items</h2>
                <Row>
                    {loading ? (
                        <Col className="text-center">
                            <Spinner animation="border" role="status">
                                <span className="sr-only"></span>
                            </Spinner>
                        </Col>
                    ) : (
                        <Row>
                            {items.map(product => (
                                <ItemCard key={product.id} product={product} />
                            ))}
                        </Row>
                    )}
                </Row>
            </Container>
        </div>
    );
}

export default CategoryPage;
