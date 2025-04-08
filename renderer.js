const information = document.querySelector('#info')
information.innerText = `This app is using Chrome (v${versions.chrome()}), Node.js (v${versions.node()}), and Electron (v${versions.electron()})`

const fn = async () => {
  const res = await window.versions.ping();
  console.log(res)
}
fn()
