import * as React from "react";
import { debounce } from "lodash";
import Editor from "rich-markdown-editor";

import { default as CardComp } from "@bit/reactstrap.reactstrap.card";
import CardBody from "@bit/reactstrap.reactstrap.internal.card-body";
import CardText from "@bit/reactstrap.reactstrap.internal.card-text";
export const Card: React.FC<{
  handleDragStart;
  setEditingId;
  saveUpdate;
  editingId;
  task;
}> = ({ handleDragStart, setEditingId, saveUpdate, task, editingId }) => {
  const [value, setValue] = React.useState(task.content);

  const handleChange = debounce(value => {
    setValue(value);
  }, 250);

  return (
    <CardComp draggable onDragStart={e => handleDragStart(e, task.id)}>
      <CardBody>
        {editingId == task.id ? (
          <div>
            <Editor
              defaultValue={task.content}
              className="editor"
              onChange={handleChange}
              onFocus={() => {}}
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
            <Editor
              defaultValue={task.content}
              className="editor"
              onChange={handleChange}
              onFocus={() => {}}
              readOnly
            />
            <div style={{ float: "right" }}>
              <input
                type="checkbox"
                onChange={() => saveUpdate(task.id, "status", !task.status)}
                checked={task.status == 1}
                name="completed"
                id="completed"
              />
              <label htmlFor="completed"> {"completed"}</label>
              &nbsp;
              <a onClick={() => setEditingId(task.id)}>edit</a>
            </div>
          </div>
        )}
      </CardBody>
    </CardComp>
  );
};
