// import { Button } from "@primer/react";
import { useState, ChangeEvent, FormEvent } from "react";
import { ForumContainer, MainBox, NewQuestionCard, QuestionForm } from "./styles";
import { Sidebar } from "./components/Sidebar";
import { PostPreview } from './components/PostPreview'
import { MinusCircle, PlusCircle } from 'phosphor-react'
import { FileProvider } from "../../contexts/files";
import Upload from "../../components/Upload";
import FileList from "../../components/FileList";
import { useContextSelector } from "use-context-selector";
import { PostsContext } from "../../contexts/PostsContext";
import { Button } from "../../components/Button/styles";
import { SearchForm } from "./components/SearchForm";
import { DisciplinesContext } from "../../contexts/DisciplinesContext";


export function Forum() {

  const posts = useContextSelector(PostsContext, (context) => context.posts);
  const createPost = useContextSelector(PostsContext, (context) => context.createPost);
  let activeDisciplineId = useContextSelector(DisciplinesContext, (context) => context.activeDisciplineId);

  if (activeDisciplineId === -1) {
    activeDisciplineId = parseInt(localStorage.getItem('activeDisciplineId') || "-1", 10);
  } else {
    localStorage.setItem('activeDisciplineId', activeDisciplineId.toString());
  }

  const [isQuestionCardOpen, setIsQuestionCardOpen] = useState(false);
  const [newQuestionText, setNewQuestionText] = useState('');

  const [newQuestionAuthor, setNewQuestionAuthor] = useState('');
  const [newQuestionTitle, setNewQuestionTitle] = useState('');

  function handleCreateNewQuestion(event: FormEvent) {
    event.preventDefault();

    const newPost = {
      name: newQuestionAuthor,
      postTitle: newQuestionTitle,
      content: newQuestionText,
      disciplineId: activeDisciplineId,
    }

    createPost(newPost);

    setNewQuestionAuthor('');
    setNewQuestionTitle('');
    setNewQuestionText('');
    setIsQuestionCardOpen(false);
  }

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

  const filteredPosts = posts.filter(post => post.disciplineId === activeDisciplineId);

  return (

    <ForumContainer>
      <Sidebar />
      <main>
        {activeDisciplineId === -1 && <h6>Selecione uma disciplina para começar a estudar!</h6>}
        <FileProvider>

          { activeDisciplineId !== -1 &&
          <>
            <SearchForm />
            <NewQuestionCard>
              <MainBox>
                <strong>Postar uma nova pergunta</strong>
                <div className='plusWrapper'>
                  {isQuestionCardOpen ?
                    <MinusCircle size={24} onClick={() => setIsQuestionCardOpen(!isQuestionCardOpen) }/>
                    :
                    <PlusCircle size={24} onClick={() => setIsQuestionCardOpen(!isQuestionCardOpen) }/> 
                  }
                </div>
              </MainBox>
              {isQuestionCardOpen &&
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

                  <Button type='submit' disabled={isNewQuestionEmpty || isNewQuestionTitleEmpty}>Publicar</Button>
                </QuestionForm>
              }
            </NewQuestionCard>
            {filteredPosts.length === 0 && <h6>Ainda não há perguntas nesta disciplina :(</h6>
              
            }
            {filteredPosts.map(post => {
                return (
                  <PostPreview key={post.id} post={post} />
                )
            })}
          </>
          }
        </FileProvider>
      </main>
    </ForumContainer>
  )
}