'use strict'

const KEY = 'savd-memes'

var gSavedMemes = []

var gKeywords = { 'happy': 12, 'funny puk': 1 }

var gImgs = [
    { id: 1, url: 'img/1.jpg', keywords: ['president', 'arrogant'] },
    { id: 2, url: 'img/2.jpg', keywords: ['puppies', 'dog'] },
    { id: 3, url: 'img/3.jpg', keywords: ['dog', 'baby'] },
    { id: 4, url: 'img/4.jpg', keywords: ['cat', 'laptop'] },
    { id: 5, url: 'img/5.jpg', keywords: ['baby', 'determined'] },
    { id: 6, url: 'img/6.jpg', keywords: ['man', 'smile'] },
    { id: 7, url: 'img/7.jpg', keywords: ['black', 'baby', 'smile'] },
    { id: 8, url: 'img/8.jpg', keywords: ['man', 'purple', 'smile'] },
    { id: 9, url: 'img/9.jpg', keywords: ['evil', 'boy', 'smile', 'bastard'] },
    { id: 10, url: 'img/10.jpg', keywords: ['president', 'black', 'smile'] },
    { id: 11, url: 'img/11.jpg', keywords: ['black', 'man'] },
    { id: 12, url: 'img/12.jpg', keywords: ['glasses', 'man', 'point'] },
    { id: 13, url: 'img/13.jpg', keywords: ['actor', 'smile', 'leo'] },
    { id: 14, url: 'img/14.jpg', keywords: ['actor', 'glasses'] },
    { id: 15, url: 'img/15.jpg', keywords: ['actor', 'long hair'] },
    { id: 16, url: 'img/16.jpg', keywords: ['actor', 'smile', 'bastard'] },
    { id: 17, url: 'img/17.jpg', keywords: ['russion', 'president', 'putin'] },
    { id: 18, url: 'img/18.jpg', keywords: ['disney', 'movie', 'woodi', 'baz'] }
];

var gMeme = {
    selectedImgId: 0,
    selectedLineIdx: 0,
    lines: [{
        id:0,
        txt: 'TYPE SOMETHING',
        size: 40,
        align: 'center',
        color: 'white',
        stroke: 'orange',
        font: 'impact',
        x: 250,
        y: 50
    },

    {
        id:1,
        txt: 'TYPE SOMETHING',
        size: 40,
        align: 'center',
        color: 'white',
        stroke: 'black',
        font: 'impact',
        x: 250,
        y: 450
    },

    ]
}

var gNextId = gMeme.lines.length

// updating initial x and y pos by canvas dimensions
function  updateInitLinesCords(canvasWidth, canvasHeight) {
    gMeme.lines[0].x = canvasWidth/2
    gMeme.lines[0].y = canvasHeight / 10
    gMeme.lines[1].x = canvasWidth /2
    gMeme.lines[1].y = canvasHeight -  (canvasHeight / 10)
}

// initializing gMeme to the default of 2 lines

function initGmeme(elImg) {
    gMeme = {
        selectedImgId: elImg.id,
        selectedLineIdx: 0,
        lines: [{
            id:0,
            txt: 'TYPE SOMETHING',
            size: 40,
            align: 'center',
            color: 'white',
            stroke: 'orange',
            font: 'impact',
            x: 250,
            y: 50
        },
    
        {
            id:1,
            txt: 'TYPE SOMETHING',
            size: 40,
            align: 'center',
            color: 'white',
            stroke: 'black',
            font: 'impact',
            x: 250,
            y: 450
        },
    
        ]
    }

    gNextId = gMeme.lines.length
}

// update txt content
function updateSelectedTxt(txt) {
    gMeme.lines[gMeme.selectedLineIdx].txt = txt
}
// updagte the selected line by user
// function updateSelectedLine(inputId) {
//     gMeme.selectedLineIdx = +inputId;
// }

// switch between the edited text line
function switchLine() {
    gMeme.lines[gMeme.selectedLineIdx].stroke = 'black'
    gMeme.selectedLineIdx++
    if (gMeme.selectedLineIdx >= gMeme.lines.length) gMeme.selectedLineIdx = 0
    gMeme.lines[gMeme.selectedLineIdx].stroke = 'orange'
}

// updated the selected img for canvas by user choise from gallery
function updateSelectedImg (elImgId) {
    gMeme.selectedImgId = elImgId
}

function getImgs() {
    return gImgs
}

function getMeme() {
    return gMeme
}

function changeFontSize(diff) {
    gMeme.lines[gMeme.selectedLineIdx].size += diff;
}

// take the whole text upo or down on canvas
function changeLineHeight(diff) {
    gMeme.lines[gMeme.selectedLineIdx].y += diff;
}


// update txt color by user choise
function changeTxtColor(color) {
    gMeme.lines[gMeme.selectedLineIdx].color = color
}

// update the font-family 
function changeFontFamily(font) {
    gMeme.lines[gMeme.selectedLineIdx].font = font
}

// update line direction 
function alignLineText(direction) {
    gMeme.lines[gMeme.selectedLineIdx].align = direction
}

// remove line - making sure its ok to remove the last ones as well and set the selected idx (might be negative when there are no lines at all but go back to 0 normal with first line created)

function removeLine() {
    if (!gMeme.lines.length) {
        alert ('There are no lines to delete')
        return
    } 
    gMeme.lines.splice(gMeme.selectedLineIdx, 1)
    if (gMeme.lines.length===1) {
        gMeme.selectedLineIdx = 0
    } else if ((!gMeme.selectedLineIdx) && (gMeme.lines.length!==1)) {
        gMeme.selectedLineIdx = (gMeme.lines.length -1)
    } else {gMeme.selectedLineIdx --}
    if (gMeme.lines.length){ gMeme.lines[gMeme.selectedLineIdx].stroke = 'orange'}
    gNextId = gMeme.lines.length
}

// get txt from input, use create line function and push it to gmeme

function addLine() {
    if (gMeme.lines.length > 0) {gMeme.lines[gMeme.selectedLineIdx].stroke = 'black'}
    let line = _createLine ()
    console.log(line)
    gMeme.lines.push(line)
    gMeme.selectedLineIdx = line.id
}

// create the line object
function  _createLine () {
    return {
        id: gNextId++,
        txt: 'TYPE SOMETHING',
        size: 40,
        align: 'center',
        color: 'white',
        stroke: 'orange',
        font: 'impact',
        x: 250,
        y: 250
    }
}

// push the saved meme to the saved memes array and call other function to save it to the storage
function saveMeme (savedMeme) {
    gSavedMemes.push(savedMeme)
    _saveMemesToStorage()
}

// save the the updated memes array to storage
function _saveMemesToStorage() {
    saveToStorage(KEY, gSavedMemes)
}



