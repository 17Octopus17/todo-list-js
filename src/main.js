(() => {
  // selecting dom elements for manipulation
  const input = document.querySelector("input[type = 'text']");
  const ul = document.querySelector('ul');
  const lists = document.querySelectorAll('li');
  const spans = document.getElementsByTagName('span');
  const saveBtn = document.querySelector('.save');
  const clearBtn = document.querySelector('.clear');
  const arrow = document.querySelector('.arrow');

  // hide input box,when pencil icon is clicked
  arrow.addEventListener('click', () => {
    ul.classList.toggle('display');
  });

  // event listener for input to add new todo to the list.
  input.addEventListener('keypress', function (keyPressed) {
    if (keyPressed.which === 13) {
      // creating lists and span when enter is clicked
      const li = document.createElement('li');
      const spanElement = document.createElement('span');
      const icon = document.createElement('i');

      const newTodo = this.value;
      this.value = ' ';

      icon.classList.add('fas', 'fa-trash-alt');
      spanElement.append(icon);
      ul.insertBefore(li, ul.children[1]).append(spanElement, newTodo);

      deleteTodo();
    }
  });

  // function to delete todo if delete span is clicked.
  function deleteTodo() {
    for (let span of spans) {
      span.addEventListener('click', () => {
        span.parentElement.remove();
        event.stopPropagation();
      });
    }
  }

  // function to load todo if list is found in local storage.
  function loadTodo() {
    if (localStorage.getItem('todoList')) {
      ul.innerHTML = localStorage.getItem('todoList');
      deleteTodo();
    }
  }

  // event listener to linethrough list if clicked
  ul.addEventListener(
    'click',
    (ev) => {
      if (ev.target.tagName === 'LI') {
        ev.target.classList.toggle('checked');
      }
    },
    false,
  );

  // save todolist state so user can access it later
  saveBtn.addEventListener('click', () => {
    localStorage.setItem('todoList', ul.innerHTML);
  });

  // clear all todo when clear button is clicked
  clearBtn.addEventListener('click', () => {
    ul.innerHTML = '';
    localStorage.removeItem('todoList', ul.innerHTML);
  });

  // delete todo
  deleteTodo();

  // load Todo
  loadTodo();
})();
