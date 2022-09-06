/** @type {import('tailwindcss').Config} */
module.exports = {
  presets: [require('../../tailwind.workspace.preset.js')],
  content: [],
    theme: {
        extend: {
            colors: {
                'my-white': '#ffffff',
                'my-grey': '#333333',
            },
        },
    },
  plugins: [],
}
