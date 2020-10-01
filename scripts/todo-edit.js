'use strict'

let todo = getSavedTodos() 
const titleEl = document.querySelector('#todo-text')
const bodyEl = document.querySelector('#todo-body')
const dateEl = document.querySelector('#updated')
const todoId = location.hash.substring(1)

let item = todo.find(function (item) {
    return item.id == todoId
})

if (!item){
    location.assign('/index.html')
}

titleEl.value = item.text
bodyEl.value = item.body
dateEl.textContent = generateLastEdited(item.updatedAt)

titleEl.addEventListener('input' , function (e) {
    item.text = e.target.value
    saveTodo(todo)
    renderNotes(todo , filters)
    item.updatedAt = moment().valueOf()
    dateEl.textContent = generateLastEdited(item.updatedAt)
})


bodyEl.addEventListener('input' , function (e) {
    item.body = e.target.value
    saveTodo(todo)
    item.updatedAt = moment().valueOf()
    dateEl.textContent = generateLastEdited(item.updatedAt)
})

document.querySelector('#remove-btn').addEventListener('click' , function () {

    removeTodo(todoId)
    saveTodo(todo)
    renderNotes(todo , filters)
    location.assign('/index.html')
})


window.addEventListener('storage' , function(e){
    
    todo = JSON.parse(e.newValue)
    const item = todo.find(function (item) {
        return item.id == todoId
    })
    
    if (!item){
        location.assign('/index.html')
    }
    titleEl.value = item.text
    bodyEl.value = item.body    
    dateEl.textContent = generateLastEdited(item.updatedAt)
})

