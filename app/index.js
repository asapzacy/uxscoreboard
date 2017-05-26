import { render } from 'react-dom'
import routes from './config/routes'

setTimeout(render(routes, document.getElementById('app')),0)
