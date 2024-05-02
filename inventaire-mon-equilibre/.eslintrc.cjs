module.exports = {
  extends: ["airbnb", "prettier"],
  plugins: ["prettier"],
  rules: {
    "prettier/prettier": ["error"],
    "react/jsx-filename-extension": [1, { extensions: [".js", ".jsx"] }],
  },
};
