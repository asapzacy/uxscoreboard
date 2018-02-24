import React, { Component, Fragment } from 'react'
import { PreComponent } from 'components'
import PropTypes from 'prop-types'

class ReactDinoContainer extends Component {
  static propTypes = {
    data: PropTypes.oneOfType([
      PropTypes.array,
      PropTypes.bool,
      PropTypes.number,
      PropTypes.object,
      PropTypes.string
    ]),
    validateData: PropTypes.func.isRequired,
    seconds: PropTypes.number
  }
  static defaultProps = { seconds: 0 }
  state = { isLoading: false }
  componentDidMount() {
    this.setState({ isLoading: true }, () => {
      this.renderComponent(this.props.data)
    })
  }
  componentWillReceiveProps(nextProps) {
    this.renderComponent(nextProps.data)
  }
  componentWillUnmount() {
    clearTimeout(this.timeout)
  }
  renderComponent = data => {
    if (this.state.isLoading && this.props.validateData(data)) {
      this.fadeInComponent()
    }
  }
  fadeInComponent = () => {
    this.timeout = setTimeout(() => {
      this.setState({ isLoading: false })
    }, this.props.seconds * 1000)
  }
  render() {
    console.log('rendered')
    if (this.state.isLoading) {
      return (
        <ReactDino {...this.props}>
          {this.props.render(this.state)}
        </ReactDino>
      )
    } else {
      return this.props.render(this.state)
    }
  }
}

export default ReactDinoContainer
