import forms from '@tailwindcss/forms';
import typography from '@tailwindcss/typography';

export default {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      backdropBlur: {
        xs: '2px',  
        sm: '4px', 
        md: '10px', 
        lg: '20px', 
        xl: '40px',
      },
    },
  },
  plugins: [forms, typography],
};
