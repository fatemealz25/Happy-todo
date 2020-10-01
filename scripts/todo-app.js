'use strict'

let todo = getSavedTodos() //tatatata

renderNotes(todo , filters)

// get the filter input vlaue and set it to our filters
document.querySelector('#filter-todo').addEventListener('input' , function (e) {
    filters.searchText = e.target.value
    renderNotes(todo , filters)
})

// trim and add the new todo to our todo array
document.querySelector('#form').addEventListener('submit' , function (e) {
    e.preventDefault()
    const title = e.target.elements.title.value.trim()
    if(title){
        addTodo(todo , title, false)
        e.target.elements.title.value = ''
        renderNotes(todo , filters)
    }
    
})

// get the checkbox filter input value and set it to our filters
document.querySelector('#hidecompleted').addEventListener('change' , function (e) {
    
    filters.hideCompleted = e.target.checked
    renderNotes(todo , filters)

})

// get the sort filter input value and set it to our filters
document.querySelector('#sortBy').addEventListener('change' , function (e) {
    filters.sortBy = e.target.value
    renderNotes(todo , filters)
})

// get information from localStorage and render it 
window.addEventListener('storage' , function (e) {

    if (e.key == 'x') {
        todo = JSON.parse(e.newValue)
        renderNotes(todo , filters)
    }

})


