const requireAll = requireContext => requireContext.keys().map(requireContext);
const svgs = require.context("../icons", false, /\.svg$/);
requireAll(svgs);
