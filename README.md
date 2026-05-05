# Taskflow - Kanban Board

A simple and intuitive Kanban board application for managing tasks with drag-and-drop functionality. Organize your work across three columns: To Do, In Progress, and Done.

## Features

- **Drag & Drop Tasks**: Easily move tasks between columns
- **Priority Levels**: Assign tasks with Low, Medium, or High priority
- **Filter by Priority**: View tasks filtered by priority level
- **Task Management**: Create, delete, and organize tasks
- **Local Storage**: Automatically saves all tasks to browser storage
- **Dark Theme**: Modern dark UI for comfortable viewing

## Getting Started

### Installation

1. Clone or download this repository
2. Open `index.html` in a web browser
3. No dependencies or build process required - it runs directly in your browser

### Usage

1. **Create a Task**: Click the "+ Add Task" button to open the task creation modal
2. **Fill Task Details**:
   - Enter task name
   - Add description
   - Select priority level (Low, Medium, High)
3. **Save Task**: Click "Save Task" button - task will be added to the To Do column
4. **Move Tasks**: Drag and drop tasks between columns to update their status
5. **Filter Tasks**: Use the priority filter dropdown in the navigation bar to view specific priority tasks
6. **Delete Task**: Click the "Delete" button on any task card to remove it

## Project Structure

```
taskflow-board/
├── index.html          # Main HTML file
├── css/
│   └── styles.css      # Application styling
├── scripts/
│   └── app.js          # JavaScript logic
└── README.md           # This file
```

## Technical Details

### Technologies Used

- HTML5
- CSS3
- JavaScript (Vanilla)
- LocalStorage API

### Key Classes

#### Task

Represents an individual task with properties:

- `name`: Task title
- `description`: Task details
- `priority`: Priority level (low, medium, high)
- `status`: Current status (todo, in-progress, done)
- `id`: Unique identifier

#### Column

Represents a Kanban column containing:

- `id`: Column identifier
- `title`: Column name
- `tasks`: Array of Task objects

#### Board

Main controller managing:

- All columns and tasks
- Drag-and-drop functionality
- Event listeners
- LocalStorage persistence

## Features Explained

### Drag & Drop

Tasks can be dragged between columns. The application tracks the dragged task ID and moves it to the destination column when dropped.

### Priority Filtering

The filter dropdown allows you to:

- View all priorities
- View only Low priority tasks
- View only Medium priority tasks
- View only High priority tasks

### Data Persistence

All tasks are automatically saved to the browser's LocalStorage with key `taskFlow-board-data`. This means your tasks will persist even after closing the browser.

## Color Scheme

### Priority Badges

- **High**: Red (#ff6b6b)
- **Medium**: Yellow (#feca57)
- **Low**: Green (#1dd1a1)

### Dark Theme

- Primary Color: #5c5cff (Purple)
- Background: #121212 (Dark Gray)
- Accent: #1e1e1e (Lighter Gray)

## Browser Compatibility

Works on all modern browsers that support:

- HTML5 Dialogs
- CSS Flexbox
- ES6 JavaScript
- LocalStorage API

## Future Enhancements

Potential features for future updates:

- Task editing functionality
- Due dates for tasks
- Task categories/labels
- Export/import tasks
- Multiple board support
- Task notes/comments

## License

This project is open source and available for personal and commercial use.

## Support

For issues or questions, please check the code comments in:

- `scripts/app.js` - JavaScript logic
- `css/styles.css` - Styling
- `index.html` - HTML structure
