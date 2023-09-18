import { Button } from "@primer/react";
import { useState, ChangeEvent } from "react";
import { ForumContainer, MainBox, NewQuestionCard, QuestionForm } from "./styles";
import { Sidebar } from "./components/Sidebar";
import { PostType } from "./components/Post";
import { PostPreview } from './components/PostPreview'
import { MinusCircle, PlusCircle } from 'phosphor-react'


const posts: PostType[] = [
  {
    id: 1,
    author: {
      avatarUrl: 'https://github.com/alkplima.png',
      username: 'Alexandre Kira'
    },
    title: 'Post 1',
    content: [
      { type: 'paragraph', content: 'Post 1'},
      { type: 'paragraph', content: 'Batatinha frita 123'},
      { type: 'paragraph', content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quo accusamus ducimus quam vitae nihil, sed, numquam ratione eligendi totam iusto minus sit deserunt? Atque explicabo a facere veniam unde vel?'},
      { type: 'link', content: 'https://github.com/alkplima'},
    ],
    publishedAt: new Date('2021-09-11 20:43:30'),
  },
  {
    id: 2,
    author: {
      avatarUrl: 'https://github.com/gustavohls1.png',
      username: 'Gustavo Henrique'
    },
    title: 'Um título tal que reflete tal problema e etc e tals e mb a bafb afdb  af d bad nf da n adn anafdbafdbadnba adfnbadn',
    content: [
      { type: 'paragraph', content: 'Post 2'},
      { type: 'paragraph', content: 'Fala galeraa 👋'},
      { type: 'paragraph', content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quo accusamus ducimus quam vitae nihil, sed, numquam ratione eligendi totam iusto minus sit deserunt? Atque explicabo a facere veniam unde vel?'},
      { type: 'link', content: 'https://github.com/gustavohls1'},
    ],
    publishedAt: new Date('2023-10-05 08:54:00'),
  },
];

export function Forum() {
  const [isQuestionCardOpen, setIsQuestionCardOpen] = useState(false);
  const [newQuestionText, setNewQuestionText] = useState('');

  function handleNewQuestionChange(event: ChangeEvent<HTMLTextAreaElement>) {
    event.target.setCustomValidity('');
    setNewQuestionText(event.target.value);
  }  
  
  const isNewQuestionEmpty = newQuestionText.length === 0


  return (

    <ForumContainer>
      <Sidebar />
      <main>
        <h1>Fórum de dúvidas</h1>
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
            <QuestionForm>
              <input 
                name='author'
                type="text"
                placeholder='Nome (opcional)'
                // value={newQuestionAuthor}
                // onChange={handleNewAuthorChange}
              />
              
              <input 
                name='title'
                type="text"
                placeholder='Título da pergunta'
                // value={newQuestionAuthor}
                // onChange={handleTitleChange}
                required
              />

              <textarea 
                name='comment'
                placeholder='Descreva a sua pergunta'
                value={newQuestionText}
                onChange={handleNewQuestionChange}
                // onInvalid={handleNewQuestionInvalid}
                required
              />
              <Button type='submit' disabled={isNewQuestionEmpty} size='large'>Publicar</Button>
            </QuestionForm>
          }
        </NewQuestionCard>
        {posts.map(post => {
          return (
            <PostPreview key={post.id} post={post} />
            )
          })}
      </main>
    </ForumContainer>
  )
}