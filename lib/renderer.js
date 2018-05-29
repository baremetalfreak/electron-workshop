const electron = require('electron')
const ipc = electron.ipcRenderer
const $ = require('jquery')
const marked = require('marked')

const $markdownView = $('.raw-markdown')
const $htmlView = $('.rendered-html')
const $openFileButton = $('#open-file')
const $saveFileButton = $('#save-file')
const $copyHtmlButton = $('#copy-html')

ipc.on('sandwich', (event, file, content) => {
  $markdownView.val(content);
  renderMarkdownToHtml(content)
})

$markdownView.on('keyup', (event) => {
  const content = $(event.target).val()
  renderMarkdownToHtml(content)
})

function renderMarkdownToHtml (markdown) {
  const html = marked(markdown)
  $htmlView.html(html)
}

const remote = electron.remote

const mainProcess = remote.require('./main')
$openFileButton.on('click', () => {
  mainProcess.openFile()
})

const clipboard = remote.clipboard
$copyHtmlButton.on('click', () => {
  const html = $htmlView.html()
  clipboard.writeText(html)
})

$saveFileButton.on('click', () => {
  const html = $htmlView.html()
  mainProcess.saveFile(html)
})
