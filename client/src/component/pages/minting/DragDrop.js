import React, { useCallback, useRef, useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { check } from "../../../store/slice";

const DragDropBox = styled.div`
  width: 300px;
  min-height: 300px;

  .dragdrop {
    cursor: pointer;
    width: 300px;
    height: 300px;
    margin-top: 10px;
    border: 2px solid black;
    border-radius: 10px;
    background-color: #daffe5;
    object-fit: contain;
  }

  .fileInfo {
    position: relative;
    width: 300px;
    height: 30px;
    background-color: rgb(235, 246, 255);
    .close {
      position: absolute;
      width: 20px;
      height: 20px;
      right: 0px;
      border: 2px solid #ff7676;
      border-radius: 50%;
      line-height: 20px;
      background-color: #ffdada;
      transition: 0.2s;
      cursor: pointer;

      :hover {
        background-color: #ff7676;
      }
    }
  }
`;

const DragDrop = ({ setFileData, fileData, imgURL, setImageUrl }) => {
  const dragRef = useRef(null);
  const dispatch = useDispatch();

  const onChangeFiles = useCallback(async (e) => {
    dispatch(check({ type: "loading" }));
    let selectFiles = null;

    if (e.type === "drop") {
      selectFiles = e.dataTransfer.files;
    } else {
      selectFiles = e.target.files;
    }

    const handleChangeFile = async (file) => {
      const reader = new FileReader();
      reader.readAsDataURL(file); // URL get
      return new Promise((resolve) => {
        reader.onload = () => {
          setImageUrl(reader.result);
          resolve();
          setFileData(selectFiles[0]);
          dispatch(check({ type: "" }));
        };
      });
    };
    handleChangeFile(selectFiles[0]);
  }, []);

  const dragIn = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const dragOut = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const dragOver = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const drop = useCallback(
    (e) => {
      e.preventDefault();
      e.stopPropagation();

      onChangeFiles(e);
    },
    [onChangeFiles]
  );

  const initDragEvents = useCallback(() => {
    if (dragRef.current !== null) {
      dragRef.current.addEventListener("dragenter", dragIn);
      dragRef.current.addEventListener("dragleave", dragOut);
      dragRef.current.addEventListener("dragover", dragOver);
      dragRef.current.addEventListener("drop", drop);
    }
  }, [dragIn, dragOut, dragOver, drop]);

  const resetDragEvents = useCallback(() => {
    if (dragRef.current !== null) {
      dragRef.current.removeEventListener("dragenter", dragIn);
      dragRef.current.removeEventListener("dragleave", dragOut);
      dragRef.current.removeEventListener("dragover", dragOver);
      dragRef.current.removeEventListener("drop", drop);
    }
  }, [dragIn, dragOut, dragOver, drop]);

  useEffect(() => {
    initDragEvents();

    return () => resetDragEvents();
  }, [initDragEvents, resetDragEvents]);

  return (
    <DragDropBox>
      <input
        type="file"
        id="fileUpload"
        style={{ display: "none" }}
        multiple={true}
        onChange={onChangeFiles}
      />

      {imgURL ? (
        <img src={imgURL} alt="" className="dragdrop" />
      ) : (
        <label htmlFor="fileUpload" ref={dragRef}>
          <div className="dragdrop cc">파일 첨부</div>
        </label>
      )}
      {fileData ? (
        <div className="fileInfo cc">
          <div>{fileData.name}</div>
          <div
            className="close"
            onClick={() => {
              setImageUrl(null);
              setFileData(null);
            }}
          >
            X
          </div>
        </div>
      ) : null}
    </DragDropBox>
  );
};

export default DragDrop;
