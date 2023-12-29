const URL = 'https://jsonplaceholder.typicode.com/posts'
const cardItem = document.querySelector('.card__item')
// const image = ''

const fetchTodo = async (url) => {
    try {
        const response = await fetch(url)
        const data = await response.json()
        data.forEach(date => {
            const person = document.createElement('div')
            person.classList.add('style')
            person.innerHTML = `
            <div class="item">
                <div class="image">
                    <div class="item_title">
                       <h2 class="title">${date.title}</h2>
                    </div>
                <div class="item_p">
                    <p class="page">${date.body}</p>
                </div>
            </div>
           </div>
        `
            cardItem.append(person)
        })
    } catch (e) {
        alert('ERROR')
    }
}
fetchTodo(URL)
setTimeout( () => openModal() , 10000)