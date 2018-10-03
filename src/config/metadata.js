export const updatePageInfo = ({ title, desc }) => {
  document.title = title
  document.getElementsByTagName('meta')['description'].content = desc
}
