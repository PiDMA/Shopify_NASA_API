const container = document.querySelector('container')
const gallery = document.getElementById('gallery')
const popup = document.getElementById('popup')
const selectedImage = document.getElementById('selectedImage')
const imageNum = 3

//function returns a date between 2000 and today, many of the pre-2000 NASA photos are tiny and become stretched out when displayed
function randomDate() {
    var year = Math.floor(2000 + Math.random()*(2020 + 1 - 2000))
    var month = Math.floor(1 + Math.random()*(12 + 1 - 1))
    var day = Math.floor(1 + Math.random()*(27 + 1 - 1))

    year = parseInt(year)
    month = parseInt(month)
    day = parseInt(day)
    //return in proper format for API query
    return `${year}-${month}-${day}`
    
  }

function loadImages(){
    for(let i = 0; i < imageNum; i++){
        apiRequest()
    }
}

//load images when bottom of page is scrolled to
window.addEventListener('scroll',()=>{
    if(window.scrollY + window.innerHeight >= 
    document.documentElement.scrollHeight){
    loadImages();
    }
})

function displayImage(data){
    const img = document.createElement('img')
    img.src = `${data.url}`
    img.classList.add('galleryImg')
    img.addEventListener('click',() => {
        popup.style.transform = `translateY(0)`
        selectedImage.src = `${data.url}`
        selectedImage.alt = "image alt"
    })
    
    gallery.appendChild(img)
}

popup.addEventListener('click', () =>{
    popup.style.transform = 'translateY(-100%)'
    selectedImage.src = ''
    selectedImage.alt = ''
})

async function apiRequest(){
    let API_KEY = "Q2LdXP3zBuMGLMlpNdk4l8psELVEcq1xnxYe25jB"
    let date = randomDate()
    console.log(date)
    let response = await fetch(`https://api.nasa.gov/planetary/apod?api_key=${API_KEY}&date=${date}`)
    console.log(response)
    let data =   await response.json()
    console.log(data)
    if(data.media_type != 'video'){
        displayImage(data)
    }
}

// function useApiData(data){
//     displayImage(data)
// }