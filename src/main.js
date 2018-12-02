(() => {
  const input = document.querySelector("input[type = 'text']");
  const ul = document.querySelector('ul');
  const spans = document.getElementsByTagName('span');
  const saveBtn = document.querySelector('.save');
  const clearBtn = document.querySelector('.clear');
  const arrow = document.querySelector('.arrow');

  arrow.addEventListener('click', () => {
    ul.classList.toggle('display');
  });

  const deleteTodo = () => {
    for (let span of spans) {
      span.addEventListener('click', () => {
        span.parentElement.remove();
        event.stopPropagation();
      });
    }
  }

  input.addEventListener('keypress', function pressEnter(keyPressed) {
    if (keyPressed.which === 13) {
      const li = document.createElement('li');
      const spanElement = document.createElement('span');
      const icon = document.createElement('i');
      const unchecked = document.createElement('div');
      unchecked.className = ('uncheck');
      // unchecked.innerHTML = '<img class="uncheck" src="images/unchecked.svg" >';

      const newTodo = this.value;
      this.value = '';

      icon.classList.add('fas', 'fa-times');
      spanElement.append(icon);
      ul.insertBefore(li, ul.children[1]).append(unchecked, spanElement, newTodo);

      deleteTodo();
    }
  });

  function loadTodo() {
    if (localStorage.getItem('todoList')) {
      ul.innerHTML = localStorage.getItem('todoList');
      deleteTodo();
    }
  }

  ul.addEventListener(
    'click',
    (ev) => {
      if (ev.target.tagName === 'DIV') {
        ev.target.classList.toggle('check');
        ev.target.parentNode.classList.toggle('checked');
      }
    },
    false,
  );

  saveBtn.addEventListener('click', () => {
    localStorage.setItem('todoList', ul.innerHTML);
  });

  clearBtn.addEventListener('click', () => {
    ul.innerHTML = '';
    localStorage.removeItem('todoList', ul.innerHTML);
  });

  deleteTodo();

  loadTodo();
})();

