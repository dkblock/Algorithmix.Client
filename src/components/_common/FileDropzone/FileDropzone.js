import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";

const FileDropzone = ({ acceptedFileTypes, maxFiles = 1, onDrop }) => {
  const handleDrop = useCallback((files) => {
   onDrop(files);
  }, [onDrop]);

  const { acceptedFiles, fileRejections, getInputProps, getRootProps } = useDropzone({
    accept: acceptedFileTypes.join(", "),
    maxFiles,
    onDrop: handleDrop,
  });

  const acceptedFileItems = acceptedFiles.map((file) => (
    <li key={file.path}>
      {file.path} - {file.size} bytes
    </li>
  ));

  const fileRejectionItems = fileRejections.map(({ file, errors }) => (
    <li key={file.path}>
      {file.path} - {file.size} bytes
      <ul>
        {errors.map((e) => (
          <li key={e.code}>{e.message}</li>
        ))}
      </ul>
    </li>
  ));

  return (
    <section>
      <div {...getRootProps()}>
        <input {...getInputProps()} />
        <p>Drag 'n' drop some files here, or click to select files</p>
        <em>(Only *.jpeg and *.png images will be accepted)</em>
      </div>
      <aside>
        <h4>Accepted files</h4>
        <ul>{acceptedFileItems}</ul>
        <h4>Rejected files</h4>
        <ul>{fileRejectionItems}</ul>
      </aside>
    </section>
  );
};

export default FileDropzone;
