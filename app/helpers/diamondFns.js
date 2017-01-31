
export const createDiamondImg = (runners) => {
  let file = 'diamond'
  if (!runners) return file
  if (runners.runner_on_1b) file += '_1b'
  if (runners.runner_on_2b) file += '_2b'
  if (runners.runner_on_3b) file += '_3b'
  return file
}
