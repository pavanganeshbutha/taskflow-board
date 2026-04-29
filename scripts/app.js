class Task {
  constructor(name, description, priority) {
    this.name = name;
    this.description = description;
    this.priority = priority;
    this.id = crypto.randomUUID();
    this.status = "todo";
  }

  render() {
    return `<div class="task-card" data-task-id=${this.id}>
        <h4>${this.name}</h4>
        <p>${this.description}</p>
        <span class="priority">${this.priority}</span>
    </div>`;
  }
}

class Column {
  constructor(id, title) {
    this.id = id;
    this.title = title;
    this.tasks = [];
  }

  render() {
    let tasksHTMLString = this.tasks
      .map(function (task) {
        return task.render();
      })
      .join("");
    return `<div id=${this.id}>
        <h3>${this.title}</h3>
        <div class="task-list">${tasksHTMLString}</div>
        <button class="add-task-btn" data-id="${this.id}">+ Add Task</button>
    </div>`;
  }

  addTask(taskInstance) {
    this.tasks.push(taskInstance);
  }
}

class Board {
  constructor() {
    this.columns = [];
  }

  initializeColumns() {
    const todoColumn = new Column("col-todo", "To Do");
    const inProgressColumn = new Column("col-in-progress", "In Progress");
    const doneColumn = new Column("col-done", "Done");
    this.columns.push(todoColumn, inProgressColumn, doneColumn);
  }

  render() {
    const boardContainer = document.getElementById("board-container");
    const columnsHTML = this.columns.map(function (column) {
      return column.render();
    });
    boardContainer.innerHTML = columnsHTML.join("");
  }

  attachEventListeners() {
    const boardContainer = document.getElementById("board-container");
    boardContainer.addEventListener("click", (event) => {
      if (event.target.classList.contains("add-task-btn")) {
        const columnId = event.target.getAttribute("data-id");
        const column = this.columns.find(function (col) {
          return col.id === columnId;
        });
        const initialTask = new Task("Fix Header", "Align the logo", "High");
        column.addTask(initialTask);
        this.render();
      }
    });
  }
}

const taskBoard = new Board();
taskBoard.initializeColumns();
taskBoard.render();
taskBoard.attachEventListeners();
