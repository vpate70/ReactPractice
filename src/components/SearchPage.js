import React, { useState, useEffect } from 'react';
import { Container, Row, Spinner, FormControl, Button, Col, Accordion, Form } from 'react-bootstrap';
import ItemCard from './ItemCard';
import TopBar from './TopBar';

const SearchPage = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedOption, setSelectedOption] = useState('');
    const [categories, setCategories] = useState([]);
    const [selectedOptions, setSelectedOptions] = useState([]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await fetch('https://dummyjson.com/products/categories');
                const data = await response.json();
                setCategories(data);
                setSelectedOptions(data);
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };

        fetchCategories();
    }, []);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const urlParams = new URLSearchParams(window.location.search);
                const sQuery = urlParams.get('q');

                const url = `https://dummyjson.com/products/search?q=${sQuery}`;
                const response = await fetch(url);
                const data = await response.json();
                setProducts(data.products);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchProducts();
    }, []);


    const fetchProductsSearch = async () => {
        try {
            const url = `https://dummyjson.com/products/search?q=${searchQuery}`;
            const response = await fetch(url);
            const data = await response.json();
            setProducts(data.products);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    const handleSortRadioChange = (event) => {
        setSelectedOption(event.target.id);
    };

    const handleSearch = (e) => {
        e.preventDefault();
        const newUrl = `/search/?q=${searchQuery}`;
        window.history.pushState({ path: newUrl }, '', newUrl);
        fetchProductsSearch();
    };

    const handleInputChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const filteredProducts = (p) => {
        p = p.filter(product => selectedOptions.includes(product.category));
        if (selectedOption === 'plh') return p.slice().sort((a, b) => a.price - b.price);
        if (selectedOption === 'phl') return p.slice().sort((a, b) => a.price - b.price).reverse();
        if (selectedOption === 'r') return p.slice().sort((a, b) => a.rating - b.rating).reverse();
        return p;
    };

    const handleCheckboxChange = (event) => {
        const optionValue = event.target.value;
        const isChecked = event.target.checked;

        if (isChecked) {
            setSelectedOptions([...selectedOptions, optionValue]);
        } else {
            setSelectedOptions(selectedOptions.filter(option => option !== optionValue));
        }
    };

    return (
        <>
            <TopBar search={true} />
            <Container>
                <Row className="justify-content-center mb-4">
                    <h1>Search Results</h1>
                    <Col xs="auto">
                        <FormControl
                            type="text"
                            placeholder="Search"
                            className="mr-sm-2"
                            value={searchQuery}
                            onChange={handleInputChange}
                            onKeyDown={(e) => { if (e.key === 'Enter') e.preventDefault() }}
                        />
                    </Col>
                    <Col xs="auto">
                        <Button type="button" variant="outline-success" onClick={handleSearch} >Search</Button>
                    </Col>
                </Row>
                <Row>
                    <Col md={2}>
                        <Row>
                            <Accordion>
                                <Accordion.Header>Sort</Accordion.Header>
                                <Accordion.Body>
                                    <Form>
                                        <Form.Check
                                            type="radio"
                                            id="plh"
                                            name="radiolist"
                                            label="Price Low to High"
                                            onChange={handleSortRadioChange}
                                        />
                                        <Form.Check
                                            type="radio"
                                            id="phl"
                                            name="radiolist"
                                            label="Price High to Low"
                                            onChange={handleSortRadioChange}
                                        />
                                        <Form.Check
                                            type="radio"
                                            id="r"
                                            name="radiolist"
                                            label="Rating"
                                            onChange={handleSortRadioChange}
                                        />
                                    </Form>
                                </Accordion.Body>
                            </Accordion>
                        </Row>
                        <Row>
                            <Accordion>
                                <Accordion.Item eventKey="0">
                                    <Accordion.Header>Categories</Accordion.Header>
                                    <Accordion.Body>
                                        {categories.map(category => (
                                            <Form.Check
                                                type="checkbox"
                                                id="catCheckbox"
                                                label={category}
                                                value={category}
                                                checked={selectedOptions.includes(category)}
                                                onChange={handleCheckboxChange}
                                            />
                                        ))}
                                    </Accordion.Body>
                                </Accordion.Item>
                            </Accordion>
                        </Row>

                    </Col>
                    <Col md={10}>
                        {loading ? (
                            <Spinner animation="border" role="status">
                                <span className="sr-only">Loading...</span>
                            </Spinner>
                        ) : (products.length === 0 ? (
                            <h3>No results found, try another query!</h3>
                        ) : (
                            <Row>
                                {filteredProducts(products).map(product => (
                                    <ItemCard key={product.id} product={product} />
                                ))}
                            </Row>
                        ))}
                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default SearchPage;


