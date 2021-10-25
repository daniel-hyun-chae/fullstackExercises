module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      backgroundImage: (theme) => ({
        login: 'url("./images/blog.jpg")',
      })
    },
  },
  variants: {
    extend: {
      fontWeight: ['hover', 'focus']
    },
  },
  plugins: [],
}
