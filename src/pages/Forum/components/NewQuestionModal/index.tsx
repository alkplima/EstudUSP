import * as Dialog from '@radix-ui/react-dialog'
import { CloseButton, Content, Overlay, QuestionForm } from './styles'
import { useContextSelector } from 'use-context-selector';

import { ChangeEvent, FormEvent, useState } from 'react';
import { PostsContext } from '../../../../contexts/PostsContext';
import FileList from '../../../../components/FileList';
import Upload from '../../../../components/Upload';
import { X } from 'phosphor-react';

interface NewQuestionModalProps {
  activeDisciplineId: number;
  setIsQuestionCardOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export function NewQuestionModal({ activeDisciplineId, setIsQuestionCardOpen }: NewQuestionModalProps) {
  
  const createPost = useContextSelector(PostsContext, (context) => context.createPost);
  
  const [newQuestionAuthor, setNewQuestionAuthor] = useState('');
  const [newQuestionTitle, setNewQuestionTitle] = useState('');
  const [newQuestionText, setNewQuestionText] = useState('');

  function handleNewQuestionChange(event: ChangeEvent<HTMLTextAreaElement>) {
    event.target.setCustomValidity('');
    setNewQuestionText(event.target.value);
  }
  
  function handleNewAuthorChange(event: ChangeEvent<HTMLInputElement>) {
    setNewQuestionAuthor(event.target.value);
  }

  function handleTitleChange(event: ChangeEvent<HTMLInputElement>) {
    event.target.setCustomValidity('');
    setNewQuestionTitle(event.target.value);
  }
  
  function handleNewQuestionInvalid(event: ChangeEvent<HTMLTextAreaElement>) {
    event.target.setCustomValidity('Preencha este campo');
  }
  
  const isNewQuestionEmpty = newQuestionText.length === 0;

  const isNewQuestionTitleEmpty = newQuestionTitle.length === 0;



  async function handleCreateNewQuestion(event: FormEvent) {
    event.preventDefault();

    const newPost = {
      name: newQuestionAuthor,
      postTitle: newQuestionTitle,
      content: newQuestionText,
      disciplineId: activeDisciplineId,
    }

    await createPost(newPost);

    setNewQuestionAuthor('');
    setNewQuestionTitle('');
    setNewQuestionText('');

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

        <QuestionForm onSubmit={handleCreateNewQuestion}>
          <input 
            name='author'
            type="text"
            placeholder='Nome (opcional)'
            value={newQuestionAuthor}
            onChange={handleNewAuthorChange}
          />

          <input 
            name='postTitle'
            type="text"
            placeholder='Título da pergunta'
            value={newQuestionTitle}
            onChange={handleTitleChange}
            required
          />

          <textarea 
            name='comment'
            placeholder='Descreva a sua pergunta'
            value={newQuestionText}
            onChange={handleNewQuestionChange}
            onInvalid={handleNewQuestionInvalid}
            required
          />

          <Upload />
          <FileList />

          <button type='submit' disabled={isNewQuestionEmpty || isNewQuestionTitleEmpty}>Publicar</button>
        </QuestionForm>
        
      </Content>
    </Dialog.Portal>
  )
}