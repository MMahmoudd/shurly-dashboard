const middleware = {}

middleware['authenticated'] = require('../middleware/authenticated.js')
middleware['authenticated'] = middleware['authenticated'].default || middleware['authenticated']

middleware['route'] = require('../middleware/route.js')
middleware['route'] = middleware['route'].default || middleware['route']

middleware['unauthenticated'] = require('../middleware/unauthenticated.js')
middleware['unauthenticated'] = middleware['unauthenticated'].default || middleware['unauthenticated']

export default middleware
