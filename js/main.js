let myWebPages = []
const inputEl = document.getElementById("input-el")
const inputBtn = document.getElementById("input-btn")
const ulEl = document.getElementById("ul-el")
const deleteBtn = document.getElementById("delete-btn")
const tabBtn = document.getElementById("tab-btn")

const leadsFromLocalStorage = JSON.parse(localStorage.getItem("myWebPages"))

if(leadsFromLocalStorage){
    myWebPages = leadsFromLocalStorage
    render(myWebPages)
}

tabBtn.addEventListener("click", function(){
    chrome.tabs.query({active:true, currentWindow:true}, function(tabs){
        myWebPages.push(tabs[0].url)
        localStorage.setItem("myWebPages", JSON.stringify(myWebPages))
        render(myWebPages)
    })
})

function render(WebURL){
    let listItems = ""
    for(let i = 0; i < WebURL.length; i++){
        // creating a template string
        listItems += `
        <li>
            <a target='_blanck' href = '${WebURL[i]}'>
            ${WebURL[i]}
            </a>
        </li>`
    }
    ulEl.innerHTML = listItems
}

deleteBtn.addEventListener("click", function(){
    const confirmMsg = confirm("Do you really wants to delete all?")
    if(confirmMsg){
        localStorage.clear()
        myWebPages = []
        render(myWebPages)
    }
})

inputBtn.addEventListener("click", function(){
    myWebPages.push(inputEl.value)
    inputEl.value = ""
    localStorage.setItem("myWebPages", JSON.stringify(myWebPages))
    render(myWebPages)
})
