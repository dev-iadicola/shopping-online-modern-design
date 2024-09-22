
const Carusel = ({ id, title, price, description, category, image }) => {
    return (
        <div className="carusle-group">
            <h2>All Products</h2>
             
                  <div className="d-flex flex-columns mx-auto justify-content-center py-5 holiday-container">
                  <img src={image} alt={title} className="object-fit-cover border rounded img" height={700} />
  
                  </div>
                   <div className="holiday-info">
                   <h3>{title}</h3>
                    <p>{description}</p>
                    <small>{category}</small>
                    <h5 className="holiday-cost"> Price {(price).toFixed(2)}</h5>
  
                    <div className="btn-group">
                      <button className="btn">Back</button>
                      <button className="btn">Next</button>
                    </div>
                   </div>
             
        </div>
    );
  };

  export default Carusel;