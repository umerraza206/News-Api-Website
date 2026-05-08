const newsApi = 'd5c867ea5a1247a4acd5db45d6b2c2b8';
const container = document.querySelector("#container-grid")


function emit() {
    fetch(`https://newsapi.org/v2/everything?q=tesla&from=2026-04-08&sortBy=publishedAt&pageSize=29&apiKey=${newsApi}`)
        .then((res) => {
            return res.json()
        })
        .then((data) => {
            localStorage.setItem('teslaArticles', JSON.stringify(data.articles))
            // console.log(data)

        })
        .catch((error) => console.log(error))
}

function cards() {
    const teslaArticles = JSON.parse(localStorage.getItem("teslaArticles"))
    console.log(teslaArticles);
    
    for (let index = 0; index < teslaArticles.length; index++) {
        const element = teslaArticles[index];
        let card = document.createElement("div")
        let img = document.createElement("img")
        let contentBox = document.createElement("div")
        let content = document.createElement("h3")
        let description = document.createElement('p')
        let cardFooter = document.createElement('div')
        let datePublished = document.createElement('span')
        let nameAuthor = document.createElement('span')
        card.classList.add("card")
        img.classList.add("card-image")
        contentBox.classList.add("card-content")
        content.classList.add("card-title")
        description.classList.add("card-text")
        cardFooter.classList.add("card-footer")
        datePublished.classList.add('read-more')
        img.setAttribute("src",element.urlToImage)
        content.textContent=element.content.substring(0, 20);
        description.textContent= element.description.substring(0,55)+"..."
        datePublished.textContent= element.publishedAt.substring(0,10)
        nameAuthor.textContent=element.author
        container.appendChild(card)
        card.append(img,contentBox)
        contentBox.append(content,description,cardFooter)
        cardFooter.append(datePublished,nameAuthor)
    }
}
cards()
emit()
