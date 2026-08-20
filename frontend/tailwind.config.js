/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        emerald: {
          DEFAULT: '#1B5744',
          50: '#EDF4F1',
          100: '#D2E5DD',
          200: '#A6CDBC',
          300: '#78B29A',
          400: '#4E9479',
          500: '#2C7159',
          600: '#1B5744',
          700: '#133F32',
          800: '#0C2B22',
          900: '#061712',
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
          300: '#EBE1B5',
          
        },
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
        charcoal: '#20241F',
      },
      fontFamily: {
        display: ['"Playfair Display"', 'serif'],
        accent: ['"Cormorant Garamond"', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 10px 34px -12px rgba(12, 43, 34, 0.22)',
        card: '0 4px 20px rgba(20, 30, 25, 0.06)',
        gold: '0 8px 24px rgba(201, 162, 75, 0.28)',
        emerald: '0 8px 28px rgba(27, 87, 68, 0.25)',
      },
      borderRadius: {
        xl2: '1.25rem',
        xl3: '1.75rem',
      },
      backgroundImage: {
        'gold-gradient': 'linear-gradient(135deg, #E9CE87 0%, #C9A24B 50%, #A9822F 100%)',
        'ink-gradient': 'linear-gradient(135deg, #2E2A26 0%, #17140F 100%)',
        'emerald-gradient': 'linear-gradient(135deg, #236B54 0%, #133F32 60%, #0C2B22 100%)',
        'maroon-gradient': 'linear-gradient(135deg, #8E2534 0%, #671A24 100%)',
        'ivory-radial': 'radial-gradient(circle at top right, #FBF6EE 0%, #F6EBDA 100%)',
      },
      animation: {
        'fade-in': 'fadeIn 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'rise-in': 'riseIn 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        float: 'float 7s ease-in-out infinite',
        shimmer: 'shimmer 1.6s infinite linear',
        'draw-line': 'drawLine 1.2s cubic-bezier(0.65, 0, 0.35, 1) forwards',
      },
      keyframes: {
        fadeIn: { '0%': { opacity: 0 }, '100%': { opacity: 1 } },
        riseIn: {
          '0%': { opacity: 0, transform: 'translateY(28px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-1000px 0' },
          '100%': { backgroundPosition: '1000px 0' },
        },
        drawLine: {
          '0%': { strokeDashoffset: 1000 },
          '100%': { strokeDashoffset: 0 },
        },
      },
    },
  },
  plugins: [],
}
