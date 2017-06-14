require('./index.html')
require('./app/app')

/* Hot module replacement */
if (module.hot) {
    module.hot.accept()
}