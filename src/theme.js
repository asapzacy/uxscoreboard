const bps = {
  small: 335,
  medium: 667,
  large: 999,
  xlarge: 1331,
  xxlarge: 1663
}

const theme = {
  colors: {
    white: '#ffffff', // real_white
    black: '#000000', // real_black
    red: '#ba0021', // red
    green: '#00ba21', // green
    grey: [
      '#f5f5f5', // 0
      '#f0f0f0', // 1
      '#e0e0e0', // 2
      '#d3d3d3', // 3
      '#9b9b9b', // 4
      '#656565', // 5
      '#3f3f3f', // 6
      '#323232', // 7
      '#070707' // 8
    ]
  },
  mq: size => {
    const bpTuples = Object.keys(bps).map(key => [key, bps[key]])
    const [result] = bpTuples.reduce((arr, [name, width]) => {
      if (name === size) {
        arr = [...arr, `@media (min-width: ${width}px)`]
      }
      return arr
    }, [])

    return result
  }
}

export default theme
