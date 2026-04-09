export const PRODUCT_IMAGE_FALLBACK = '/product-placeholder.svg';

export const handleProductImageError = (event) => {
  const image = event.currentTarget;

  if (image.dataset.fallbackApplied === 'true') {
    return;
  }

  image.dataset.fallbackApplied = 'true';
  image.src = PRODUCT_IMAGE_FALLBACK;
};
