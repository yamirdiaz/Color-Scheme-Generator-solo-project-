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
    

document.addEventListener("click", (e) => {
    if(e.target.id === 'btn') {
        e.preventDefault()        
        const inputColorValue = document.getElementById('input-color').value
        const schemeValue = document.getElementById('schemes').value 
        
        fetch(`https://www.thecolorapi.com/scheme?hex=${convertHexToHexString(inputColorValue)}&mode=${schemeValue}&count=5`)
            .then(res => res.json())
            .then(data => renderColors(data.colors))
    } else if (e.target.dataset.color | e.target.getAttribute('data-color')) {
        document.execCommand('copy')      
    }
    
    
})

document.addEventListener('copy', function(e){
  e.clipboardData.setData('text/plain', e.target.dataset.color);
  console.log("Message Coppies to the clip board")
  e.preventDefault(); // default behaviour is to copy any selected text
});
