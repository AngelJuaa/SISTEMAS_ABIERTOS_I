import React from "react";

export default function Guitar({ guitar, handlerClick }) {
  const { id, name, description, price, image } = guitar;
  /*
  console.log(id);
  console.log(name);
  console.log(description);
  console.log(price);
  console.log(image);
**/

  return (
    <>
      <div className="col-md-6 col-lg-4 my-4 row align-items-center">
        <div className="col-4">
          <img
            src={`/${image}.jpg`}
            alt={name}
            className="img-fluid"
            src={`./img/${image}.jpg`}
          />
        </div>
        <div className="col-8">
          <h3 className="text-black fs-4 fw-bold text-uppercase">{name}</h3>
          <p>{description}</p>
          <p className="fw-black text-primary fs-3">${price}</p>
          <button
            type="button"
            className="btn btn-dark w-100"
            onClick={() => handlerClick(guitar)}
          >
            Agregar al Carrito
          </button>
        </div>
      </div>
    </>
  );
}
