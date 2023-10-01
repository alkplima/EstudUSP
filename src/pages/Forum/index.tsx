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
import { SubjectsContext } from "../../contexts/SubjectsContext";
import * as Dialog from '@radix-ui/react-dialog'
import { NewQuestionModal } from "./components/NewQuestionModal";
import { Plus } from "phosphor-react";
import { CommentsProvider } from "../../contexts/CommentsContext";


export function Forum() {

  const posts = useContextSelector(PostsContext, (context) => context.posts);
  // const createPost = useContextSelector(PostsContext, (context) => context.createPost);
  let activeSubjectId = useContextSelector(SubjectsContext, (context) => context.activeSubjectId);

  if (activeSubjectId === -1) {
    activeSubjectId = parseInt(localStorage.getItem('activeSubjectId') || "-1", 10);
  } else {
    localStorage.setItem('activeSubjectId', activeSubjectId.toString());
  }

  const [isQuestionCardOpen, setIsQuestionCardOpen] = useState(false);

  const fetchPosts = useContextSelector(PostsContext, (context) => {
    return context.fetchPosts;
  });

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  const filteredPosts = posts.filter(post => post.disciplineId === activeSubjectId);

  return (

    <ForumContainer>
      <Sidebar />
      <main>
        {activeSubjectId === -1 && <h6>Selecione uma disciplina para começar a estudar!</h6>}
        <FileProvider>
        <CommentsProvider>

          {activeSubjectId !== -1 &&
          <>
            <Dialog.Root open={isQuestionCardOpen} onOpenChange={setIsQuestionCardOpen}>
              <Dialog.Trigger asChild>
                <Button onClick={() => setIsQuestionCardOpen(true)} className="newQuestionBtn"> Adicionar pergunta <Plus/></Button>
              </Dialog.Trigger>
              <NewQuestionModal activeSubjectId={activeSubjectId} setIsQuestionCardOpen={setIsQuestionCardOpen} />
            </Dialog.Root>

            <SearchForm />

            {filteredPosts.length === 0 && <h6>Ainda não há perguntas nesta disciplina :(</h6>
              
            }
            {filteredPosts.map(post => {
                return (
                  <PostPreview key={post.id} post={post} />
                )
            })}
          </>
          }
          
        </CommentsProvider>
        </FileProvider>
      </main>
    </ForumContainer>
  )
}