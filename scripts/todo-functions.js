'use strict'

const filters = {
    searchText : '' ,
    hideCompleted : false,
    sortBy : 'byEdited'

}


// fetch saved notes from local storage
const getSavedTodos = () =>{

    const todoJSON = localStorage.getItem('x')

    try {
        return todoJSON  ?  JSON.parse(todoJSON) :  []
    } catch (e) {
        return []
    }
    

}


//save our data to local storage
const saveTodo = (something) => {
    localStorage.setItem('x' , JSON.stringify(something))
}


//remove a todo from the todo array
const removeTodo=  (id) => {

    const removeIndex = todo.findIndex((item) => item.id == id)

    if (removeIndex > -1) {
        todo.splice(removeIndex , 1)
    }

}



//creating a paragraph element for each todo
const generateTodoDOM =  (item) => {

    const wholeEl = document.createElement('div')
    const leftEl = document.createElement('div')
    const checkboxEl = document.createElement('input')
    const textEl = document.createElement('a')
    const btnEl = document.createElement('button')

    wholeEl.classList.add('item')

    //setup checkbox attribute
    checkboxEl.setAttribute('type' , 'checkbox')
    leftEl.appendChild(checkboxEl)
    checkboxEl.checked = item.completed
    checkboxEl.addEventListener('change' , function (e) {
        item.completed = e.target.checked
        saveTodo(todo)
        renderNotes(todo , filters)
    })



    //setup text element content
    textEl.textContent = item.text.length>0 ? ` ${item.text} ` : textEl.textContent = `Unnamed todo `

    textEl.setAttribute('href' , `/edit.html#${item.id}`)
    leftEl.appendChild(textEl)



    //setup remove button text
    btnEl.textContent = 'Remove'
    btnEl.addEventListener('click' , function () {
        removeTodo(item.id)
        saveTodo(todo)
        renderNotes(todo , filters)
    })


    wholeEl.appendChild(leftEl)
    wholeEl.appendChild(btnEl)


    return wholeEl
}



//creating a paragraph element for summary
const generateSummaryDOM =  (array) =>{

    const incompletes = array.filter( (item) => !item.completed)
    const summary = document.createElement('h4')
    summary.classList.add('summary')
    if(incompletes.length == 1){
        summary.textContent = 'There is only 1 thing left to do :D'
    }else if(incompletes.length == 0){
        summary.textContent = 'Get some REST, there is NOTHING to do ;D'
    }else{
        summary.textContent = `You have ${incompletes.length} left to dos`
    }

    return summary
}


//sort your todos by the value of filters
const sortTodos = (array , sortBy) =>{
     if ( sortBy == 'byEdited') {
         return array.sort(function (a , b) {
            if (a.updatedAt > b.updatedAt) {
                return -1
            }else if(a.updatedAt < b.updatedAt){
                return 1
            }else {
                return 0
            }
         })
     }else if ( sortBy == 'byCreated') {
         
        return array.sort(function (a , b) {
           if (a.createdAt > b.createdAt) {
               return -1
           }else if(a.createdAt < b.createdAt){
               return 1
           }else {
               return 0
           }
        })
    }else if ( sortBy == 'alphabet') {
        console.log(filters.sortBy)
        return array.sort(function (a ,b) {
            if (a.text.toLowerCase() < b.text.toLowerCase()) {
                return -1
            }else if(a.text.toLowerCase() > b.text.toLowerCase()){
                return 1
            }else {
                return 0
            }
        })
    }
}



// Render all notes
//filtering data an d showing the number of incompletes among the filtered ones
const renderNotes = (notes , filters) =>{
    sortTodos(todo , filters.sortBy)

    let filteredNotes = notes.filter(function (item) {
        const searchTextMatch = item.text.toLowerCase().includes(filters.searchText.toLowerCase())
        const hideCompletedMatch = !filters.hideCompleted|| !item.completed

        return searchTextMatch && hideCompletedMatch
    })
    

    document.querySelector('#notes').innerHTML = ''

    document.querySelector('#notes').appendChild(generateSummaryDOM(filteredNotes))


        filteredNotes.forEach(function (item) {
            document.querySelector('#notes').appendChild(generateTodoDOM(item))
        }) 
}



//adding new todo
const addTodo = (array , title , completed) => {
    const id = uuidv4()
    array.push({
        id : id,
        text : title ? title : 'Unnmaed todo',
        completed : completed,
        body : "",
        createdAt : moment().valueOf(),
        updatedAt : moment().valueOf()
    })
    saveTodo(todo)
    renderNotes(todo , filters)
    location.assign(`/edit.html#${id}`)
    console.log(todo)
}




//generate last edited date 
const generateLastEdited = (timestamp) => `last edited : ${moment(timestamp).fromNow()}`