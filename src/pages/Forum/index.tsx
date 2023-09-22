// import { Button } from "@primer/react";
import { useState, ChangeEvent, FormEvent } from "react";
import { ForumContainer, MainBox, NewQuestionCard, QuestionForm } from "./styles";
import { Sidebar } from "./components/Sidebar";
import { PostPreview } from './components/PostPreview'
import { MinusCircle, PlusCircle } from 'phosphor-react'
import { DisciplinesContext, DisciplinesProvider } from "../../contexts/DisciplinesContext";
import { FileProvider } from "../../contexts/files";
import Upload from "../../components/Upload";
import FileList from "../../components/FileList";
import { useContextSelector } from "use-context-selector";
import { PostsContext } from "../../contexts/PostsContext";
import { Button } from "../../components/Button/styles";
import { SearchForm } from "./components/SearchForm";


export function Forum() {
  const disciplines = useContextSelector(DisciplinesContext, (context) => context.disciplines);

  const posts = useContextSelector(PostsContext, (context) => context.posts);
  const createPost = useContextSelector(PostsContext, (context) => context.createPost);

  const [activeDisciplineId, setActiveDisciplineId] = useState(-1);
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
      upvote: 0,
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


  return (

    <ForumContainer>
      <DisciplinesProvider>
        <Sidebar 
          activeDisciplineId={activeDisciplineId}
          setActiveDisciplineId={setActiveDisciplineId}
        />
      </DisciplinesProvider>
      <main>
        <h1>Fórum de dúvidas</h1>
        {activeDisciplineId !== -1 && <h1 className="disciplineName">{disciplines.find(discipline => discipline.id===activeDisciplineId)?.name}</h1>} 
        {activeDisciplineId === -1 && <h2>Selecione uma disciplina para começar a estudar!</h2>}
        <FileProvider>

          { activeDisciplineId !== -1 &&
          <>
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
            <SearchForm />
            {posts.flatMap(post => {
              if (post.disciplineId === activeDisciplineId) {
                return (
                  <PostPreview key={post.id} post={post} />
                )
              }
            })}
          </>
          }
        </FileProvider>
      </main>
    </ForumContainer>
  )
}