/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        shopee_orange: '#ee4d2d'
      },
      backgroundImage: {
        'shopee-login': "url('https://down-vn.img.susercontent.com/file/sg-11134004-7rdym-m0ihy05v3xyo0e&quot')"
      }
    }
  },
  plugins: []
}
