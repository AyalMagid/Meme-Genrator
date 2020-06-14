'use strict'

var gElCanvas;
var gCtx;
var gStrokeColor = 'black'
var gFillColor = 'white'
var gCurrImg
var gMeme
var gElMeme = document.querySelector('.meme-container')
var gElGallery = document.querySelector('.gallery-container')

function onInit() {
    gElCanvas = document.getElementById('my_canvas');
    gCtx = gElCanvas.getContext('2d');
    gMeme = getMeme()
    renderGallery()
    resizeCanvas(); 
}

// rendering the imgs gallery
function renderGallery() {
    var imgs = getImgs()
    var strHtmls = imgs.map(img => {
        return `<img onclick="onImageClick(this)" id="${img.id}" src="${img.url}" alt="${img.keywords}"> `
    })
    document.querySelector('.gallery-container').innerHTML = strHtmls.join('')
}

function renderSavedMemes() {
    if (document.body.classList.contains('menu-open')) {document.body.classList.remove('menu-open')}
    document.querySelector('.memes-container').classList.remove('display-none');
    var memes = loadFromStorage('savd-memes')
    if (!memes) {alert ('there are no saved memes yet!')}
    var strHtml = memes.map(meme => { return `<img src="${meme}" />`; }).join('')
    document.querySelector('.memes-container').innerHTML = strHtml
    document.querySelector('.gallery-container').classList.add('display-none');
}

function renderMeme() {
    resizeCanvas()
    clearCanvas()
    drawImg(gCurrImg)
        gMeme.lines.forEach(line => {
            drawTxt(line)
        });
        if (gMeme.lines.length) {document.querySelector('[name="text"]').value = gMeme.lines[gMeme.selectedLineIdx].txt}
}

function onImageClick(elImg) {
    shiftToMemeDisplay(elImg)
    resizeCanvas()
    resetMeme()
    renderMeme()
}

// when user choose an img - call other function on the server to update the selected img.  hide the gallery 
function shiftToMemeDisplay(elImg) {
    updateSelectedImg(elImg.id)
    gElMeme.classList.remove('display-none')
    gElMeme.classList.add('flex')
    gElGallery.classList.add('display-none')
    drawImg(elImg)
}

// shift back to gallery when btn clicked
function shiftToGalleryDisplay() {
    if (document.body.classList.contains('menu-open')) {document.body.classList.remove('menu-open')}
    document.querySelector('.memes-container').classList.add('display-none');
    gElMeme.classList.add('display-none')
    gElMeme.classList.remove('flex')
    gElGallery.classList.remove('display-none')
}

// draw the chosen img on canvas
function drawImg(elImg) {
    gCurrImg = elImg
    gCtx.drawImage(gCurrImg, 0, 0, gElCanvas.width, gElCanvas.height);
}


function drawTxt(line) {
    if (isSelectedLine(line)) {
        gCtx.fillStyle = `rgba(253, 200, 86, 0.5)`
        gCtx.fillRect(0, line.y - line.size+3, gElCanvas.width, line.size);
    }
    gCtx.fillStyle = line.color;
    gCtx.strokeStyle = line.stroke
    gCtx.lineWidth = '1';
    gCtx.font = `${line.size}px ${line.font}`;
    gCtx.textAlign = line.align;
    gCtx.fillText(line.txt, line.x, line.y);
    gCtx.strokeText(line.txt, line.x, line.y);
}

// Note: changing the canvas dimension this way clears the canvas
function resizeCanvas() {
    var elContainer = document.querySelector('.canvas-container');
    gElCanvas.width = elContainer.offsetWidth;
    gElCanvas.height = elContainer.offsetHeight;
    getCanvasDimensions (gElCanvas.width, gElCanvas.height)
}

// clear the canvas completely 
function clearCanvas() {
    gCtx.clearRect(0, 0, gElCanvas.width, gElCanvas.height)
}


// update the text on the meme
function onUpdateSelectedTxt(elTxt) {
    updateSelectedTxt(elTxt.value)
    renderMeme()
}

// change font size
function onChangeFontSize(diff) {
    changeFontSize(diff)
    renderMeme()
}

// change line location based on y position on canvas
function onChangeLineHeight(diff) {
    changeLineHeight(diff)
    renderMeme()
}

// focus on next line with each click
function onSwitchLine() {
    switchLine()
    // let elCurrLine = document.getElementById(`${gMeme.selectedLineIdx}`)
    // elCurrLine.focus()
    renderMeme()
}

// call the service function to change txt color and render
function onChangeTxtColor(color) {
    changeTxtColor(color)
    renderMeme()
}

// call the service function to change the txt ouline color and render
function onChangeStrokeColor(color) {
    changeStrokeColor(color)
    renderMeme()
}

// call the service function to update the model line - font family
function onChangeFontFamily(font) {
    changeFontFamily(font)
    renderMeme()
}

// call the service function to update the model line text - align direction
function onAlignLineText(direction) {
    alignLineText(direction)
    renderMeme()
}

// call the service function to update the model  - remove line
function onRemoveLine() {
    removeLine()
    renderMeme()
}

// get txt from input, call the service function to update the model  - add line
function onAddLine() {
    addLine()
    document.querySelector('[name="text"]').value = 'TYPE SOMETHING'
    renderMeme()
}

// download the meme
function onDownloadMeme(elLink) {
    const data = gElCanvas.toDataURL();
    elLink.href = data;
    elLink.download = 'my_meme';
}

// call the service to save the meme
function onSaveMeme() {
    let savedMeme = gElCanvas.toDataURL("image/png");
    saveMeme(savedMeme)
}

function onToggleMenu() {
    document.body.classList.toggle('menu-open');
}
