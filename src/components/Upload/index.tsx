import Dropzone from "react-dropzone"
import { DropContainer, UploadMessage } from "./styles";

interface UploadProps {
  onUpload: (files: File[]) => void;
}

export function Upload({ onUpload }: UploadProps) {
  function renderDragMessage(isDragActive: boolean, isDragReject: boolean) {
    if (!isDragActive) {
      return <UploadMessage>Arraste imagens aqui... (opcional)</UploadMessage>
    }

    if (isDragReject) {
      return <UploadMessage type="error">Arquivo não suportado</UploadMessage>
    }

    return <UploadMessage type="success">Solte as imagens aqui</UploadMessage>
  }  

  return (
    <div>
      <Dropzone accept={{types: ["image/*"]}} onDropAccepted={onUpload}>
        { ({ getRootProps, getInputProps, isDragActive, isDragReject }) => (
          <DropContainer
            {...getRootProps()}
            isDragActive={isDragActive}
            isDragReject={isDragReject}
          >
            <input type="file" {...getInputProps()} />
            {renderDragMessage(isDragActive, isDragReject)}
          </DropContainer>
        ) }
      </Dropzone>
    </div>
  );
}