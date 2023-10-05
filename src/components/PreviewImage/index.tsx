import { PreviewContainer } from "./styles";

import pdfImg from "../../assets/ImgPreviewIcons/pdf.png";
import videoImg from "../../assets/ImgPreviewIcons/video.png";
import textImg from "../../assets/ImgPreviewIcons/text.png";
import audioImg from "../../assets/ImgPreviewIcons/audio.png";
import zipImg from "../../assets/ImgPreviewIcons/zip.png";
import spreadsheetImg from "../../assets/ImgPreviewIcons/spreadsheet.png";
import { IFile } from "../../contexts/files";

interface PreviewImageProps {
  file: IFile;
}

function getPreviewSrc(file: IFile): string {
  const fileType = file.file.type;

  // Arquivos de áudio
  if (fileType.startsWith('audio/')) {
    return audioImg;
  
    // Arquivos de vídeo ou ogg para vídeo
  } else if (fileType.startsWith('video/') || fileType === 'application/ogg') {
    return videoImg;
  
    // Arquivos de imagem
  } else if (fileType.startsWith('image/')) {
    return file.preview;
  
    // Arquivos PDF
  } else if (fileType === 'application/pdf') {
    return pdfImg;
  
    // Planilhas do Excel (xlsx)
  } else if (fileType === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
    return spreadsheetImg;
  
    // Arquivos ZIP
  } else if (fileType === 'application/zip') {
    return zipImg;
  
    // Documentos de texto (txt, doc, docx)
  } else if (fileType === 'text/plain' || fileType === 'application/msword' || fileType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
    return textImg;
  
    // Outros tipos de arquivo
  } else {
    return ''; // Retorne a imagem padrão ou '' para tipos desconhecidos
  }
}

export function PreviewImage({ file }: PreviewImageProps) {
  const previewSrc = getPreviewSrc(file);

  return <PreviewContainer src={previewSrc} />;
}