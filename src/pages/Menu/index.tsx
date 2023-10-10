// import { Button } from "@primer/react";
import { useEffect, useState } from "react";
import { ForumContainer } from "./styles";
import { SubjectPreview } from './components/SubjectsPreview'
import { SubjectsContext } from "../../contexts/SubjectsContext";
import { useContextSelector } from "use-context-selector";
import { SearchForm } from "./components/SearchForm";
import { Loading } from "../../components/Loading/styles";

export function Menu() {
const [isLoading, setIsLoading] = useState(true);
const subjects = useContextSelector(SubjectsContext, (context) => context.subjects);

  const fetchSubjects = useContextSelector(SubjectsContext, (context) => {
    return context.fetchSubjects;
  });

  useEffect(() => {
    fetchSubjects('')
      .finally(() => {
        setIsLoading(false);
      });
  }, [fetchSubjects]);

  return (
    <ForumContainer>
      <SearchForm />
      {subjects.flatMap(discipline => {
        return (
          <SubjectPreview key={discipline.id} discipline={discipline} />
        )
      })}
      {isLoading &&
        <Loading size={25}>
            <img src='/loading.svg' alt='EstudUSP - Loading' />
        </Loading>
      }
    </ForumContainer>
  )
}