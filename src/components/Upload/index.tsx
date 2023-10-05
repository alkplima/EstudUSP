import { useCallback } from "react";
import { useDropzone } from "react-dropzone";

import { DropContainer, UploadMessage } from "./styles";
import { useFiles } from "../../contexts/files";
import { UploadSimple } from "phosphor-react";


function Upload() {
  const { handleUpload } = useFiles();

  const onDrop = useCallback(
    (files: File[]) => {
      handleUpload(files);
    },
    [handleUpload]
  );

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragReject,
  } = useDropzone({
    // accept: {types: ["image/jpeg", "image/pjpeg", "image/png", "image/gif"]},
    onDrop,
  });

  const renderDragMessage = useCallback(() => {
    if (!isDragActive) {
      return <UploadMessage>Adicione/arraste imagens aqui <UploadSimple/></UploadMessage>;
    }

    if (isDragReject) {
      return (
        <UploadMessage type="error">
          Tipo de arquivo não suportado
        </UploadMessage>
      );
    }

    return <UploadMessage type="success">Solte as imagens aqui</UploadMessage>;
  }, [isDragActive, isDragReject]);

  return (
    <DropContainer 
      {...getRootProps()} 
      isDragReject={isDragReject} 
      isDragActive={isDragActive} 
    >
      <input {...getInputProps()} />
      {renderDragMessage()}
    </DropContainer>
  );
}

export default Upload;