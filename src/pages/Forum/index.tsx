// import { Button } from "@primer/react";
import { useState, useEffect } from "react";
import { ForumContainer } from "./styles";
import { Sidebar } from "./components/Sidebar";
import { PostPreview } from './components/PostPreview'
import { useFiles } from "../../contexts/files";
import { useContextSelector } from "use-context-selector";
import { PostsContext } from "../../contexts/PostsContext";
import { Button } from "../../components/Button/styles";
import { SearchForm } from "./components/SearchForm";
import * as Dialog from '@radix-ui/react-dialog'
import { NewQuestionModal } from "./components/NewQuestionModal";
import { Plus } from "phosphor-react";
import { CommentsProvider } from "../../contexts/CommentsContext";
import { useParams } from "react-router-dom";
import { Loading } from "../../components/Loading/styles";

export function Forum() {
  const { clearUploads } = useFiles();

  const [isLoading, setIsLoading] = useState(true);

  const posts = useContextSelector(PostsContext, (context) => context.posts);

  const { subjectId } = useParams();

  const [isQuestionCardOpen, setIsQuestionCardOpen] = useState(false);

  const fetchPosts = useContextSelector(PostsContext, (context) => {
    return context.fetchPosts;
  });

  function handleOpenQuestionCard() {
    clearUploads();
    setIsQuestionCardOpen(true);
  }

  useEffect(() => {
    fetchPosts(subjectId || '')
      .finally(() => {
        setIsLoading(false);
      });
  }, [subjectId, fetchPosts]);

  useEffect(() => {
    fetchPosts(subjectId || '');
  }, [fetchPosts, subjectId]);

  return (

    <ForumContainer>
      <Sidebar />
      <main>
        <CommentsProvider>

        <Dialog.Root open={isQuestionCardOpen} onOpenChange={setIsQuestionCardOpen}>
          <Dialog.Trigger asChild>
            <Button onClick={handleOpenQuestionCard} className="newQuestionBtn"> Adicionar pergunta <Plus weight="bold"/></Button>
          </Dialog.Trigger>
          <NewQuestionModal setIsQuestionCardOpen={setIsQuestionCardOpen} />
        </Dialog.Root>

        <SearchForm />

            {posts.length === 0 && !isLoading && <h6>Ainda não há perguntas nesta disciplina :(</h6>}
            {posts.map(post => <PostPreview key={post.id} post={post} />)}
            
            {isLoading &&
              <Loading size={15}>
                  <img src='/loading.svg' alt='EstudUSP - Loading' />
              </Loading>
            }
          
        </CommentsProvider>
      </main>
    </ForumContainer>
  )
}