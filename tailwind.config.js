const config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,css}'],
  corePlugins: {
    preflight: false
  },
  important: '#__next',
  plugins: [require('tailwindcss-logical'), require('./src/@core/tailwind/plugin')],
  theme: {
    extend: {
      colors: {
        red: {
          500: '#E64449',
          100: 'rgba(255, 76, 81, 0.16)'
        },
        green: {
          500: '#24B364',
          100: 'rgba(40, 199, 111, 0.16)'
        },
        grey: {
          500: '#999CA6',
          600: '#827D8B',
          800: '#808390',
          400: 'rgb(47 43 61 / 0.22)',
          700: 'rgb(225 222 245 / 0.22)',
          100: 'rgba(128, 131, 144, 0.16)'
        },
        main: {
          500: '#675DD8',
          100: '#C7C2F9',
          700: '#CC63FE'
        },
        blue: {
          500: '#00A7BC',
          100: 'rgba(0, 186, 209, 0.16)'
        },
        warning: {
          500: '#FF9F43',
          100: 'rgba(255, 159, 67, 0.16)'
        },
        male: {
          500: '#00BAD1'
        },
        female: {
          500: '#FF7074'
        },
        not: {
          500: '#E1DEF58C'
        },
        status: {
          'active-text': '#28C76F',
          'active-bg': '#28C76F29',
          'stranger-text': '#FF9F43',
          'stranger-bg': '#FF9F4329',
          'clean-text': '#00BAD1',
          'clean-bg': '#00BAD129',
          'loss-text': '#FF4C51',
          'loss-bg': '#FF4C5129',
          'at-work-text': '#7367F0',
          'at-work-bg': '#7367F029'
        }
      }
    }
  }
}

export default config
