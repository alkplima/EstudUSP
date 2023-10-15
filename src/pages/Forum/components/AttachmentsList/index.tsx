import { DownloadSimple } from "phosphor-react";
import { Container, FileInfo, PreviewContainer } from "./styles";
import pdfImg from "../../../../assets/ImgPreviewIcons/pdf.png"
import videoImg from "../../../../assets/ImgPreviewIcons/video.png"
import textImg from "../../../../assets/ImgPreviewIcons/text.png"
import spreadsheetImg from "../../../../assets/ImgPreviewIcons/pdf.png"
import zipImg from "../../../../assets/ImgPreviewIcons/zip.png"
import audioImg from "../../../../assets/ImgPreviewIcons/audio.png"

interface AttachmentsListProps {
  attachments: string[];
}

const AttachmentsList = ({ attachments }: AttachmentsListProps) => {

  function getExtensionFromURL(url: string): string {
    const urlParts = url.split('.');
    if (urlParts.length > 1) {
      return urlParts[urlParts.length - 1].toLowerCase();
    }
    return '';
  }
  
  function getPreviewSrc(url: string): string {
    const fileExtension = getExtensionFromURL(url);
  
    switch (fileExtension) {
      case 'pdf':
        return pdfImg;
      case 'mp4':
      case 'webm':
      case 'ogv':
      case 'mov':
      case 'mkv':
      case 'flv':
        return videoImg;
      case 'doc':
      case 'docx':
      case 'txt':
        return textImg;
      case 'xlsx':
        return spreadsheetImg;
      case 'zip':
        return zipImg;
      case 'mp3':
      case 'ogg':
        return audioImg;
      default:
        return '';
    }
  }

  function extractFileNameFromURL(url: string) {
    const decodedURL = decodeURIComponent(url);
    const urlParts = decodedURL.split('/');
    const fileNameWithExtension = urlParts[urlParts.length - 1];
    return fileNameWithExtension;
  }

  const isFileImage = (file: string): boolean => {
    return file.endsWith('.jpg') || file.endsWith('.jpeg') || file.endsWith('.png') || file.endsWith('.gif') || file.endsWith('.svg') || file.endsWith('.svg+xml') || file.endsWith('.tiff') || file.endsWith('.tif');
  }

  const images: string[] = [];
  const downloads: string[] = [];

  attachments.forEach((attachment: string) => {
    if (isFileImage(attachment)) {
      images.push(attachment);
    } else {
      downloads.push(attachment);
    }
  });


  return (
    <Container>
      {images.map((image: string, index: number) => (
        <img src={image} alt="" key={index} />
      ))}

      {downloads.map((download: string, index: number) => {
        const previewSrc = getPreviewSrc(download);
        const fileName = extractFileNameFromURL(download)
        return (
          <li key={index}>
            <FileInfo>
              <a
                href={download}
                download
              >
                <PreviewContainer src={previewSrc} />
              </a>
              <div>
                <a
                  href={download}
                  download
                >
                  <strong>{fileName}</strong>
                </a>
                {/* <span>
                  {download.readableSize}{" "}
                </span> */}
              </div>
            </FileInfo>

            <div>
              <a
                href={download}
                download
              >
              <DownloadSimple size={24} weight="bold" />
              </a>
            </div>
          </li>
        )
      })}
    </Container>
  );
};

export default AttachmentsList;