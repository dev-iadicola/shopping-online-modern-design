import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Stack from 'react-bootstrap/Stack';
import { MoonStar, Sparkles, SunMedium, TrendingUp } from 'lucide-react';
import Carusel from './Carusel.jsx';

const Header = ({ products, stats, theme, onThemeToggle }) => {
  const reviewCount = new Intl.NumberFormat('en-US').format(stats.totalReviews);

  return (
    <section className="hero-shell">
      <Row className="g-4 align-items-stretch">
        <Col lg={5}>
          <div className="hero-copy-panel">
         
            <h1 className="hero-title">Designed and built by Luigi Iadicola.</h1>
            <p className="hero-description">
              The current selection ranges from € {stats.minPrice.toFixed(2)} to
              {' '}€ {stats.maxPrice.toFixed(2)}, with an average catalog rating of
              {' '}{stats.averageRating}/5.
            </p>

            <Stack direction="horizontal" gap={3} className="hero-actions flex-wrap">
              <Button className="hero-primary-btn" size="lg">
                Browse catalog
                <Sparkles size={18} />
              </Button>
              <Button variant="link" className="hero-theme-btn" onClick={onThemeToggle}>
                {theme === 'light-mode' ? <MoonStar size={18} /> : <SunMedium size={18} />}
                Switch to {theme === 'light-mode' ? 'night mode' : 'day mode'}
              </Button>
            </Stack>

            <div className="hero-stats-grid">
              <div className="hero-stat-card">
                <span className="hero-stat-label">Catalog categories</span>
                <strong>{stats.totalCategories}</strong>
              </div>
              <div className="hero-stat-card">
                <span className="hero-stat-label">Catalog items</span>
                <strong>{stats.totalProducts}</strong>
              </div>
              <div className="hero-stat-card hero-stat-card-accent">
                <TrendingUp size={18} />
                <span>
                  {stats.averageRating}/5 average rating across {reviewCount} catalog reviews
                </span>
              </div>
            </div>
          </div>
        </Col>
        <Col lg={7}>
          <Carusel products={products} />
        </Col>
      </Row>
    </section>
  );
};

export default Header;
