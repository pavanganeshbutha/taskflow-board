class Task {
  constructor(name, description, priority) {
    this.name = name;
    this.description = description;
    this.priority = priority;
    this.status = "todo";
    this.id = crypto.randomUUID();
  }

  render() {
    return `<div class="task-card" draggable="true" data-task-id="${this.id}">
    <h4>${this.name}</h4>
    <p>${this.description}</p>
    <span class="priority">${this.priority}</span>
    <button class="delete-btn">Delete</button>
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
    let taskHTMLString = this.tasks
      .map((task) => {
        return task.render();
      })
      .join("");
    return `
    <section id=${this.id}>
      <h2>${this.title} ${this.tasks.length}</h2>
      <div class="task-list">${taskHTMLString}</div>
    </section>
    `;
  }

  addTask(taskIntance) {
    this.tasks.push(taskIntance);
  }
}

class Board {
  constructor() {
    this.columns = [];
    this.draggedTaskId = null;
  }

  initializeColumns() {
    const savedData = localStorage.getItem("taskFlow-board-data");
    if (!savedData) {
      const todoColumn = new Column("col-todo", "To Do");
      const inProgressColumn = new Column("col-in-progress", "In Progress");
      const doneColumn = new Column("col-done", "Done");

      this.columns.push(todoColumn, inProgressColumn, doneColumn);
    } else {
      const parsedColumns = JSON.parse(savedData);
      for (let column of parsedColumns) {
        const realColumn = new Column(column.id, column.title);
        for (let task of column.tasks) {
          const realTask = new Task(task.name, task.description, task.priority);
          realTask.id = task.id;
          realTask.status = task.status;
          realColumn.addTask(realTask);
        }
        this.columns.push(realColumn);
      }
    }
  }

  render() {
    const boardContainer = document.querySelector("#board-container");

    let columnsHTMLString = this.columns.map((column) => {
      return column.render();
    });
    let HTMLString = columnsHTMLString.join("");
    boardContainer.innerHTML = HTMLString;
    this.saveToLocalStorage();
  }

  attachEventListeners() {
    const form = document.querySelector("form");
    const boardContainer = document.querySelector("#board-container");

    form.addEventListener("submit", (event) => {
      event.preventDefault();

      const name = document.querySelector("#task-name").value;
      const description = document.querySelector("#task-description").value;
      const priority = document.querySelector("#task-priority").value;

      const newTask = new Task(name, description, priority);
      this.columns[0].addTask(newTask);
      this.render();
      form.reset();
      document.querySelector("#task-modal").close();
    });

    boardContainer.addEventListener("dragstart", (event) => {
      if (event.target.classList.contains("task-card")) {
        this.draggedTaskId = event.target.getAttribute("data-task-id");
      }
    });

    boardContainer.addEventListener("dragover", (event) => {
      event.preventDefault();
    });

    boardContainer.addEventListener("drop", (event) => {
      event.preventDefault();

      if (this.draggedTaskId === null) return;

      const targetColumnElement = event.target.closest("section");
      if (targetColumnElement) {
        const destinationId = targetColumnElement.id;
        this.moveTask(this.draggedTaskId, destinationId);
        this.render();
      }
      this.draggedTaskId = null;
    });

    boardContainer.addEventListener("click", (event) => {
      if (event.target.classList.contains("delete-btn")) {
        const taskCard = event.target.closest(".task-card");
        const taskId = taskCard.getAttribute("data-task-id");
        this.deleteTask(taskId);
        this.render();
      }
    });
  }

  moveTask(taskId, destinationColumnId) {
    let extractedTask = null;
    for (let column of this.columns) {
      const taskIndex = column.tasks.findIndex((task) => taskId === task.id);

      if (taskIndex !== -1) {
        extractedTask = column.tasks[taskIndex];
        column.tasks.splice(taskIndex, 1);
        break;
      }
    }
    if (extractedTask === null) return;
    const destinationColumn = this.columns.find(
      (column) => column.id === destinationColumnId,
    );
    if (destinationColumn) {
      extractedTask.status = destinationColumnId;
      destinationColumn.tasks.push(extractedTask);
    }
  }

  saveToLocalStorage() {
    localStorage.setItem("taskFlow-board-data", JSON.stringify(this.columns));
  }

  deleteTask(taskId) {
    for (let column of this.columns) {
      const taskIndex = column.tasks.findIndex((task) => taskId === task.id);
      if (taskIndex !== -1) {
        column.tasks.splice(taskIndex, 1);
        break;
      }
    }
  }
}
const taskBoard = new Board();
taskBoard.initializeColumns();
taskBoard.attachEventListeners();
taskBoard.render();
