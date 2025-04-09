const information = document.querySelector('#info')
const setTitle = document.querySelector('#set_title')
const title = document.querySelector('#title')
information.innerText = `This app is using Chrome (v${versions.chrome()}), Node.js (v${versions.node()}), and Electron 
(v${versions.electron()})`

setTitle.addEventListener('click', () => {
  const titleValue = title.value;
  window.versions.setTitle(titleValue)
})
