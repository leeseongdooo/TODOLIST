import { useState, useEffect, React } from "react";
import "../css/FolderModal.scss";

function FolderModal({ folder, setFolder, setFolderBtnBool, FolderBtnBool }) {
  const [FolderName, setFolderName] = useState("");

  const ArrayFolderName = []; // folder의 내용들을 Array형식으로 바꿔 저장하기 위해 만들었습니다.

  // folder를 map(반복)하여 folder안의 값들을 ArrayFolderName으로 push하는 함수입니다.
  const CheckName = () => {
    folder.map((list) => {
      ArrayFolderName.push(list.folderName);
    });
  };

  CheckName(); // 바로 함수 실행 후

  const FolderNameStorage = JSON.parse(localStorage.getItem("Folder"));
  const newFolder = [...folder, { folderName: FolderName }];

  useEffect(() => {
    if (FolderNameStorage === null) {
      setFolder([]);
    } else {
      setFolder(FolderNameStorage);
    }
  }, [FolderName]);

  const DoubleCheck = ArrayFolderName.some((list) => {
    return list === FolderName;
  });

  return (
    <div className="FolderModal-OutBox">
      <div className="FolderModal-InBox">
        <div className="Header">
          <h2>폴더 추가</h2>
          <p>{DoubleCheck ? "중복되는 값이 있어요" : ""}</p>
        </div>

        <div className="Middle">
          <input
            type="text"
            placeholder="폴더 이름을 작성해주세요"
            style={DoubleCheck ? { color: "red" } : { color: "black" }}
            onChange={(e) => {
              setFolderName(e.target.value);
            }}
            onKeyDown={(e) => {
              if (e.keyCode === 13) {
                if (FolderName.length !== 0 && DoubleCheck !== true) {
                  folder.push(FolderName);
                  setFolderName("");
                  localStorage.setItem("Folder", JSON.stringify(newFolder));
                  setFolderBtnBool(false);
                }
              }
            }}
            value={FolderName}
          />
        </div>

        <div className="Bottom">
          <button
            onClick={() => {
              setFolderBtnBool(false);
            }}
          >
            취소
          </button>
          <button>생성</button>
        </div>
      </div>
    </div>
  );
}

export default FolderModal;
