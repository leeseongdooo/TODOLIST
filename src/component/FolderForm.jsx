import React from "react";
import "../css/FolderForm.scss";

function FolderForm({ FolderNameStorage }) {
  return (
    <div className="FolderForm-InBox">
      {FolderNameStorage.map((list, index) => (
        <p key={index}>{list.folderName}</p>
      ))}
    </div>
  );
}

export default FolderForm;
