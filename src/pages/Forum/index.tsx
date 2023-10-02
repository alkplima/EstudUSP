// import { Button } from "@primer/react";
import { useState, useEffect } from "react";
import { ForumContainer } from "./styles";
import { Sidebar } from "./components/Sidebar";
import { PostPreview } from './components/PostPreview'
import { FileProvider } from "../../contexts/files";
import { useContextSelector } from "use-context-selector";
import { PostsContext } from "../../contexts/PostsContext";
import { Button } from "../../components/Button/styles";
import { SearchForm } from "./components/SearchForm";
import { DisciplinesContext } from "../../contexts/DisciplinesContext";
import * as Dialog from '@radix-ui/react-dialog'
import { NewQuestionModal } from "./components/NewQuestionModal";
import { Plus } from "phosphor-react";
import { CommentsProvider } from "../../contexts/CommentsContext";
import { Loading } from "../../components/Loading/styles";


export function Forum() {
  const [isLoading, setIsLoading] = useState(false);

  const posts = useContextSelector(PostsContext, (context) => context.posts);
  // const createPost = useContextSelector(PostsContext, (context) => context.createPost);
  let activeDisciplineId = useContextSelector(DisciplinesContext, (context) => context.activeDisciplineId);

  if (activeDisciplineId === -1) {
    activeDisciplineId = parseInt(localStorage.getItem('activeDisciplineId') || "-1", 10);
  } else {
    localStorage.setItem('activeDisciplineId', activeDisciplineId.toString());
  }

  const [isQuestionCardOpen, setIsQuestionCardOpen] = useState(false);

  const fetchPosts = useContextSelector(PostsContext, (context) => {
    return context.fetchPosts;
  });

  useEffect(() => {
    setIsLoading(true);
    fetchPosts()
      .then(() => {
        setIsLoading(false);
      })
      .catch(() => {
        setIsLoading(false);
      });
  }, [fetchPosts]);

  const filteredPosts = posts.filter(post => post.disciplineId === activeDisciplineId);

  return (

    <ForumContainer>
      <Sidebar />
      <main>
        {activeDisciplineId === -1 && <h6>Selecione uma disciplina para começar a estudar!</h6>}
        <FileProvider>
        <CommentsProvider>

          {activeDisciplineId !== -1 &&
          <>
            <Dialog.Root open={isQuestionCardOpen} onOpenChange={setIsQuestionCardOpen}>
              <Dialog.Trigger asChild>
                <Button onClick={() => setIsQuestionCardOpen(true)} className="newQuestionBtn"> Adicionar pergunta <Plus/></Button>
              </Dialog.Trigger>
              <NewQuestionModal activeDisciplineId={activeDisciplineId} setIsQuestionCardOpen={setIsQuestionCardOpen} />
            </Dialog.Root>

            <SearchForm />

            {filteredPosts.length === 0 && <h6>Ainda não há perguntas nesta disciplina :(</h6>
              
            }
            {filteredPosts.map(post => {
                return (
                  <PostPreview key={post.id} post={post} />
                )
            })}
            
            {isLoading &&
              <Loading size={15}>
                  <img src='./loading.svg' alt='EstudUSP - Loading' />
              </Loading>
            }
          </>
          }
          
        </CommentsProvider>
        </FileProvider>
      </main>
    </ForumContainer>
  )
}