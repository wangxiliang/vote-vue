import {constantsRoutes} from 'router/routes'
export default {
  setRules(state, routes) {
    state.rules = constantsRoutes.concat(routes)
  }
}
