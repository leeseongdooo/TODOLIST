import { React } from "react";
import { FiArrowRightCircle } from "react-icons/fi";
import "../css/FolderForm.scss";

function FolderForm({ FolderNameStorage }) {
  let ArrayTodo = [];

  console.log(ArrayTodo);

  const DoubleCheck = (folderName) => {
    return ArrayTodo.some((list) => folderName === list);
  };

  return (
    <>
      {" "}
      <div className="FolderList-Box">
        {FolderNameStorage.map((list, index) => (
          <div
            key={index}
            className="FolderForm-InBox"
            onClick={() => {
              const a = DoubleCheck(list.folderName);
            }}
          >
            <h4>{list.folderName}</h4>
            <FiArrowRightCircle className="ArrowBtn" />
          </div>
        ))}
      </div>
      <div className="Folder">
        <button>선택삭제</button>
        <button>전체삭제</button>
      </div>
    </>
  );
}

export default FolderForm;
