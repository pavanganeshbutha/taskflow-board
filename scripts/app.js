class Task {
  constructor(name, description, priority) {
    this.name = name;
    this.description = description;
    this.priority = priority;
    this.id = crypto.randomUUID();
    this.status = "todo";
  }
}

class Column {
  constructor(id, title) {
    this.id = id;
    this.title = title;
    this.tasks = [];
  }

  render() {
    return `<div id=${this.id}>
        <h3>${this.title}</h3>
        <div class="task-list"></div>
    </div>`;
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
}

const taskBoard = new Board();
taskBoard.initializeColumns();
taskBoard.render();
