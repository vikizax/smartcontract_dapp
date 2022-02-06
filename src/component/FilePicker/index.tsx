import React, { useState, useRef, useContext } from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { parse } from "papaparse";
import { AppContext } from "../../state/context";
import { useNavigate } from "react-router-dom";
const FilePicker = () => {
  const fileInput = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const {
    dispatch,
    state: { fileName: datasetFileName },
  } = useContext(AppContext);

  const handleFileDrop = (
    e: React.DragEvent<HTMLDivElement> | React.ChangeEvent<HTMLInputElement>,
    option: "drop" | "input"
  ) => {
    e.preventDefault();

    let file;
    let fileName: string;
    if (option === "drop") {
      if (
        (e as React.DragEvent<HTMLDivElement>).dataTransfer.files &&
        (e as React.DragEvent<HTMLDivElement>).dataTransfer.files.length > 1
      ) {
        window.alert("Please drop only one file at a time.");
        return;
      }
      file = (e as React.DragEvent<HTMLDivElement>).dataTransfer.files[0];
      fileName = (e as React.DragEvent<HTMLDivElement>).dataTransfer.files[0]
        .name;
    }

    if (option === "input") {
      if (
        (e as React.ChangeEvent<HTMLInputElement>).target.files &&
        // @ts-ignore
        (e as React.ChangeEvent<HTMLInputElement>).target.files.length > 1
      ) {
        window.alert("Please upload only one file at a time.");
        return;
      }
      file = (e as React.ChangeEvent<HTMLInputElement>).target?.files?.[0];
      fileName = (e as React.ChangeEvent<HTMLInputElement>).target?.files?.[0]
        .name as string;
    }

    const reader = new FileReader();
    reader.readAsText(file as File);
    reader.onload = (e) => {
      handleFileParse(e.target?.result, fileName);
    };
  };

  const handleFileParse = (data: any, fileName: string) => {
    const result = parse(data);
    const xData = result.data.map((row: any) => row[0] as number);
    const yData = result.data.map((row: any) => row[1] as number);
    const dataSet = result.data.map((row: any) => ({
      x: row[0] as number,
      y: row[1] as number,
    }));

    dispatch({
      type: "setData",
      payload: { data: dataSet, x: xData, y: yData, fileName: fileName },
    });

    setTimeout(() => {
      navigate("/data");
    }, 800);
  };

  return (
    <>
      <input
        type="file"
        name="file_input"
        id="file_input"
        accept=".csv"
        style={{ display: "none" }}
        ref={fileInput}
        onChange={(e) => {
          handleFileDrop(e, "input");
        }}
      />
      <h1>Upload a file</h1>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            height: "500px",
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: "0.5rem",
          }}
          onDrop={(e) => handleFileDrop(e, "drop")}
          onDragOver={(e) => e.preventDefault()}
        >
          <Button
            sx={{
              padding: "2rem",
              borderRadius: "0.5rem",
            }}
            onClick={() => fileInput.current?.click()}
          >
            {datasetFileName
              ? datasetFileName
              : `Drop file here to read or click me to upload a file.`}
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default FilePicker;
