fetch('http://localhost:4000/quotes')
.then(res => res.json())
.then(data => showQuotes(data))

function showQuotes(data){
    data.forEach(quotes => {
    let quoteList = document.querySelector('#quote-list')
    let li = document.createElement('li')
    li.innerHTML = `
    ${quotes.quote}
    <br>
    <button id="delete">delete!</button>
    <button id="like">like!</button>
    `
    quoteList.appendChild(li)

    let del = li.querySelector('#delete')
    del.addEventListener('click' , () =>{
    li.remove()
    deleteQuotes(quotes.id)
})

let like = li.querySelector('#like')
like.addEventListener('click' , () => likeQuotes(quotes.id))
})
}

let btn = document.querySelector('#new-quote-form')
btn.addEventListener('submit' , postData)



function postData(e){
    e.preventDefault()
   let quote = document.querySelector("#new-quote").value
   let author = document.querySelector("#author").value
   console.log(quote)
   console.log(author)
   let newData ={
    quote : quote,
    author : author
   }
   fetch('http://localhost:4000/quotes' , {
    method : 'POST',
    headers : {
        'Content-Type' : 'application/json'
    },
    body :JSON.stringify(newData)
   })
}

function deleteQuotes(id){
    fetch(`http://localhost:4000/quotes/${id}` , {
        method : 'DELETE',
        headers : {
            'Content-Type' : 'application/json' 
        } 
    })
}

function likeQuotes(id){
    let like = {
        quoteId : id
    }
    fetch('http://localhost:4000/likes' , {
    method : 'POST',
    headers : {
        'Content-Type' : 'application/json'
    },
    body :JSON.stringify(like)
   })
}


