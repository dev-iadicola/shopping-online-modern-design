
const Carusel = ({ id, title, price, description, category, image, next, prev}) => {
    return (
        <div className="carusle-group my-5 col-12">
            <h2>All Products</h2>
             
                  <div className="d-flex flex-columns mx-auto justify-content-center py-5 holiday-container ">
                  <img src={image} alt={title} className="object-fit-sm-contain border rounded" height={300} />
  
                  </div>
                   <div className="holiday-info">
                   <h3>{title}</h3>
                    <p>{description}</p>
                    <small>{category}</small>
                    <h5 className="holiday-cost"> Price {(price).toFixed(2)}</h5>
  
                    <div className="btn-group">
                      <button className="btn w-25" onClick={prev}>Prev</button>
                      <button className="btn w-25" onClick={next}>Next</button>
                    </div>
                   </div>
             
        </div>
    );
  };

  export default Carusel;