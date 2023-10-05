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
  file: File;
  progress?: number;
  error?: boolean;
  url: string;
}

interface IFileContextData {
  uploadedFiles: IFile[];
  deleteFile(id: string): void;
  handleUpload(file: File[]): void;
  clearUploads: () => void;
}

const FileContext = createContext<IFileContextData>({} as IFileContextData);

interface IFileProviderProps {
  children: React.ReactNode;
}

const FileProvider: React.FC<IFileProviderProps> = ({ children }) => {
  const [uploadedFiles, setUploadedFiles] = useState<IFile[]>([]);

  useEffect(() => {
    return () => {
      uploadedFiles.forEach((file) => URL.revokeObjectURL(file.preview));
    };
  });

  const handleUpload = useCallback(
    (files: File[]) => {
      const newUploadedFiles: IFile[] = files.map((file: File) => ({
        file,
        id: uuidv4(),
        name: file.name,
        readableSize: filesize(file.size),
        preview: URL.createObjectURL(file),
        progress: 100,
        uploaded: true,
        error: false,
        url: "",
      }));

      setUploadedFiles((state) => state.concat(newUploadedFiles));
    },
    []
  );

  const clearUploads = () => {
    setUploadedFiles([]);
  }

  const deleteFile = useCallback((id: string) => {
    api.delete(`/images/${id}`);
    setUploadedFiles((state) => state.filter((file) => file.id !== id));
  }, []);

  return (
    <FileContext.Provider value={{ uploadedFiles, deleteFile, handleUpload, clearUploads }}>
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