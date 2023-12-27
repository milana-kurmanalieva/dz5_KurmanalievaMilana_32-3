//phone block

const phoneInput = document.querySelector('#phone_input')
const phoneButton = document.querySelector('#phone_button')
const phoneResult = document.querySelector('#phone_result')

const regExp = /^\+996 [25793]\d{2} \d{2}-\d{2}-\d{2}$/
phoneButton.onclick = () => {
    if (regExp.test(phoneInput.value)){
        phoneResult.innerHTML = 'OK'
        phoneResult.style.color = 'green'
    }else {
        phoneResult.innerHTML = 'NOT OK'
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

const converter = (element, targetElement, targetElement2, current) => {
    element.oninput = () => {
        const xhr = new XMLHttpRequest()
        xhr.open('GET', '../data/converter.json')
        xhr.setRequestHeader('Content-type', 'application/json')
        xhr.send()
        xhr.onload = () =>{
            const data = JSON.parse(xhr.response)

            switch (current) {
                case "som":
                    targetElement.value = (element.value / data.usd).toFixed(2)
                    targetElement2.value = (element.value / data.eur).toFixed(2)
                    break
                case "usd":
                    targetElement.value = (element.value * data.usd ).toFixed(2)
                    targetElement2.value = (element.value *  data.eur / data.usd).toFixed(2)
                    break
                case "eur":
                    targetElement.value = (element.value * data.eur).toFixed(2)
                    targetElement2.value = (element.value * (data.usd / data.eur)).toFixed(2)
                    break
                default:
                    break
            }
            if(element.value === '' || targetElement.value ==='') {
                targetElement.value = ''
                targetElement2.value = ''

            }
        }
    }
}
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


const loadCardData = (numCards) => {
    fetch(`https://jsonplaceholder.typicode.com/todos/${countCard}`)
        .then(response=>response.json())
        .then((data)=>{
            cards.innerHTML= `
                <p>${data.title}</p>
                <p style="color: ${data.completed ?'green':'red'}">${data.completed}</p>
                <span>${data.id}</span>
            `
        })
}

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

fetch('https://jsonplaceholder.typicode.com/posts')
    .then(response => response.json())
    .then(data => {
        console.log(data)
    })
    .catch(error => {
        console.error('ERROR 404', error)
    })

// })

setTimeout(()=> openModal(), 10000)



