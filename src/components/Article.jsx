import { useEffect, useState } from 'react';
import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Toast from 'react-bootstrap/Toast';
import { Heart, ShoppingBag, ShoppingCart, Star } from 'lucide-react';
import { handleProductImageError } from '../utils/productImageFallback';

const toastVariants = {
  buy: {
    title: 'Purchase ready',
    body: 'Your selection is ready for checkout.',
  },
  cart: {
    title: 'Added to cart',
    body: 'This piece has been added to your cart.',
  },
  wishlist: {
    title: 'Saved for later',
    body: 'This product is now in your wishlist.',
  },
};

const Article = ({ title, price, description, category, image, rating }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [toastKey, setToastKey] = useState('');

  useEffect(() => {
    if (!toastKey) {
      return undefined;
    }

    const timer = setTimeout(() => {
      setToastKey('');
    }, 2600);

    return () => clearTimeout(timer);
  }, [toastKey]);

  const preview = description.length > 118 && !isExpanded
    ? `${description.slice(0, 118)}...`
    : description;

  const currentToast = toastVariants[toastKey];

  return (
    <Card className="product-card border-0 h-100">
      <div className="product-card-media">
        <Badge pill className="product-card-badge">
          {category}
        </Badge>
        <img
          src={image}
          alt={title}
          className="product-card-image"
          loading="lazy"
          onError={handleProductImageError}
        />
      </div>

      <Card.Body className="d-flex flex-column product-card-body">
        <div className="product-card-topline">
          <div className="product-rating">
            <Star size={15} fill="currentColor" />
            <span>{(rating?.rate ?? 4.7).toFixed(1)}</span>
            <small>{rating?.count ?? 120} reviews</small>
          </div>
          <span className="product-price">€ {price.toFixed(2)}</span>
        </div>

        <Card.Title className="product-card-title">{title}</Card.Title>
        <Card.Text className="product-card-description">{preview}</Card.Text>

        <Button
          variant="link"
          className="product-readmore-btn"
          onClick={() => setIsExpanded((value) => !value)}
        >
          {isExpanded ? 'Show less' : 'Read more'}
        </Button>

        <div className="product-card-footer mt-auto">
          <Button className="product-buy-btn" onClick={() => setToastKey('buy')}>
            <ShoppingBag size={18} />
            Buy now
          </Button>
          <div className="product-quick-actions">
            <Button
              variant="light"
              className="product-icon-btn"
              onClick={() => setToastKey('cart')}
              aria-label={`Add ${title} to cart`}
            >
              <ShoppingCart size={18} />
            </Button>
            <Button
              variant="light"
              className="product-icon-btn"
              onClick={() => setToastKey('wishlist')}
              aria-label={`Save ${title} to wishlist`}
            >
              <Heart size={18} />
            </Button>
          </div>
        </div>
      </Card.Body>

      <Toast show={Boolean(currentToast)} onClose={() => setToastKey('')} className="product-toast">
        <Toast.Header closeButton>
          <strong className="me-auto">{currentToast?.title}</strong>
        </Toast.Header>
        <Toast.Body>{currentToast?.body}</Toast.Body>
      </Toast>
    </Card>
  );
};

export default Article;
