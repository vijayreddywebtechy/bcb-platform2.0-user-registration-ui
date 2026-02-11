/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: ["class"],
    content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
 
    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
  	extend: {
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		colors: {
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				light: 'hsl(var(--primary-light))',
  				medium: 'hsl(var(--primary-medium))',
  				dark: 'hsl(var(--primary-dark))',
  				deep: 'hsl(var(--primary-deep))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
        neutral: {
  				'100': 'hsl(220, 16%, 96%)', /* #F4F5F7 */
  				'150': 'hsl(0, 0%, 96%)', /* #F5F5F5 */
  				'200': 'hsl(214, 14%, 90%)', /* #E3E6EA */
  				'300': 'hsl(213, 13%, 83%)', /* #CED3D9 */
  				'500': 'hsl(211, 12%, 47%)', /* #697786 */
  				'600': 'hsl(0, 0%, 38%)', /* #616161 */
  				'700': 'hsl(213, 16%, 43%)', /* #5C6C80 */  // Input Border Color
  				'800': 'hsl(211, 17%, 33%)', /* #465463 */
  				'900': 'hsl(206, 24%, 17%)', /* #222E37 */
  				'950': 'hsl(213, 73%, 3%)'  /* #02070D */
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			}
  		},
      fontFamily: {
  			bspro: [
  				'var(--font-bspro)',
  				'sans-serif'
  			]
  		},
  	}
  },
  plugins: [require("tailwindcss-animate")],
}