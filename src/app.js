const inputTodo = document.getElementById('input-todo');
const inputTodoCheckbox = document.getElementById('input-todo-checkbox')
const allTodoList = document.getElementById('all-todo-list');
const itemsLeft = document.getElementById('itemsLeft');
const allItemsList = document.getElementById('allItemsList');
const allActiveItemsList = document.getElementById('allActiveItemsList');
const allCompletedItemsList = document.getElementById('allCompletedItemsList');
const clearCompleted = document.getElementById('clearCompleted');
const optionsContainer = document.getElementById('optionsContainer')


let count = 0;

function createTodoElement() {
    const newTodo = document.createElement('div');
    newTodo.classList += 'todoList flex p-2 pt-0 border-b-2  border-gray-300';

    const checkbox = document.createElement('input');
    checkbox.classList += 'mx-4 todoCheckboxClass';
    checkbox.type = 'checkbox';

    checkbox.addEventListener('click', () => {
        checkCheckbox(checkbox)
    })

    const todoText = document.createElement('input');
    todoText.type = 'text';
    todoText.readOnly = true;
    todoText.classList += 'mx-4 p-3 w-[80%]';
    todoText.value = inputTodo.value;

    todoText.addEventListener('dblclick', () => {
        editTodoText(todoText);
    })

    const deleteButton = document.createElement('button');
    deleteButton.classList += 'mx-4 hover:text-[#b83f45]';
    deleteButton.innerHTML = 'X';

    deleteButton.addEventListener('click', () => {
        removeTodo(deleteButton);
    })

    newTodo.appendChild(checkbox);
    newTodo.appendChild(todoText);
    newTodo.appendChild(deleteButton);

    allTodoList.appendChild(newTodo);

    optionsContainer.classList.remove('hidden')
    inputTodoCheckbox.classList.remove('hidden')
}

function checkCheckbox(checkbox) {
    if (checkbox.checked) {
        checkbox.nextSibling.classList.add('line-through');
        count -= 1;
    } else {
        checkbox.nextSibling.classList.remove('line-through');
        count += 1;
    }
    countItemsLeft(count);
}

function editTodoText(todoText) {

    const editInput = document.createElement('input');
    todoText.type = 'text';
    todoText.readOnly = '';
    todoText.value += editInput.value;
    todoText.previousSibling.classList.add('hidden');
    todoText.nextSibling.classList.add('hidden');

    todoText.addEventListener('keypress', function (e) {

        if (e.key === 'Enter') {
            todoText.readOnly = true;
            todoText.previousSibling.classList.remove('hidden');
            todoText.nextSibling.classList.remove('hidden');
        }
    });
}

function removeTodo(deleteButton) {
    const checkboxList = document.getElementsByClassName('todoCheckboxClass');

    deleteButton.parentNode.remove();
    if (!deleteButton.previousSibling.previousSibling.checked) {
        count -= 1;
        countItemsLeft(count);
    }
    if (checkboxList.length === 0) {
        optionsContainer.classList.add('hidden')
        inputTodoCheckbox.classList.add('hidden')
    }

}

function appendTodo() {
    inputTodo.addEventListener('keypress', function (e) {
        if (e.key === 'Enter' && inputTodo.value.length > 1) {
            createTodoElement();
            inputTodo.value = '';
            count += 1;
            countItemsLeft(count);
        }
    });
}

function GetAllItemsList() {
    allItemsList.addEventListener('click', () => {
        const checkboxList = document.getElementsByClassName('todoCheckboxClass');
        for (let index = 0; index < checkboxList.length; index++) {
            checkboxList[index].parentNode.classList.remove('hidden');
        }
    })
}

function getAllActiveItemsList() {

    allActiveItemsList.addEventListener('click', () => {

        const checkboxList = document.getElementsByClassName('todoCheckboxClass');
        for (let index = 0; index < checkboxList.length; index++) {
            if (checkboxList[index].checked) {
                checkboxList[index].parentNode.classList.add('hidden');
            } else {
                checkboxList[index].parentNode.classList.remove('hidden');
            }
        }
    })
}

function getCompleted() {

    allCompletedItemsList.addEventListener('click', () => {

        const checkboxList = document.getElementsByClassName('todoCheckboxClass');
        for (let index = 0; index < checkboxList.length; index++) {
            if (!checkboxList[index].checked) {
                checkboxList[index].parentNode.classList.add('hidden');
            } else {
                checkboxList[index].parentNode.classList.remove('hidden');
            }
        }
    })
}

function clearCompletedFun() {

    clearCompleted.addEventListener('click', () => {

        const checkboxList = document.getElementsByClassName('todoCheckboxClass');
        let size = checkboxList.length;
        for (let index = size - 1; index >= 0; index--) {
            if (checkboxList[index].checked) {
                checkboxList[index].parentNode.remove();
            }
        }
    })
}

function countItemsLeft(count) {
    itemsLeft.innerHTML = `${count} item left!`;
}

inputTodoCheckbox.addEventListener('click', () => {
    if (inputTodoCheckbox.checked) {
        const checkboxList = document.getElementsByClassName('todoCheckboxClass');
        for (let index = 0; index < checkboxList.length; index++) {
            checkboxList[index].checked = true;
            checkboxList[index].nextSibling.classList.add('line-through');
        }
        count = 0;
        countItemsLeft(count);
    }
    else {
        const checkboxList = document.getElementsByClassName('todoCheckboxClass');
        for (let index = 0; index < checkboxList.length; index++) {
            checkboxList[index].checked = false;
            checkboxList[index].nextSibling.classList.remove('line-through');
        }
        count = checkboxList.length;
        countItemsLeft(count);
    }
});

appendTodo();

GetAllItemsList();

getAllActiveItemsList();

getCompleted();

clearCompletedFun();
