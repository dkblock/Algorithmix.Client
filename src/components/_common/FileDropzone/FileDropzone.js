import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Icon, iconTypes } from "../Icon";
import { activeStyle, acceptStyle, rejectStyle } from "./styles";
import "./FileDropzone.scss";

const validateFiles = (files, maxFiles, acceptedFileExtensions) => {
  if (files.length > maxFiles) {
    return `Максимально допустимое количество файлов: ${maxFiles}`;
  }

  const fileWithUnacceptedExtension = files.find(
    (file) => !acceptedFileExtensions.includes(file.name.split(".").pop())
  );

  if (fileWithUnacceptedExtension) {
    return `Недопустимый формат файла: ${fileWithUnacceptedExtension.name}`;
  }

  return null;
};

const FileDropzone = ({ acceptedFileTypes, maxFiles = 1, onDrop }) => {
  const [files, setFiles] = useState([]);
  const [validationError, setValidationError] = useState(null);

  const acceptedFileExtensions = acceptedFileTypes.map((t) => t.extensions).reduce((a, b) => a.concat(b), []);

  useEffect(
    () => () => {
      files.forEach((file) => URL.revokeObjectURL(file.preview));
    },
    [files]
  );

  const handleDrop = useCallback(
    (acceptedFiles, rejectedFiles) => {
      const rejected = rejectedFiles.map(({ file }) => file);
      const error = validateFiles(rejected, maxFiles, acceptedFileExtensions);

      onDrop(acceptedFiles);
      setValidationError(error);
      setFiles(acceptedFiles.map((file) => ({ ...file, preview: URL.createObjectURL(file) })));
    },
    [acceptedFileExtensions, maxFiles, onDrop]
  );

  const {
    acceptedFiles,
    fileRejections,
    isDragActive,
    isDragAccept,
    isDragReject,
    getInputProps,
    getRootProps,
  } = useDropzone({
    maxFiles,
    accept: acceptedFileTypes.map((t) => t.value).join(", "),
    onDrop: handleDrop,
  });

  const style = useMemo(
    () => ({
      ...(isDragActive ? activeStyle : {}),
      ...(isDragAccept || acceptedFiles.length > 0 ? acceptStyle : {}),
      ...(isDragReject || fileRejections.length > 0 ? rejectStyle : {}),
    }),
    [isDragActive, isDragAccept, acceptedFiles.length, isDragReject, fileRejections.length]
  );

  return (
    <section className="file-dropzone">
      <div className="file-dropzone__dropzone" {...getRootProps({ style })}>
        <input {...getInputProps()} />
        <p>
          {!isDragActive && "Перетащите файлы сюда или кликните, чтобы выбрать вручную"}
          {isDragAccept && "Отпустите, чтобы начать загрузку"}
          {isDragReject && "Данный формат не поддерживается"}
        </p>
        <Icon type={iconTypes.uploadCloud} size="large" />
        <em>{acceptedFileExtensions.join(", ").toUpperCase()}</em>
      </div>
      {validationError}
      <aside className="thumbs">
        {files.map((file, index) => (
          <img key={index} className="thumbs__img" src={file.preview} alt={file.name} />
        ))}
      </aside>
    </section>
  );
};

export default FileDropzone;
