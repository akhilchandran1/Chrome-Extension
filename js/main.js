let myWebPages = []
let myWebPageTitles = []
const inputTitleEl = document.getElementById("input-title-el")
const inputUrlEl = document.getElementById("input-url-el")
const ulEl = document.getElementById("ul-el")
const errorMsgTitle = document.getElementById("error-msg-title")
const errorMsgUrl = document.getElementById("error-msg-url")

const inputBtn = document.getElementById("input-btn")
const deleteBtn = document.getElementById("delete-btn")
const tabBtn = document.getElementById("tab-btn")

const leadsFromLocalStorage = JSON.parse(localStorage.getItem("myWebPages"))
const namesFromLocalStorage = JSON.parse(localStorage.getItem("myWebPageTitles"))
if(leadsFromLocalStorage && namesFromLocalStorage){
    myWebPages = leadsFromLocalStorage
    myWebPageTitles = namesFromLocalStorage
    render(myWebPages, myWebPageTitles)
}

tabBtn.addEventListener("click", function(){
    chrome.tabs.query({active:true, currentWindow:true}, function(tabs){
        myWebPages.push(tabs[0].url)
        myWebPageTitles.push(tabs[0].title)
        localStorage.setItem("myWebPages", JSON.stringify(myWebPages))
        localStorage.setItem("myWebPageTitles", JSON.stringify(myWebPageTitles))
        render(myWebPages, myWebPageTitles)
    })
})

function render(WebURL, webTitle){
    let listItems = ""
    for(let i = 0; i < WebURL.length; i++){
        // creating a template string
        listItems += `
        <li onmouseover="changeToUrl()" onmouseout="changeToTitle()">
            <a target='_blanck' id="web-mark-el" href = '${WebURL[i]}'>
            ${webTitle[i]}
            </a>
        </li>
        <p id="url-reveal-el"></p>`
    }
    ulEl.innerHTML = listItems
}

deleteBtn.addEventListener("click", function(){
    const confirmMsg = confirm("Do you really wants to delete all?")
    if(confirmMsg){
        localStorage.clear()
        myWebPages = []
        myWebPageTitles = []
        render(myWebPages, myWebPageTitles)
    }
})

inputBtn.addEventListener("click", function(){
    if(inputTitleEl.value?.trim().length > 0 && inputUrlEl.value?.trim().length > 0){
        console.log()
        if(validURL(inputUrlEl.value)){
            console.log("both are entered")
            myWebPageTitles.push(inputTitleEl.value)
            myWebPages.push(inputUrlEl.value)
            inputTitleEl.value = ""
            inputUrlEl.value = ""
            localStorage.setItem("myWebPageTitles", JSON.stringify(myWebPageTitles))
            localStorage.setItem("myWebPages", JSON.stringify(myWebPages))
            errorMsgTitle.textContent = ""
            errorMsgUrl.textContent = ""
            render(myWebPages, myWebPageTitles)
        }else{
            errorMsgUrl.textContent = "URL/Web address is wrong...!!"
            errorMsgTitle.textContent = ""
        } 
    }else if(inputTitleEl.value?.trim().length > 0 === false && inputUrlEl.value?.trim().length > 0 === false){
        errorMsgTitle.textContent = "Web page Title/Name is required"
        errorMsgUrl.textContent = "Web address/URL is required"
    }else if(inputTitleEl.value?.trim().length > 0 === false && inputUrlEl.value?.trim().length > 0 === true){
        errorMsgTitle.textContent = "Web page Title/Name is required"
        errorMsgUrl.textContent = ""
    }else if(inputUrlEl.value?.trim().length > 0 === false && inputTitleEl.value?.trim().length > 0 === true){
        errorMsgUrl.textContent = "Web address/URL is required"
        errorMsgTitle.textContent = ""
    }
})

function validURL(str) {
    var res = str.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g);
    return (res !== null)
}

const webMarkElHref = document.getElementById("web-mark-el").href
const webMarkElTitle = document.getElementById("url-reveal-el")

function changeToUrl(){
    webMarkElTitle.textContent = webMarkElHref
}

function changeToTitle(){
    webMarkElTitle.textContent =""
}