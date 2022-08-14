/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],

    theme: {
        extend: {
            colors: {
                theme: {
                    gray: "#3C3744",
                    white: "#FBFFF1",
                    lightblue: "#B4C5E4",
                    mediumblue: "#3066BE",
                    darkblue: "#090C9B"
                }
            }
        },
    },
    plugins: [],
}