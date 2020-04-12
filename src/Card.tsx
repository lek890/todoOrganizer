import * as React from "react";
import { debounce } from "lodash";
import Editor from "rich-markdown-editor";

import { default as CardComp } from "@bit/reactstrap.reactstrap.card";
import CardBody from "@bit/reactstrap.reactstrap.internal.card-body";
export const Card: React.FC<{
  handleDragStart;
  setEditingId;
  saveUpdate;
  editingId;
  handleDelete;
  task;
}> = ({
  handleDragStart,
  setEditingId,
  saveUpdate,
  task,
  editingId,
  handleDelete,
}) => {
  const [value, setValue] = React.useState(task.content);

  const handleChange = debounce((value) => {
    setValue(value);
  }, 250);

  return (
    <CardComp
      draggable
      onDragStart={(e) => handleDragStart(e, task.id)}
      style={{ backgroundColor: task.status ? "limegreen" : "inherit" }}
    >
      <CardBody>
        {editingId == task.id ? (
          <div>
            <Editor
              defaultValue={task.content}
              className="editor"
              onChange={handleChange}
            />
            <button
              onClick={() => saveUpdate(task.id, "content", value)}
              className="btn btn-primary"
            >
              Save
            </button>
          </div>
        ) : (
          <div>
            <div>
              {task.content}
              {task.id}
            </div>

            <div style={{ float: "right" }}>
              <input
                type="checkbox"
                onChange={() => saveUpdate(task.id, "status", !task.status)}
                checked={task.status == 1}
                name={`completed-${task.id}`}
                id={`completed-${task.id}`}
              />
              <label htmlFor={`completed-${task.id}`}> {"completed"}</label>
              &nbsp;
              <a onClick={() => setEditingId(task.id)}>edit</a>
              &nbsp;
              <a style={{ color: "red" }} onClick={() => handleDelete(task.id)}>
                delete
              </a>
            </div>
          </div>
        )}
      </CardBody>
    </CardComp>
  );
};
