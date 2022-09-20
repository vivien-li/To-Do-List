let list = []; // array to hold items

function render(item) {
    const list = document.querySelector('.js-todo-list');
    const current = document.querySelector(`[data-key='${item.date}']`);
    const checked = item.done ? 'done' : '';

    if (item.deleted) {
        // remove the item from the DOM
        current.remove();
        return
    }

    const node = document.createElement("li");
    node.setAttribute('class', `todo-item ${checked}`);
    node.setAttribute('data-key', item.date);

    node.innerHTML = `
    <input id="${item.date}" type="checkbox"/>
    <label for="${item.date}" class="tick js-tick"></label>
    <span>${item.description}</span>
    <button class="delete-todo js-delete-todo">
    <svg><use href="#delete-icon"></use></svg>
    </button>
    `;

    if (current) {  // if item already exists, simply replace with the new one
        list.replaceChild(node, current);
        console.log("123");
    } else {
        list.append(node);
    }
}


// adds a new object to our to-do list
function add(toDo) {
    const item = {
        description: toDo,
        done: false,
        date: Date.now(),
    };

    list.push(item);
    render(item);
    console.log(list);
}

function toggleDone(itemKey) {
    const i = list.findIndex(item => item.date === Number(itemKey));

    list[i].done = !list[i].done;
    console.log(list[i].done);
    render(list[i]);
}

function deleteTodo(itemKey) {
    const i = list.findIndex(item => item.date === Number(itemKey));

    const toDo = {
        deleted : true,
        ... list[i]
    };

    list = list.filter(item => item.date !== Number(itemKey));
    render(toDo);
}

function darkMode() {
    var element = document.body;
    element.classList.toggle("dark-mode");
    element.style.color = "white";
  }

const form = document.querySelector('.js-form');
form.addEventListener('submit', event => {
    event.preventDefault(); // page won't refresh on form submission
    const input = document.querySelector('.js-todo-input');

    const toDo = input.value.trim();
    if (toDo != '') {
        add(toDo);
        input.value = ''; // erases previous to-do
        input.focus(); // sets the input bar back to focus
    }
});

const myList = document.querySelector('.js-todo-list');

myList.addEventListener('click', event => {
  if (event.target.classList.contains('js-tick')) {
    const itemKey = event.target.parentElement.dataset.key;
    toggleDone(itemKey);
  }

  if (event.target.classList.contains('js-delete-todo')) {
    const itemKey = event.target.parentElement.dataset.key;
    deleteTodo(itemKey);
  }
});

