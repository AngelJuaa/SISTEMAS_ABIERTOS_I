import Header from "./components/Header";
import { useState } from "react";
import { db } from "./data/db.js";
import Guitar from "./components/Guitar";

function App() {
  const [data] = useState(db);
  const [cart, setCart] = useState([]);

  // AGREGAR GUITARRA AL CARRITO
  function handlerClick(item) {
    const guitarExists = cart.findIndex((guitar) => guitar.id === item.id);

    // Si ya existe
    if (guitarExists >= 0) {
      const updatedCart = [...cart];

      // No permitir más de 5
      if (updatedCart[guitarExists].quantity >= 5) {
        return;
      }

      updatedCart[guitarExists].quantity += 1;
      setCart(updatedCart);
    } else {
      // Agregar por primera vez
      setCart((prevCart) => [
        ...prevCart,
        {
          ...item,
          quantity: 1,
        },
      ]);
    }
  }

  // AUMENTAR CANTIDAD
  function increaseQuantity(id) {
    setCart((prevCart) =>
      prevCart.map((guitar) => {
        if (guitar.id === id) {
          // Máximo 5
          if (guitar.quantity >= 5) {
            return guitar;
          }

          return {
            ...guitar,
            quantity: guitar.quantity + 1,
          };
        }

        return guitar;
      }),
    );
  }

  // DISMINUIR CANTIDAD
  function decreaseQuantity(id) {
    setCart((prevCart) =>
      prevCart
        .map((guitar) => {
          if (guitar.id === id) {
            return {
              ...guitar,
              quantity: guitar.quantity - 1,
            };
          }

          return guitar;
        })
        // Si llega a 0, se elimina
        .filter((guitar) => guitar.quantity > 0),
    );
  }

  // ELIMINAR UNA GUITARRA
  function removeFromCart(id) {
    setCart((prevCart) => prevCart.filter((guitar) => guitar.id !== id));
  }

  // VACIAR CARRITO
  function clearCart() {
    setCart([]);
  }

  // CALCULAR TOTAL
  function calculateTotal() {
    return cart.reduce(
      (total, guitar) => total + guitar.price * guitar.quantity,
      0,
    );
  }

  return (
    <>
      <Header
        cart={cart}
        increaseQuantity={increaseQuantity}
        decreaseQuantity={decreaseQuantity}
        removeFromCart={removeFromCart}
        clearCart={clearCart}
        total={calculateTotal()}
      />

      <main className="container-xl mt-5">
        <h2 className="text-center">Nuestra Colección</h2>

        <div className="row mt-5">
          {data.map((guitar) => (
            <Guitar
              guitar={guitar}
              handlerClick={handlerClick}
              key={guitar.id}
            />
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
