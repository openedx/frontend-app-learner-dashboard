const getOptimizely = () => {
  const prodSrc = `${process.env.MARKETING_SITE_BASE_URL}/optimizelyjs/${process.env.OPTIMIZELY_PROJECT_ID}.js`;
  const devSrc = `https://cdn.optimizely.com/js/${process.env.OPTIMIZELY_PROJECT_ID}.js`;
  const src = process.env.NODE_ENV === 'development' ? devSrc : prodSrc;

  return {
    src,
    async: true,
  };
};

export default getOptimizely;
