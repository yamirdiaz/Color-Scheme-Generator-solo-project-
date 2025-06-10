const colorContainerElements = document.getElementsByClassName('color')
const colorNameElement = document.getElementsByClassName('color-name')


const convertHexToHexString = (hex) => {
    let hexArr = hex.split("")
    hexArr.shift()
    return hexArr.join("").toUpperCase()    
}

const renderColors = (colorsArr) => {
    colorsArr.forEach(( color, index )=> {
        const colorHex = color.hex.value
        colorContainerElements[index].style.backgroundColor = colorHex
        colorContainerElements[index].dataset.color = colorHex
        colorNameElement[index].textContent = colorHex
    })
}

async function copyTextToClipboard(text) {
  try {
    await navigator.clipboard.writeText(text);
    console.log('Text copied to clipboard');
  } catch (err) {
    console.error('Failed to copy text: ', err);
  }
}
    

document.addEventListener("click", (e) => {
    if(e.target.id === 'btn') {
        e.preventDefault()
        
        const inputColorValue = document.getElementById('input-color').value
        const schemeValue = document.getElementById('schemes').value 
        
        fetch(`https://www.thecolorapi.com/scheme?hex=${convertHexToHexString(inputColorValue)}&mode=${schemeValue}&count=5`)
            .then(res => res.json())
            .then(data => renderColors(data.colors))
    }
    else if (e.target.dataset.color) {
        copyTextToClipboard(e.target.dataset.color)
    }
})
