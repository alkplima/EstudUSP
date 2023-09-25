import React, {
  createContext,
  useState,
  useEffect,
  useCallback,
  useContext,
} from "react";
import { v4 as uuidv4 } from "uuid";
import { api } from "../lib/axios";
import { filesize } from "filesize";


export interface IPost {
  id: string;
  name: string;
  size: number;
  key: string;
  url: string;
  postId: number;
}

export interface IFile {
  id: string;
  name: string;
  readableSize: string;
  uploaded?: boolean;
  preview: string;
  file: File | null;
  progress?: number;
  error?: boolean;
  url: string;
}

interface IFileContextData {
  uploadedFiles: IFile[];
  deleteFile(id: string): void;
  handleUpload(file: File[]): void;
}

const FileContext = createContext<IFileContextData>({} as IFileContextData);

interface IFileProviderProps {
  children: React.ReactNode;
}

const FileProvider: React.FC<IFileProviderProps> = ({ children }) => {
  const [uploadedFiles, setUploadedFiles] = useState<IFile[]>([]);

  useEffect(() => {
    api.get<IPost[]>("/images").then((response) => {
      const postFormatted: IFile[] = response.data.map((post) => {
        return {
          ...post,
          id: post.id,
          preview: post.url,
          readableSize: filesize(post.size),
          file: null,
          error: false,
          uploaded: true,
          name: post.name,
          size: post.size,
          url: post.url,
          postId: post.postId,
        };
      });

      setUploadedFiles(postFormatted);
    });
  }, []);

  useEffect(() => {
    return () => {
      uploadedFiles.forEach((file) => URL.revokeObjectURL(file.preview));
    };
  });

  const updateFile = useCallback((id: string, data: Partial<IFile>) => {
    setUploadedFiles((state) =>
      state.map((file) => (file.id === id ? { ...file, ...data } : file))
    );
  }, []);

  const processUpload = useCallback(
    (uploadedFile: IFile) => {
      // const data = new FormData();
      // if (uploadedFile.file) {
      //   data.append("file", uploadedFile.file, uploadedFile.name);
      // }
      const data = {
        preview: uploadedFile.preview,
        file: updateFile,
        error: false,
        uploaded: true,
        name: uploadedFile.name,
        size: uploadedFile.file?.size,
        url: uploadedFile.preview,
      };

      api
        .post("/images", data, {
          onUploadProgress: (progressEvent) => {
            const progress: number = Math.round(
              (progressEvent.loaded * 100) / (progressEvent.total ?? 1)
            );

            console.log(
              `A imagem ${uploadedFile.name} está ${progress}% carregada... `
            );

            updateFile(uploadedFile.id, { progress });
          },
        })
        .then((response) => {
          console.log(
            `A imagem ${uploadedFile.name} já foi enviada para o servidor!`
          );

          updateFile(uploadedFile.id, {
            uploaded: true,
            id: response.data.id,
            url: response.data.url,
          });
        })
        .catch((err) => {
          console.error(
            `Houve um problema para fazer upload da imagem ${uploadedFile.name} no servidor AWS`
          );
          console.log(err);

          updateFile(uploadedFile.id, {
            error: true,
          });
        });
    },
    [updateFile]
  );

  const handleUpload = useCallback(
    (files: File[]) => {
      const newUploadedFiles: IFile[] = files.map((file: File) => ({
        file,
        id: uuidv4(),
        name: file.name,
        readableSize: filesize(file.size),
        preview: URL.createObjectURL(file),
        progress: 0,
        uploaded: false,
        error: false,
        url: "",
      }));

      // concat é mais performático que ...spread
      // https://www.malgol.com/how-to-merge-two-arrays-in-javascript/
      setUploadedFiles((state) => state.concat(newUploadedFiles));
      newUploadedFiles.forEach(processUpload);
    },
    [processUpload]
  );

  const deleteFile = useCallback((id: string) => {
    api.delete(`/images/${id}`);
    setUploadedFiles((state) => state.filter((file) => file.id !== id));
  }, []);

  return (
    <FileContext.Provider value={{ uploadedFiles, deleteFile, handleUpload }}>
      {children}
    </FileContext.Provider>
  );
};

function useFiles(): IFileContextData {
  const context = useContext(FileContext);

  if (!context) {
    throw new Error("useFiles must be used within FileProvider");
  }

  return context;
}

export { FileProvider, useFiles };