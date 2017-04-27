const ReactGA = require('react-ga')
ReactGA.initialize('UA-86342987-2')

export const logPage = () => {
  ReactGA.set({ page: window.location.pathname })
  ReactGA.pageview(window.location.pathname)
}
