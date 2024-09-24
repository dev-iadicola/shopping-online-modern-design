import { useEffect, useState } from "react";

const AlertComponent = ({ type, message, onClose }) => {
  return (
    <div className={`alert alert-${type} alert-dismissible fade show fixed-top my-2 w-75 mx-auto`} role="alert">
      {message}
      <button type="button" className="btn-close" aria-label="Close" onClick={onClose}></button>
    </div>
  );
};

const Article = ({ title, price, description, category, image }) => {
  const [alertInfo, setAlertInfo] = useState({ show: false, message: '', type: '' });

  const handleBuy = () => {
    setAlertInfo({ show: true, message: 'Product purchase made!', type: 'success' });
  };

  const handleAddToCart = () => {
    setAlertInfo({ show: true, message: 'Product added to cart!', type: 'info' });
  };

  const handleWishList = () => {
    setAlertInfo({ show: true, message: 'Product added in wish list!', type: 'danger' });
  };


  useEffect(() => {
    if (alertInfo.show) {
      const timer = setTimeout(() => {
        setAlertInfo({ ...alertInfo, show: false });
      }, 4000);

      // debugged with this
      return () => clearTimeout(timer);
    }
  }, [alertInfo.show]);
  
  const closeAlert = () => {
    setAlertInfo({ ...alertInfo, show: false });
  };

  const [fullString, setFullString] = useState(true);

  return (
    <article className="article d-flex flex-column flex-md-row justify-content-center align-items-center">
      <div className="article-content text-center text-md-start" style={{ width: '100%' }}>
        <h3 className="py-3">{title}</h3>
        <img
          src={image}
          alt={title}
          className="img-fluid img-card-top mb-3"
          style={{ maxHeight: '300px' }}
        />
        <div className="fs-3 my-3 fw-bold">
          <span className="text-success">€</span> {price.toFixed(2)}
        </div>
        <div className="py-4 fs-5" onClick={() => setFullString(!fullString)}>
          {fullString ? description.substring(0, 100) + '...' : description}
        </div>

        <div className="d-flex flex-column flex-sm-row justify-content-between gap-2 mb-3">
          <button
            className="btn btn-success fs-6"
            style={{ backgroundColor: 'green', color: 'white' }}
            onClick={handleBuy}
          >
            Buy Now
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="22"
              fillRule="white"
              className="bi bi-bag-fill ms-3"
              viewBox="2 2 16 16"
            >
              <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1m3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4z" />
            </svg>
          </button>

          <button
            className="btn btn-info fs-6"
            style={{ backgroundColor: 'dodgerblue', color: 'white' }}
            onClick={handleAddToCart}
          >
            Add to Cart
          </button>

          <button className="btn btn-danger fs-6" onClick={handleWishList}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fillRule="currentColor"
              className="bi bi-heart-fill"
              viewBox="0 0 16 16"
            >
              <path
                fillRule="evenodd"
                d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314"
              />
            </svg>
          </button>
        </div>
      </div>

      <div className="button-container d-flex flex-column col-12 col-md-3 mt-3 mt-md-0">
        <div className="card"></div>
        <small className="text-secondary my-2 float-start pe-5">Category: {category}</small>
      </div>

      {alertInfo.show && (
        <AlertComponent
          type={alertInfo.type}
          message={alertInfo.message}
          onClose={closeAlert}
        />
      )}
    </article>
  );
};

export default Article;
