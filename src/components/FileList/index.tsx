import { CircularProgressbar } from "react-circular-progressbar";
import { MdCheckCircle, MdError, MdLink } from "react-icons/md";
import { Container, FileInfo, Preview } from "./styles";
import { UploadedFile } from "../../pages/Forum/components/Post";

interface FileListProps {
  files: UploadedFile[];
  onDelete: (file: UploadedFile) => void;
}

export function FileList({ files, onDelete }: FileListProps) {
  return (
    <Container>
      {files.map(uploadedFile => (
        
        <li key={uploadedFile.id}>
          <FileInfo>
            <Preview src={uploadedFile.preview} />
            <div>
              <strong>{uploadedFile.name}</strong>
              <span>
                {uploadedFile.readableSize}{" "}
                {!!uploadedFile.url && (
                  <button onClick={() => onDelete(uploadedFile)}>Excluir</button>
                )}
              </span>
            </div>
          </FileInfo>

          <div>
            {!uploadedFile.uploaded && !uploadedFile.error &&
              <CircularProgressbar 
                styles={{
                  root: {width: 24},
                  path: {stroke: '#7159c1'}
                }}
                strokeWidth={10}
                value={uploadedFile.progress}
              />
            }

            {uploadedFile.url && (
              <a 
                href={uploadedFile.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                <MdLink style={{ marginRight: 8 }} size={24} color="#fff" />
              </a>
            )}

            { uploadedFile.uploaded && <MdCheckCircle size={24} color="#78e5d5" /> }
            { uploadedFile.error && <MdError size={24} color="#e57878" /> }
          </div>
        </li>
      ))}
    </Container>
  );
}