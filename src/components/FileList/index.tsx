import { CircularProgressbar } from "react-circular-progressbar";
import { MdCheckCircle, MdError, MdLink } from "react-icons/md";
import { Container, FileInfo } from "./styles";
import { IFile, useFiles } from "../../contexts/files";
import { PreviewImage } from "../PreviewImage";

const FileList = () => {
  const { uploadedFiles: files, deleteFile } = useFiles();

  // if (!files.length)
  //   return (
  //     <span>
  //       <MdMoodBad
  //         style={{ marginLeft: "45%", marginTop: 10 }}
  //         size={24}
  //         color="#d5d2d2"
  //       />
  //     </span>
  //   );

  return (
    <Container>
      {files.map((uploadedFile: IFile) => (
        <li key={uploadedFile.id}>
          <FileInfo>
            <PreviewImage src={uploadedFile.preview} />
            <div>
              <strong>{uploadedFile.name}</strong>
              <span>
                {uploadedFile.readableSize}{" "}
                {!!uploadedFile.url && (
                  <button onClick={() => deleteFile(uploadedFile.id)}>
                    Excluir
                  </button>
                )}
              </span>
            </div>
          </FileInfo>

          <div>
            {!uploadedFile.uploaded && !uploadedFile.error && (
              <CircularProgressbar
                styles={{
                  root: { width: 24 },
                  path: { stroke: "#7159c1" },
                }}
                strokeWidth={10}
                text={String(uploadedFile.progress)}
                value={uploadedFile.progress || 0}
              />
            )}

            {uploadedFile.url && (
              <a
                href={uploadedFile.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                <MdLink style={{ marginRight: 8 }} size={24} color="#fff" />
              </a>
            )}

            {uploadedFile.uploaded && (
              <MdCheckCircle size={24} color="#78e5d5" />
            )}
            {uploadedFile.error && <MdError size={24} color="#e57878" />}
          </div>
        </li>
      ))}
    </Container>
  );
};

export default FileList;