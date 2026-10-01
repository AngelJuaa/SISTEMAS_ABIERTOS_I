import { useEffect, useState } from "react";
import Guitar from "./components/Guitar";
import Header from "./components/Header";
import { db } from "./data/db";

function App() {
  //const [data] = useState(db); //entre parentesis estado inicial
  //const [cart, setCart] = useState([]);

  const initialCart = () => {
    const localStorageCart = localStorage.getItem("cart"); //se buscar el cart y se guarda en el navegador

    try {//el trii es para que se aplique la functio correctamente
      const parsed = localStorageCart ? JSON.parse(localStorageCart) : []; //convie la cadena o guarda aun localtoge objto o vacio
      return Array.isArray(parsed) ? parsed : []; //validamos que sea un [] y si encunetra algo diferente regresa [vacio] para evitar errores  
    } catch (error) {//campuramos el error 
      console.error("Error al leer el carrito de localStorage:", error);//se registra el error y lo muestra en consola
      localStorage.removeItem("cart");//elimina la clave dañada o el error
      return [];//regresa el carrito vacio[]
    }
  };

  const [data] = useState(db);

  const [cart, setCart] = useState(initialCart);

  useEffect(() => {//solo recibe cadenas de texto 
    localStorage.setItem("cart", JSON.stringify(cart));//da formato json
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

  return (
    <>
      <Header
        cart={cart}
        decreseQuantity={decreseQuantity}
        increaseQuantity={increaseQuantity}
        removeFromCart={removeFromCart}
        clearCart={clearCart}
      />

      <main className="container-xl mt-5">
        <h2 className="text-center">Nuestra Colección</h2>

        <div className="row mt-5">
          {data.map((guitar) => (
            <Guitar key={guitar.id} guitar={guitar} addToCart={addToCart} />
          ))}
        </div>
      </main>

      <footer className="bg-dark mt-5 py-5">
        <div className="container-xl">
          <p className="text-white text-center fs-4 mt-4 m-md-0">
            GuitarLA - Todos los derechos Reservados
          </p>
        </div>
      </footer>
    </>
  );
}

export default App;
