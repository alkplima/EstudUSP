import { PreviewContainer } from "./styles";

import pdfImg from "../../assets/ImgPreviewIcons/pdf.png";
import videoImg from "../../assets/ImgPreviewIcons/video.png";
import textImg from "../../assets/ImgPreviewIcons/text.png";
import audioImg from "../../assets/ImgPreviewIcons/audio.png";
import zipImg from "../../assets/ImgPreviewIcons/zip.png";
import spreadsheetImg from "../../assets/ImgPreviewIcons/spreadsheet.png";

interface PreviewImageProps {
  src: string;
}

export function PreviewImage({ src }: PreviewImageProps) {
  // Determinar a extensão do arquivo com base no nome do arquivo
  const fileExtension = src.slice(((src.lastIndexOf(".") - 1) >>> 0) + 2).toLowerCase();

  // Imagem referente à extensão do arquivo
  let previewSrc

  if (fileExtension === 'pdf') {
    // Se for um PDF
    previewSrc = pdfImg
  } else if (['mp4', 'webm', 'ogg'].includes(fileExtension)) {
    // Se for um vídeo
    previewSrc = videoImg
  } else if (['doc', 'docx', 'txt'].includes(fileExtension)) {
    // Para documentos de texto
    previewSrc = textImg
  } else if (fileExtension === 'xlsx') {
    // Para planilhas do Excel
    previewSrc = spreadsheetImg
  } else if (fileExtension === 'zip') {
    // Para arquivos ZIP
    previewSrc = zipImg
  } else if (['mp3', 'ogg'].includes(fileExtension)) {
    // Para arquivos de áudio
    previewSrc = audioImg
  } else if (['jpg', 'jpeg', 'png', 'gif', 'svg', 'tif', 'tiff'].includes(fileExtension)) {
    // Para imagens
    previewSrc = src
  } else {
    // Para outros tipos de arquivo, exibir um ícone de proibido
    previewSrc = src
  }

  return (
    <PreviewContainer src={previewSrc} />
  );
} 