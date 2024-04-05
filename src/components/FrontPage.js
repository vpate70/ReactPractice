import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Spinner } from 'react-bootstrap';
import TopBar from './TopBar';
import ItemCard from './ItemCard';

const FrontPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('https://dummyjson.com/products');
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        const data = await response.json();
        // Realistically, have an api that returns sorted data on any field
        setProducts(data.products.sort((a, b) => b.rating - a.rating).slice(0, 12));
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div>
      <TopBar search={false} />
      <Container className="mt-5">
        <Card className="border-0 d-flex justify-content-center">
          <Card.Body className='d-flex justify-content-center'>
            <Card.Title>Welcome to Dshop!</Card.Title>
          </Card.Body>
        </Card>
        <Row>
          {loading ? (
            <Col className="text-center">
              <Spinner animation="border" role="status">
                <span className="sr-only"></span>
              </Spinner>
            </Col>
          ) : (
            <Row>
              {products.map(product => (
                <ItemCard key={product.id} product={product} />
              ))}
            </Row>
          )}
        </Row>
      </Container>
    </div>
  );
}

export default FrontPage;
