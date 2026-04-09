import { useEffect, useState } from 'react';
import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Placeholder from 'react-bootstrap/Placeholder';
import Row from 'react-bootstrap/Row';
import Stack from 'react-bootstrap/Stack';
import { PackageCheck, ShieldCheck, Sparkles, Truck } from 'lucide-react';
import { ProductsAPI } from '../data/apiProducts';
import useFetch from './useFetch';
import Article from './Article.jsx';
import Header from './Header.jsx';

const getValueFromLocalStorage = () => {
  return localStorage.getItem('theme') || 'light-mode';
};

const ProductSkeleton = () => (
  <Card className="product-card border-0 h-100 skeleton-card">
    <Placeholder as="div" animation="glow" className="product-skeleton-media">
      <Placeholder xs={12} className="h-100 rounded-4" />
    </Placeholder>
    <Card.Body>
      <Placeholder as={Card.Title} animation="glow">
        <Placeholder xs={8} />
      </Placeholder>
      <Placeholder as={Card.Text} animation="glow">
        <Placeholder xs={12} /> <Placeholder xs={10} /> <Placeholder xs={7} />
      </Placeholder>
      <Placeholder.Button variant="light" xs={12} className="rounded-pill mt-3" />
    </Card.Body>
  </Card>
);

function Shop() {
  const [theme, setTheme] = useState(getValueFromLocalStorage());
  const { data, isLoading, error } = useFetch(ProductsAPI);

  useEffect(() => {
    document.documentElement.className = theme;
    localStorage.setItem('theme', theme);
  }, [theme]);

  const featuredProducts = [...data]
    .sort((a, b) => (b.rating?.rate ?? 0) - (a.rating?.rate ?? 0))
    .slice(0, 5);

  const categories = [...new Set(data.map((product) => product.category))];
  const categoryCounts = categories
    .map((category) => ({
      category,
      count: data.filter((product) => product.category === category).length,
    }))
    .sort((first, second) => second.count - first.count);
  const topCategory = categoryCounts[0];
  const totalReviews = data.reduce((total, product) => total + (product.rating?.count ?? 0), 0);
  const averageRating = data.length
    ? (
        data.reduce((total, product) => total + (product.rating?.rate ?? 0), 0) / data.length
      ).toFixed(1)
    : '0.0';
  const prices = data.map((product) => product.price);
  const minPrice = prices.length ? Math.min(...prices) : 0;
  const maxPrice = prices.length ? Math.max(...prices) : 0;
  const averagePrice = prices.length
    ? (prices.reduce((total, price) => total + price, 0) / prices.length).toFixed(2)
    : '0.00';
  const heroStats = {
    totalCategories: categories.length,
    totalProducts: data.length,
    totalReviews,
    averageRating,
    minPrice,
    maxPrice,
  };
  const infoCards = [
    {
      icon: Truck,
      title: 'Price range',
      text: `Current catalog pricing runs from € ${minPrice.toFixed(2)} to € ${maxPrice.toFixed(2)}.`,
    },
    {
      icon: ShieldCheck,
      title: 'Average ticket',
      text: `The mean listed price is € ${averagePrice}, based on ${data.length || 0} active items.`,
    },
    {
      icon: PackageCheck,
      title: 'Largest category',
      text: topCategory
        ? `${topCategory.category} currently has ${topCategory.count} products in the catalog.`
        : 'Category mix will appear once catalog data is available.',
    },
  ];

  const toggleTheme = () => {
    setTheme((current) => (current === 'light-mode' ? 'dark-mode' : 'light-mode'));
  };

  return (
    <main className="shop-page">
      <a
        href="https://iadicola.netsons.org/contatti"
        target="_blank"
        rel="noopener noreferrer"
        className="contact-fixed-btn"
      >
        Contact me
      </a>
      <div className="shop-bg shop-bg-left"></div>
      <div className="shop-bg shop-bg-right"></div>
      <Container className="shop-shell py-4 py-lg-5">
        <section className="masthead-bar">
          <div>
            <p className="masthead-label">Shop Online</p>
            <h2>Modern E-commerce</h2>
          </div>
          <Button variant="link" className="masthead-theme-link" onClick={toggleTheme}>
            Theme: {theme === 'light-mode' ? 'Light' : 'Dark'}
          </Button>
        </section>

        <Header
          products={featuredProducts}
          stats={heroStats}
          theme={theme}
          onThemeToggle={toggleTheme}
        />

        <Row className="g-3 feature-strip">
          {infoCards.map((item) => {
            const Icon = item.icon;

            return (
              <Col md={4} key={item.title}>
                <Card className="info-card border-0 h-100">
                  <Card.Body>
                    <span className="info-card-icon">
                      <Icon size={18} />
                    </span>
                    <h3>{item.title}</h3>
                    <p>{item.text}</p>
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
        </Row>

        <section className="catalog-toolbar">
          <div>
            <p className="catalog-kicker">Curated inventory</p>
            <h2>Current products available in the catalog.</h2>
            <p className="catalog-copy">
              Product cards below are rendered from the local dataset used by the storefront, with
              category, pricing, imagery, and review information shown directly from source data.
            </p>
          </div>
          <Stack direction="horizontal" gap={2} className="category-stack flex-wrap">
            {categories.map((category) => (
              <Badge pill key={category} className="category-pill">
                {category}
              </Badge>
            ))}
            {!categories.length && !isLoading ? (
              <Badge pill className="category-pill category-pill-muted">
                Catalog syncing
              </Badge>
            ) : null}
          </Stack>
        </section>

        {error ? (
          <Card className="error-card border-0">
            <Card.Body>
              <div className="error-card-icon">
                <Sparkles size={18} />
              </div>
              <h3>Unable to load the collection right now.</h3>
              <p>{error}</p>
            </Card.Body>
          </Card>
        ) : null}

        <Row className="g-4 product-grid">
          {isLoading
            ? Array.from({ length: 6 }).map((_, index) => (
                <Col md={6} xl={4} key={`skeleton-${index}`}>
                  <ProductSkeleton />
                </Col>
              ))
            : data.map((product) => (
                <Col md={6} xl={4} key={product.id}>
                  <Article {...product} />
                </Col>
              ))}
        </Row>

        <footer className="site-footer">
          <p>
            Powered by{' '}
            <a
              href="https://iadicola.netsons.org/"
              target="_blank"
              rel="noreferrer"
              className="site-footer-link"
            >
              Luigi Iadicola
            </a>
          </p>
        </footer>
      </Container>
    </main>
  );
}

export default Shop;
