import * as Dialog from '@radix-ui/react-dialog'
import { CloseButton, Content, Overlay, QuestionForm } from './styles'
import { useContextSelector } from 'use-context-selector';

import { CreatePostInput, PostsContext } from '../../../../contexts/PostsContext';
import FileList from '../../../../components/FileList';
import Upload from '../../../../components/Upload';
import { X } from 'phosphor-react';
import { useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';

interface NewQuestionModalProps {
  setIsQuestionCardOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export function NewQuestionModal({ setIsQuestionCardOpen }: NewQuestionModalProps) {
  const { subjectId } = useParams();

  const createPost = useContextSelector(PostsContext, (context) => context.createPost);

  const { register, handleSubmit, formState: { errors } } = useForm<CreatePostInput>({
    defaultValues: {
      username: '',
      title: '',
      content: '',
    }
  });
  
  async function handleCreateNewQuestion(data: CreatePostInput) {
    const newPost = {
      username: data.username,
      title: data.title,
      content: data.content,
      subjectId: subjectId || '',
    }

    await createPost(newPost);
    setIsQuestionCardOpen(false);
  }

  return (
    <Dialog.Portal>
      <Overlay />

      <Content>
        <Dialog.Title>Nova pergunta</Dialog.Title>

        <CloseButton>
          <X size={24} />
        </CloseButton>

        <QuestionForm onSubmit={handleSubmit(handleCreateNewQuestion)}>
          <input 
            type="text"
            placeholder='Nome (opcional)'
            {...register("username")}
          />

          <input 
            type="text"
            placeholder='Título da pergunta'
            {...register("title", { required: true, minLength: 5, maxLength: 100 })}
          />
          {errors.title && <span>Título inválido!</span>}

          <textarea 
            placeholder='Descreva a sua pergunta'
            {...register("content", { required: true, minLength: 5, maxLength: 1000 })}
          />
          {errors.content && <span>Campo inválido!</span>}

          <Upload />
          <FileList />

          <button type='submit'>Publicar</button>
        </QuestionForm>
        
      </Content>
    </Dialog.Portal>
  )
}