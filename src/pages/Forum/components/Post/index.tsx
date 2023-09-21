import { ChangeEvent, FormEvent, InvalidEvent, useState } from 'react';
import { uniqueId } from 'lodash';

import { Comment } from '../Comment';
// import { Button } from '@primer/react'
import { CommentForm, PostContainer } from './styles';
import { Upload } from '../../../../components/Upload';
import { FileList } from '../../../../components/FileList';
import { filesize } from 'filesize';
import { api } from '../../../../lib/axios';

interface Author {
  username: string;
  avatarUrl: string;
}

// interface Content {
//   type: 'paragraph' | 'link';
//   content: string;
// }

export interface PostType {
  id: number;
  author: Author;
  title: string;
  publishedAt: Date;
  content: string;
}

interface PostProps {
  post: PostType;
}

export interface UploadedFile {
  file: File;
  id: string;
  name: string;
  readableSize: string;
  preview: string;
  progress: number;
  uploaded: boolean;
  error: boolean;
  url: string | null;
}

export function Post({ post }: PostProps) {
  const [comments, setComments] = useState<string[]>([]);
  const [likeCount, setLikeCount] = useState(0);
  const [isAnswerBoxOpen, setIsAnswerBoxOpen] = useState(false);

  const [newCommentText, setNewCommentText] = useState('');
  const [newCommentAuthor, setNewCommentAuthor] = useState('');

  const [state, setState] = useState<UploadedFile[]>([]);
  
  // useEffect(() => {
  //   const fetchData = async () => {
  //     const response = await api.get('/images');
  //     setState(response.data.map((image: UploadedFile) => ({
  //       ...image,
  //       id: image.id,
  //       name: image.name,
  //       readableSize: image.readableSize,
  //       preview: image.url || null,
  //       uploaded: true,
  //       progress: 100,
  //       error: false,
  //       url: image.url || null,
  //     })));
  //   };
    
  //   fetchData();
    
  //   return () => {
  //     state.forEach(file => URL.revokeObjectURL(file.preview));
  //   }
  // }, []);

  function handleUpload(files: File[]) {
    const newUploadedFiles = files.map(file => ({
      file,
      id: uniqueId(),
      name: file.name,
      readableSize: filesize(file.size),
      preview: URL.createObjectURL(file),
      progress: 0,
      uploaded: false,
      error: false,
      url: null,
    }));

    setState((prevUploadedFiles) => [...prevUploadedFiles, ...newUploadedFiles]);

    uploadedFiles.forEach((file) => processUpload(file));
  }

  function updateFile(fileId: string, data: Partial<UploadedFile>) {
    setState((prevUploadedFiles) => {
      return prevUploadedFiles.map(uploadedFile => {
        return fileId === uploadedFile.id
          ? { ...uploadedFile, ...data }
          : uploadedFile;
      });
    });
  }

  function processUpload(uploadedFile: UploadedFile) {
    const data = new FormData();

    data.append('file', uploadedFile.file, uploadedFile.name);

    // createImage({
    //   name: uploadedFile.name,
    //   size: uploadedFile.file.size,
    //   url: uploadedFile.preview,
    //   postId: post.id
    // });

    api.post('/images', {
      name: uploadedFile.name,
      size: uploadedFile.file.size,
      url: uploadedFile.preview,
      postId: post.id      
    }, {
      onUploadProgress: (e) => {
        if (e.total !== undefined) {
          const progress = Math.round((e.loaded * 100) / e.total);
          
          updateFile(uploadedFile.id, { progress });
        }
      }
    }).then((response) => {
      updateFile(uploadedFile.id, {
        uploaded: true,
        id: response.data.id, // talvez precise mudar isso pra _id, a depender do SGBD
        url: response.data.url,
      });
    }).catch(() => {
      updateFile(uploadedFile.id, {
        error: true,
      });
    });
  }

  const handleDeleteFile= async (uploadedFile: UploadedFile) => {
    await api.delete(`images/${uploadedFile.id}`)
    setState((prevUploadedFiles) => {
      return prevUploadedFiles.filter(file => file.id !== uploadedFile.id);
    });
  }

  function handleLikePost() {
    setLikeCount(previousState => {
      return previousState + 1;
    });
  }

  function handleOpenAnswerBox() {
    setIsAnswerBoxOpen(true);
  }

  function handleNewAuthorChange(event: ChangeEvent<HTMLInputElement>) {
    setNewCommentAuthor(event.target.value);
  }

  function handleCreateNewComment(event: FormEvent) {
    event.preventDefault();

    setComments([...comments, newCommentText]);
    setNewCommentText('');
  }

  function handleNewCommentChange(event: ChangeEvent<HTMLTextAreaElement>) {
    event.target.setCustomValidity('');
    setNewCommentText(event.target.value);
  }

  function handleNewCommentInvalid(event: InvalidEvent<HTMLTextAreaElement>) {
    event.target.setCustomValidity('O comentário não pode estar vazio');
  }

  function deleteComment(commentToDelete: string) {
    const commentsWithoutDeletedOne = comments.filter(c => c !== commentToDelete);

    setComments(commentsWithoutDeletedOne);
  }

  const isNewCommentEmpty = newCommentText.length === 0;

  const uploadedFiles = state;

  return (
    <PostContainer>

      <div className='content'>
        {post.content}

        <div>
          <button onClick={handleLikePost} className='likeButton' >
            Tenho a mesma pergunta ({likeCount})
          </button>

          {!isAnswerBoxOpen &&
            <button onClick={handleOpenAnswerBox} className='likeButton' >
              Adicionar resposta
            </button>
          }
        </div>
      </div>

      {isAnswerBoxOpen &&
        <CommentForm onSubmit={handleCreateNewComment} >
          <strong>Sua resposta:</strong>

          <input 
            name='author'
            type="text"
            placeholder='Nome (opcional)'
            value={newCommentAuthor}
            onChange={handleNewAuthorChange}
          />

          <textarea 
            name='comment'
            placeholder='Deixe a sua resposta'
            value={newCommentText}
            onChange={handleNewCommentChange}
            onInvalid={handleNewCommentInvalid}
            required
          />

          <Upload onUpload={handleUpload} />
          {!!uploadedFiles.length && (
            <FileList files={uploadedFiles} onDelete={handleDeleteFile} />
          )}

          <footer>
            {/* <Button type='submit' disabled={isNewCommentEmpty} size='large'>
              Publicar
            </Button> */}
            <button type='submit' disabled={isNewCommentEmpty}>
              Publicar
            </button>
          </footer>
        </CommentForm>
      }


      <div className='commentList'>
        <>
          <strong>Respostas</strong>
          {
            comments.length === 0 && (
              <p style={{marginTop: '1rem'}}>Seja o primeiro a responder!</p>
            )
          }
          {comments.map(comment => {
            return (
              <Comment 
              key={comment} 
              content={comment} 
              onDeleteComment={deleteComment} 
              />
              )
            })}
        </>
      </div>
    </PostContainer>
  );
}