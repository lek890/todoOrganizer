import * as React from "react";
import { debounce } from "lodash";

import Editor from "rich-markdown-editor";
export const Category: React.FC<{
  item;
  handleClick;
  handleDrop;
  handleDragOver;
  tasks;
}> = ({ item, handleClick, handleDrop, handleDragOver, tasks }) => {
  const [value, setValue] = React.useState("");
  const [editorDefaultValue, setEditorDefaultValue] = React.useState();
  const handleChange = debounce(value => {
    setValue(value);
  }, 250);
  return (
    <div className="container">
      <h2>{item[1]}</h2>

      <div className="heading">
        <div>
          <Editor
            defaultValue={editorDefaultValue}
            className="editor"
            onChange={handleChange}
            onFocus={() => {}}
          />
          <button
            onClick={() => handleClick(item[0], value)}
            className="btn btn-primary"
            disabled={!value}
          >
            Save
          </button>
        </div>
      </div>
      <div
        className="droppable"
        onDrop={e => handleDrop(e, item[0])}
        onDragOver={e => handleDragOver(e)}
      >
        {tasks}
      </div>
    </div>
  );
};
