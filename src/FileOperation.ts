const fs = require("fs");
const FILE_NAME = "todo-organizer";

export const writeFile = jsonData => {
  fs.writeFileSync(FILE_NAME, JSON.stringify(jsonData));
};

export const readFile = jsonData => {
  fs.readFileSync(FILE_NAME, (err, data) => {
    if (err) throw err;
    const fileContent = JSON.parse(data);
    return fileContent;
  });
};
