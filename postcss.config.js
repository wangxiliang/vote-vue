module.exports = {
  plugins: [
    require('autoprefixer')({
      overrideBrowserslist: [
        'last 5 versions',
        'Firefox >= 20',
        'Android >= 4.0',
        'iOS >= 8',
        "ie >= 9"
      ],
      grid: true
    })
  ]
}
