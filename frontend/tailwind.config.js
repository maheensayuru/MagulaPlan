/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        maroon: {
          DEFAULT: '#7A1F2B',
          50: '#FBEEEF',
          100: '#F3D4D7',
          200: '#E4A7AD',
          300: '#D17983',
          400: '#B84B58',
          500: '#7A1F2B',
          600: '#671A24',
          700: '#54151D',
          800: '#411017',
          900: '#2E0B10',
        },
        gold: {
          DEFAULT: '#C9A24B',
          50: '#FBF6EA',
          100: '#F5E9C8',
          200: '#EBD696',
          300: '#DFC069',
          400: '#D3AE52',
          500: '#C9A24B',
          600: '#A9822F',
          700: '#836324',
          800: '#5D461A',
          900: '#392A0F',
        },
        ivory: {
          DEFAULT: '#FBF6EE',
          50: '#FFFFFF',
          100: '#FBF6EE',
          200: '#F6EBDA',
        },
        emerald: {
          DEFAULT: '#1E5B4F',
          50: '#E7F1EE',
          100: '#C4DFD7',
          400: '#2B7E6C',
          500: '#1E5B4F',
          600: '#164A40',
        },
        charcoal: '#2B2730',
      },
      fontFamily: {
        display: ['"Playfair Display"', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 10px 30px -10px rgba(122, 31, 43, 0.15)',
        card: '0 4px 20px rgba(43, 39, 48, 0.06)',
        gold: '0 8px 24px rgba(201, 162, 75, 0.25)',
      },
      borderRadius: {
        xl2: '1.25rem',
        xl3: '1.75rem',
      },
      backgroundImage: {
        'gold-gradient': 'linear-gradient(135deg, #E9CE87 0%, #C9A24B 50%, #A9822F 100%)',
        'maroon-gradient': 'linear-gradient(135deg, #8E2534 0%, #671A24 100%)',
        'ivory-radial': 'radial-gradient(circle at top right, #FBF6EE 0%, #F6EBDA 100%)',
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out forwards',
        'slide-up': 'slideUp 0.6s ease-out forwards',
        float: 'float 6s ease-in-out infinite',
        shimmer: 'shimmer 1.6s infinite linear',
      },
      keyframes: {
        fadeIn: { '0%': { opacity: 0 }, '100%': { opacity: 1 } },
        slideUp: {
          '0%': { opacity: 0, transform: 'translateY(24px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-1000px 0' },
          '100%': { backgroundPosition: '1000px 0' },
        },
      },
    },
  },
  plugins: [],
}
