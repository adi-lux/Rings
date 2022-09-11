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
                    black: "#04080F",
                    mediumblue: "#507DBC",
                    babyblue: "#A1C6EA",
                    lightblue: "#BBD1EA"
                }
            }
        },
    },
    plugins: [],
}