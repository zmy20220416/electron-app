const information = document.querySelector('#info')
const setTitle = document.querySelector('#set_title')
const title = document.querySelector('#title')
const openFile = document.querySelector('#open_file')
const filePath = document.querySelector('#file_path')
information.innerText = `This app is using Chrome (v${versions.chrome()}), Node.js (v${versions.node()}), and Electron 
(v${versions.electron()})`

setTitle.addEventListener('click', () => {
  const titleValue = title.value;
  window.versions.setTitle(titleValue)
})

openFile.addEventListener('click', async () => {
  const path = await window.versions.openFile()
  filePath.innerText = path
})
