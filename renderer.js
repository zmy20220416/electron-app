const information = document.querySelector('#info')
const setTitle = document.querySelector('#set_title')
const title = document.querySelector('#title')
const openFile = document.querySelector('#open_file')
const filePath = document.querySelector('#file_path')
const counter = document.querySelector('#counter')
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

window.versions.onUpdateCounter((value) => {
  const oldValue = Number(counter.innerText);
  const newValue = oldValue + value;
  counter.innerText = newValue;
  window.versions.counterValue(newValue);
})