/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/**/*.{js,jsx,ts,tsx}",
        "./App.{js,jsx,ts,tsx}"
    ],
    presets: [require("nativewind/preset")],
    theme: {
        extend: {
            colors: {
                "dark": "#262626",
                "gray": "#8B8B8B",
                "brand": "#F24942"
            }
        },
    },
    plugins: [],
}