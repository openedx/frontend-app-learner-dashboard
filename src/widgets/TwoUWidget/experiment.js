const activateExperiment = (isEnterpriseUser) => {
  if (window.optimizely) {
    window.optimizely.push({
      type: 'user',
      attributes: {
        isEnterpriseUser,
      },
    });
    window.optimizely.push({
      type: 'page',
      pageName: 'van_1225_merchandise_2u_lobs_on_learner_home',
    });
  }
};

const isUserInVariation = () => {
  const experimentId = process.env.MERCHANDISE_2U_LOB_EXP_ID;
  if (window.optimizely) {
    const selectedVariant = window.optimizely.get('state').getVariationMap()[experimentId];
    return selectedVariant?.name === 'dashboard_with_2u_lobs';
  }
  return false;
};

export { activateExperiment, isUserInVariation };
