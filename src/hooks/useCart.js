import { useEffect, useState, useMemo } from "react";
import { db } from "../data/db";

export const useCart = () => {
  //logiica
  //const [data] = useState(db); //entre parentesis estado inicial
  //const [cart, setCart] = useState([]);

  const initialCart = () => {
    const localStorageCart = localStorage.getItem("cart"); //se buscar el cart y se guarda en el navegador

    try {
      //el trii es para que se aplique la functio correctamente
      const parsed = localStorageCart ? JSON.parse(localStorageCart) : []; //convie la cadena o guarda aun localtoge objto o vacio
      return Array.isArray(parsed) ? parsed : []; //validamos que sea un [] y si encunetra algo diferente regresa [vacio] para evitar errores
    } catch (error) {
      //campuramos el error
      console.error("Error al leer el carrito de localStorage:", error); //se registra el error y lo muestra en consola
      localStorage.removeItem("cart"); //elimina la clave dañada o el error
      return []; //regresa el carrito vacio[]
    }
  };

  const [data] = useState(db);

  const [cart, setCart] = useState(initialCart);

  useEffect(() => {
    //solo recibe cadenas de texto
    localStorage.setItem("cart", JSON.stringify(cart)); //da formato json
  }, [cart]); //guarda carrito convertido a string

  const MIN_ITEMS = 1;
  const MAX_ITEMS = 5;

  function addToCart(item) {
    const itemExists = cart.findIndex((guitar) => guitar.id == item.id); //regresa el elemento con el mismo id y regresa el idice
    if (itemExists >= 0) {
      if (cart[itemExists].quantity >= MAX_ITEMS) return;
      const updatedCart = [...cart];
      updatedCart[itemExists].quantity++;
      setCart(updatedCart);
    } else {
      item.quantity = 1;
      setCart([...cart, item]); //se copia el carrito
    }
  }

  function decreseQuantity(id) {
    const updatedCart = cart.map((item) => {
      if (item.id === id && item.quantity > MIN_ITEMS) {
        return {
          ...item,
          quantity: item.quantity - 1,
        };
      }
      return item;
    });
    setCart(updatedCart);
  }
  function increaseQuantity(id) {
    const updatedCart = cart.map((item) => {
      if (item.id === id && item.quantity < MAX_ITEMS) {
        return {
          ...item,
          quantity: item.quantity + 1,
        };
      }
      return item;
    });
    setCart(updatedCart);
  }

  function removeFromCart(id) {
    setCart((prevCart) => prevCart.filter((guita) => guita.id !== id));
  }

  function clearCart(e) {
    setCart([]);
  }

  const [total, setTotal] = useState(0);

  const isEmpty = useMemo(() => cart.length === 0, [cart]);
  const cartTotal = useMemo(
    () => cart.reduce((total, item) => total + item.quantity * item.price, 0),
    [cart],
  );

  return {
    //metodos y variables para retornar o compartir

    cart,
    data,
    isEmpty,
    cartTotal,
    addToCart,
    decreseQuantity,
    increaseQuantity,
    removeFromCart,
    clearCart,
    total,
    setTotal,
    useState,
  };
};
