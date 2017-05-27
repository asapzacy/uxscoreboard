import { render } from 'react-dom'
import routes from './config/routes'
import Perf from 'react-addons-perf'
window.Perf = Perf

setTimeout(render(routes, document.getElementById('app'),0))
