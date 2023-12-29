//phone block

const phoneInput = document.querySelector('#phone_input')
const phoneButton = document.querySelector('#phone_button')
const phoneResult = document.querySelector('#phone_result')

const regExp = /^\+996 [25793]\d{2} \d{2}-\d{2}-\d{2}$/
phoneButton.onclick = () => {
    if (regExp.test(phoneInput.value)){
        phoneResult.innerHTML = '&#9787;'
        phoneResult.style.color = 'green'
    }else {
        phoneResult.innerHTML = '&#9785;'
        phoneResult.style.color = 'red'
    }
}

//TABS
const tabContentBlocks = document.querySelectorAll('.tab_content_block')
const tabs = document.querySelectorAll('.tab_content_item')
const tabsParent = document.querySelector('.tab_content_items')

const hideTabContent = ()=>{
    tabContentBlocks.forEach(tabCard =>{
        tabCard.style.display = 'none'
    })
    tabs.forEach(tab =>{
        tab.classList.remove('tab_content_item_active')
    })
}

const showTabContent = (tabIndex = 0)=>{
    tabContentBlocks[tabIndex].style.display = 'block'
    tabs[tabIndex].classList.add('tab_content_item_active')
}

hideTabContent()
showTabContent()

tabsParent.onclick = (event) => {
    if (event.target.classList.contains('tab_content_item')){
        tabs.forEach((tab, tabIndex) => {
            if (event.target === tab){
                hideTabContent()
                showTabContent(tabIndex)
            }
        })
    }
}

const tabsAuto = (i = 0) => {
    setInterval(() => {
        i++
        if (i > tabContentBlocks.length - 1){
            i = 0
        }
        hideTabContent()
        showTabContent(i)
    }, 3000)
}
tabsAuto()


//CONVERTER
// Home work 5
const som = document.querySelector('#som')
const usd = document.querySelector('#usd')
const eur = document.querySelector('#eur')

// const converter = (element, targetElement, targetElement2, current) => {
//     element.oninput = () => {
//         const xhr = new XMLHttpRequest()
//         xhr.open('GET', '../data/converter.json')
//         xhr.setRequestHeader('Content-type', 'application/json')
//         xhr.send()
//         xhr.onload = () =>{
//             const data = JSON.parse(xhr.response)
//
//             switch (current) {
//                 case "som":
//                     targetElement.value = (element.value / data.usd).toFixed(2)
//                     targetElement2.value = (element.value / data.eur).toFixed(2)
//                     break
//                 case "usd":
//                     targetElement.value = (element.value * data.usd ).toFixed(2)
//                     targetElement2.value = (element.value *  data.eur / data.usd).toFixed(2)
//                     break
//                 case "eur":
//                     targetElement.value = (element.value * data.eur).toFixed(2)
//                     targetElement2.value = (element.value * (data.usd / data.eur)).toFixed(2)
//                     break
//                 default:
//                     break
//             }
//             if(element.value === '' || targetElement.value ==='') {
//                 targetElement.value = ''
//                 targetElement2.value = ''
//
//             }
//         }
//     }
// }
const converter = (element, targetElement, targetElement2, current) => {
    element.oninput = async () => {
        try {
            const response = await fetch('../data/converter.json')
            const data = await response.json()

            switch (current) {
                case "som":
                    targetElement.value = (element.value / data.usd).toFixed(2)
                    targetElement2.value = (element.value / data.eur).toFixed(2)
                    break
                case "usd":
                    targetElement.value = (element.value * data.usd).toFixed(2)
                    targetElement2.value = (element.value * data.eur / data.usd).toFixed(2)
                    break
                case "eur":
                    targetElement.value = (element.value * data.eur).toFixed(2)
                    targetElement2.value = (element.value * (data.usd / data.eur)).toFixed(2)
                    break
                default:
                    break
            }

            if (element.value === '' || targetElement.value === '') {
                targetElement.value = ''
                targetElement2.value = ''
            }
        } catch (error) {
            console.error('Error fetching converter data:', error)
        }
    };
};

converter(som, usd, eur, 'som')
converter(usd, som, eur, 'usd')
converter(eur, som, usd,'eur')

// som.addEventListener('input', () => {
//     const xhr = new XMLHttpRequest()
//     xhr.open('GET', '../data/converter.json')
//     xhr.setRequestHeader('Content-type', 'application/json')
//     xhr.send()
//     xhr.addEventListener('load', () => {
//         const data = JSON.parse(xhr.response)
//         usd.value = (som.value / data.usd).toFixed(2)
//
//     })
// })
// usd.addEventListener('input', () => {
//     const xhr = new XMLHttpRequest()
//     xhr.open('GET', '../data/converter.json')
//     xhr.setRequestHeader('Content-type', 'application/json')
//     xhr.send()
//     xhr.addEventListener('load', () => {
//         const data = JSON.parse(xhr.response)
//         som.value = (usd.value * data.usd).toFixed(2)
//
//     })
// })

//card switcher


const cards = document.querySelector('.card') ,
    btnNext = document.querySelector('#btn-next'),
    btnPrev = document.querySelector('#btn-prev')

const card = document.getElementById('card')
let countCard = 1

const URL = 'https://jsonplaceholder.typicode.com/todos/'

// const loadCardData = (numCards) => {
//     fetch(`${URL}${countCard}`)
//         .then(response=>response.json())
//         .then((data)=>{
//             cards.innerHTML= `
//                 <p>${data.title}</p>
//                 <p style="color: ${data.completed ?'green':'red'}">${data.completed}</p>
//                 <span>${data.id}</span>
//             `
//         })
// }
const loadCardData = async (numCards) => {
    try {
        const response = await fetch(`${URL}${countCard}`);
        const data = await response.json();

        cards.innerHTML = `
            <p>${data.title}</p>
            <p style="color: ${data.completed ? 'green' : 'red'}">${data.completed}</p>
            <span>${data.id}</span>
        `;
    } catch (error) {
        console.error('Error fetching card data:', error);
    }
};

loadCardData(countCard)

btnNext.onclick = () => {
    countCard++
    if (countCard > 200){
        countCard = 1
    }
    loadCardData(countCard)
}
btnPrev.onclick = () =>{
    countCard--
    if (countCard < 1){
        countCard = 200
    }
    loadCardData(countCard)
}


const fetchAsync = async () => {
    try{
        const awaitFetch = await fetch('https://jsonplaceholder.typicode.com/posts')
        const data = await awaitFetch.json()
        console.log(data)
    }catch (e){
        console.error('ERROR 404')
    }
}
fetchAsync()

    // .then(response => response.json())
    // .then(data => {
    //     console.log(data)
    // })
    // .catch(error => {
    //     console.error('ERROR 404', error)
    // })


const cityNameInput = document.querySelector('.cityName')
const city = document.querySelector('.city')
const temp = document.querySelector('.temp')

const BASE_URL = 'http://api.openweathermap.org'
const API_KEY = 'e417df62e04d3b1b111abeab19cea714'

// const citySearch = () => {
//     cityNameInput.addEventListener('input', (event) => {
//         fetch(`${BASE_URL}/data/2.5/weather?q=${event.target.value}&appid=${API_KEY}`)
//             .then(response => response.json())
//             .then(data => {
//                 city.innerHTML = data.name ?data.name : 'Город не найден'
//                 temp.innerHTML = data?.main?.temp ? Math.round(data?.main?.temp - 273.15) + '&deg;C' : '...'
//             })
//     })
// }
const citySearch = () => {
    cityNameInput.addEventListener('input', async (event) => {
        try {
            const response = await fetch(`${BASE_URL}/data/2.5/weather?q=${event.target.value}&appid=${API_KEY}`);
            const data = await response.json();

            city.innerHTML = data.name ? data.name : 'Город не найден';
            temp.innerHTML = data?.main?.temp ? Math.round(data?.main?.temp - 273.15) + '&deg;C' : '...';
        } catch (error) {
            console.error('Error fetching data:', error);
            // Обработайте ошибку по вашему усмотрению
        }
    });
};
citySearch()

setTimeout( () => openModal() , 10000)