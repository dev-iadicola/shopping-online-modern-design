import Badge from 'react-bootstrap/Badge';
import { ArrowRight, Star } from 'lucide-react';
import { Autoplay, Keyboard, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { handleProductImageError } from '../utils/productImageFallback';
import 'swiper/css';
import 'swiper/css/pagination';

const Carusel = ({ products }) => {
  if (!products.length) {
    return (
      <div className="hero-carousel-empty">
        <p>Featured products will appear here once the catalog is available.</p>
      </div>
    );
  }

  return (
    <div className="hero-carousel-panel">
      <Swiper
        modules={[Autoplay, Keyboard, Pagination]}
        slidesPerView={1}
        spaceBetween={24}
        loop={products.length > 1}
        keyboard
        pagination={{ clickable: true }}
        autoplay={{ delay: 3600, disableOnInteraction: false }}
        className="hero-swiper"
      >
        {products.map((product) => (
          <SwiperSlide key={product.id}>
            <article className="hero-slide-card">
              <div className="hero-slide-media">
                <div className="hero-slide-orb hero-slide-orb-one"></div>
                <div className="hero-slide-orb hero-slide-orb-two"></div>
                <img
                  src={product.image}
                  alt={product.title}
                  className="hero-slide-image"
                  onError={handleProductImageError}
                />
              </div>

              <div className="hero-slide-content">
                <Badge pill className="hero-slide-category">
                  {product.category}
                </Badge>

                <div className="hero-slide-rating">
                  <Star size={16} fill="currentColor" />
                  <span>{(product.rating?.rate ?? 4.8).toFixed(1)} / 5</span>
                  <small>{product.rating?.count ?? 120} reviews</small>
                </div>

                <h2>{product.title}</h2>
                <p>{product.description}</p>

                <div className="hero-slide-footer">
                  <div>
                    <span className="hero-slide-price-label">Price</span>
                    <strong>€ {product.price.toFixed(2)}</strong>
                  </div>
                  <span className="hero-slide-link">
                    See details
                    <ArrowRight size={18} />
                  </span>
                </div>
              </div>
            </article>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Carusel;
