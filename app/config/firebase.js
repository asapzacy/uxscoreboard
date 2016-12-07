import Rebase from 're-base'

const base = Rebase.createClass({
  apiKey: 'AIzaSyAwOMmYoSMg4Mq1kT0NIWGpc6nb_AmiqsE',
  authDomain: 'uxscoreboard.firebaseapp.com',
  databaseURL: 'https://uxscoreboard.firebaseio.com'
})

export default base

// MlbContainer.js
//
// componentWillMount() {
//   this.ref = base.syncState(this.props.location.pathname, {
//     context: this,
//     state: 'scores'
//   })
// }
// componentWillUnmount() {
//   base.removeBinding(this.ref)
// }
