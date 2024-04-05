import React, { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState({});
    const [cartOpen, setCartOpen] = useState(false);
    const [cartId, setCartId] = useState(null);

    const cartTotal = Object.values(cartItems).reduce((total, product) => {
        return total + (product.quantity * product.price);
    }, 0);

    const toggleCart = () => {
        setCartOpen(!cartOpen);
    };

    const addToCart = async (item) => {
        setCartItems((prevItems) => {
            const updatedCartItems = prevItems;
            if (updatedCartItems[item.id]) {
                updatedCartItems[item.id].quantity += 1;
            } else {
                updatedCartItems[item.id] = { ...item, quantity: 1 };
            }
            return updatedCartItems;
        });
        if (cartId) {
            try {
                const response = await fetch(`https://dummyjson.com/carts/${cartId}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        merge: false,
                        products: Object.values(cartItems).map(item => ({ id: item.id, quantity: item.quantity }))
                    })
                });
                const data = await response.json();
                setCartId(data.id);

            } catch (error) {
                console.error('Error adding item to cart:', error);
            }
        }
        else {
            try {
                const response = await fetch('https://dummyjson.com/carts/add', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        userId: 1,
                        products: Object.values(cartItems).map(item => ({ id: item.id, quantity: item.quantity }))
                    })
                });
                const data = await response.json();
                setCartId(data.id);
            } catch (error) {
                console.error('Error adding item to cart:', error);
            }
        }

    };

    const removeFromCart = async (itemId) => {
        setCartItems((prevItems) => {
            const updatedCartItems = prevItems;
            if (updatedCartItems[itemId].quantity > 1) {
                updatedCartItems[itemId].quantity -= 1;
                return updatedCartItems;
            }
            else {
                delete updatedCartItems[itemId];
                return updatedCartItems;
            }
        });

        if (cartId) {
            try {
                const response = await fetch(`https://dummyjson.com/carts/${cartId}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        merge: false,
                        products: Object.values(cartItems).map(item => ({ id: item.id, quantity: item.quantity }))
                    })
                });
                const data = await response.json();
                setCartId(data.id);

            } catch (error) {
                console.error('Error adding item to cart:', error);
            }
        }
    };

    const removeItemFromCart = async (itemId) => {
        setCartItems((prevItems) => {
            const updatedCartItems = { ...prevItems };
            delete updatedCartItems[itemId];
            return updatedCartItems;
        });

        if (cartId) {
            try {
                const response = await fetch(`https://dummyjson.com/carts/${cartId}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        merge: false,
                        products: Object.values(cartItems).map(item => ({ id: item.id, quantity: item.quantity }))
                    })
                });
                const data = await response.json();
                setCartId(data.id);

            } catch (error) {
                console.error('Error adding item to cart:', error);
            }
        }
    };

    const checkCart = (itemId) => {
        if (cartItems[itemId]) {
            return cartItems[itemId].quantity;
        }
        else {
            return 0;
        }
    };

    const clearCart = () => {
        setCartItems({});
        setCartId(null);
        if (cartId) {
            fetch(`https://dummyjson.com/carts/${cartId}`, {
                method: 'DELETE',
            })
                .then(res => res.json())
                .catch(error => {
                    console.error('Error clearing cart:', error);
                });
        }

    };

    return (
        <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, clearCart, checkCart, removeItemFromCart, cartOpen, toggleCart, cartTotal }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => useContext(CartContext);
