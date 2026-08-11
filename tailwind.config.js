/** Statischer Tailwind-Build (ersetzt cdn.tailwindcss.com) — bauen mit:
 *  npx tailwindcss@3.4.15 -c tailwind.config.js -i tailwind-input.css -o assets/css/tailwind.css --minify
 */
module.exports = {
    content: ['./index.html'],
    theme: {
        extend: {
            colors: {
                brand: {
                    slate: '#0f172a',
                    teal: '#2dd4bf',
                    light: '#f1f5f9',
                    muted: '#64748b'
                }
            },
            fontFamily: {
                sans: ['Montserrat', 'sans-serif'],
                serif: ['Playfair Display', 'serif']
            }
        }
    }
};
