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
        return `<img onclick="shiftDisplayToMeme(this)" id="${img.id}" src="${img.url}" alt="${img.keywords}"> `
    })
    document.querySelector('.gallery-container').innerHTML = strHtmls.join('')
    
}

function renderSavedMemes() {
    document.querySelector('.memes-container').classList.remove('display-none');
    var memes = loadFromStorage('savd-memes')
    var strHtml = memes.map(meme => { return `<img src="${meme}" />`;} ).join('')
    document.querySelector('.memes-container').innerHTML = strHtml
    document.querySelector('.gallery-container').classList.add('display-none');
}

// rendering the meme working on
function renderMeme() {
    clearCanvas()
    drawImg(gCurrImg)
    if (gMeme.selectedLineIdx >= 0) {
        gMeme.lines.forEach(line => {
            drawTxt(line)
        });
        document.querySelector('[name="text"]').value = gMeme.lines[gMeme.selectedLineIdx].txt
    }
}

// when user choose an img shows the canvas ask server to update selected img. draw the img & hide the gallery 

function shiftDisplayToMeme(elImg) {
    updateSelectedImg(elImg.id)
    gElMeme.classList.remove('display-none')
    gElMeme.classList.add('flex')
    resizeCanvas()
    updateInitLinesCords(gElCanvas.width, gElCanvas.height)
    gElGallery.classList.add('display-none')
    drawImg(elImg)
    initGmeme(elImg)
    renderMeme()
}

// shift back to gallery when btn clicked
function shiftDisplayToGallery() {
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
}

// clear the canvas completely 
function clearCanvas() {
    gCtx.clearRect(0, 0, gElCanvas.width, gElCanvas.height)
}

// update the model with the right line
// function onUpdateSelectedLine(elInput) {
//     updateSelectedLine(elInput.id)
// }

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

// call the service function to change txt color
function onChangeTxtColor(color){
    console.log(color)
    changeTxtColor(color)
    renderMeme()
}

// function onChangeTxtStroke(strokeColor) {
//     changeTxtStroke(strokeColor)
//     renderMeme()
// }

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
    saveMeme (savedMeme)
}

function onToggleMenu() {
    document.body.classList.toggle('menu-open');
}
