<template>
  <div>
    <Nuxt />
  </div>
</template>

<style>
@font-face {
    font-family: Montserrat;
    src: url('../static/fonts/Montserrat-Thin.ttf');
}
@font-face {
    font-family: 'Calibre';
    src: local('Calibre Bold'), local('Calibre-Bold'),
        url('../static/fonts/Calibre-Bold.woff2') format('woff2'),
        url('../static/fonts/Calibre-Bold.woff') format('woff'),
        url('../static/fonts/Calibre-Bold.ttf') format('truetype');
    font-weight: 700;
    font-style: normal;
  }
html {
  overflow: hidden;
  font-family:
    Montserrat,
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    Roboto,
    'Helvetica Neue',
    Arial,
    sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
  background-color: black;
  color: #fff;
}

*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
}
</style>
