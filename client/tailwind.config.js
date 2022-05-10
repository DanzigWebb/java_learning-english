module.exports = {
    mode: "jit",
    purge: {
        content: [
            "./index.html",
            "./src/**/*.{js,ts,jsx,tsx}",
            "node_modules/@solsy/ui/**/*.{js,ts,jsx,tsx}"
        ],
    },
    plugins: [require("daisyui")],
}
