/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,jsx}"],
    theme: {
        extend: {
            fontFamily: {
                poppins: ["Poppins", "sans-serif"],
            },
            colors: {
                dark_green: {
                    100: "#ccd3d1",
                    200: "#99a7a4",
                    300: "#667c76",
                    400: "#335049",
                    500: "#00241b",
                    600: "#001d16",
                    700: "#001610",
                    800: "#000e0b",
                    900: "#000705",
                },

                celadon: {
                    100: "#e9faee",
                    200: "#d4f5dd",
                    300: "#beefcd",
                    400: "#a9eabc",
                    500: "#93e5ab",
                    600: "#76b789",
                    700: "#588967",
                    800: "#3b5c44",
                    900: "#1d2e22",
                },
            },
        },
    },
    plugins: [],
};
