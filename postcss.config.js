// module.exports = {
//   plugins: {
//     tailwindcss: {},
//     autoprefixer: {},

//   },
// };

module.exports = {
  plugins: [
    'tailwindcss/nesting',
    'tailwindcss',
    'postcss-nested',
    'autoprefixer',
  ],
};

// module.exports = {
//   plugins: [
//     'tailwindcss/nesting',
//     "tailwindcss",
//     "postcss-nested",
//     "autoprefixer",
//     "postcss-flexbugs-fixes",
//     // "postcss-purgecss",
//     // ...(process.env.NODE_ENV === "production" ? "postcss-purgecss" : ""),
//   ],
// };
