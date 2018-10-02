module.exports = {
  verbose: true,
  globals: {},
  setupFiles: ['<rootDir>/jest/setup.js'],
  moduleFileExtensions: ['js'],
  moduleDirectories: ['<rootDir>/src', 'node_modules'],
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/jest/fileMock.js',
    '\\.(scss|css)$': 'identity-obj-proxy',
    '^components$': '<rootDir>/src/components/index.js',
    '^containers$': '<rootDir>/src/containers/index.js'
  }
}
