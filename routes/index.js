import requireDir from 'require-dir'
var routes = requireDir('./api', { recurse: true });

export default {
  init: function(app) {
    for (var i in routes) {
      if (routes[i].init) {
        routes[i].init(app) 
      }
    }
  }
}