module.exports = {
  theme: {
    extend: {
      colors: {
        'my-white': '#ffffff',
        'my-grey': '#333333',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require('@tailwindcss/typography')],
};
