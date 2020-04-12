import * as React from "react";

import "./App.css";
import { Category } from "./Category";
import { Card } from "./Card";

const TODO_SORTER_KEY = "todo_sorter_key";

const categories = {
  IMPORTANT_AND_URGENT: "Important and Urgent",
  IMPORTANT_BUT_NOT_URGENT: "Important but Not Urgent",
  NOT_IMPORTANT_BUR_URGENT: "Not Important but Urgent",
  NOT_IMPORTANT_NOT_URGENT: "Not Important and Not Urgent",
  TRASH: "trash",
};

enum Status {
  TODO,
  DONE,
}
interface Task {
  category: keyof typeof categories;
  content: string;
  status: Status;
  id: string;
}

export const AppComponent: React.FC = () => {
  const [tasks, setTasks] = React.useState<Task[]>([]);
  const [editingId, setEditingId] = React.useState("");

  React.useEffect(() => {
    const localData = localStorage.getItem(TODO_SORTER_KEY);
    const data = localData ? JSON.parse(localData) : "";
    if (data) {
      setTasks(data);
    }
  }, []);

  const saveItem = (category, content) => {
    const updatedTasks = [
      ...tasks,
      {
        category,
        content,
        status: Status.TODO,
        id: category + tasks.length + 1,
      },
    ];
    updateTasks(updatedTasks);
  };

  const saveUpdate = (id, property, value) => {
    const updatedTask = tasks.filter((item) => item.id == id)[0];
    const restOfTasks = tasks.filter((item) => item.id !== id);
    const update = { ...updatedTask, [property]: value };
    updateTasks([...restOfTasks, update]);
    setEditingId(null);
  };

  const handleDragStart = (event, id) => {
    event.dataTransfer.setData("id", id);
  };

  const handleDelete = (id: string) => {
    const userOKForDelete = confirm("Confirm delete this task");
    if (userOKForDelete) {
      const updatedItems = tasks.filter((task) => task.id !== id);
      updateTasks(updatedItems);
    }
  };

  const handleDrop = (event, category) => {
    const id = event.dataTransfer.getData("id");
    const updatedTask = tasks.filter((item) => item.id == id);
    const restOfTasks = tasks.filter((item) => item.id !== id);
    const update = { ...updatedTask[0], category };
    updateTasks([...restOfTasks, update]);
  };

  const updateTasks = (update) => {
    setTasks(update);
    localStorage.setItem(TODO_SORTER_KEY, JSON.stringify(update));
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  let sortedTasks = {};

  for (let key in categories) {
    sortedTasks[key] = [];
  }

  tasks.map((t, i) => {
    sortedTasks[t.category].push(
      <Card
        key={`item-${t.category}-${i}-todo`}
        handleDragStart={handleDragStart}
        setEditingId={setEditingId}
        saveUpdate={saveUpdate}
        handleDelete={handleDelete}
        task={t}
        editingId={editingId}
      ></Card>
    );
  });

  return (
    <>
      {Object.entries(categories).map((item, index) => {
        return (
          <Category
            key={`cat-${index}`}
            item={item}
            handleClick={saveItem}
            handleDrop={handleDrop}
            handleDragOver={handleDragOver}
            tasks={sortedTasks[item[0]]}
          ></Category>
        );
      })}
    </>
  );
};
