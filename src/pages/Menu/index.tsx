// import { Button } from "@primer/react";
import { useEffect } from "react";
import { ForumContainer } from "./styles";
import { SubjectPreview } from './components/SubjectsPreview'
import { SubjectsContext } from "../../contexts/SubjectsContext";
import { useContextSelector } from "use-context-selector";
import { SearchForm } from "./components/SearchForm";
export function Menu() {
  const subjects = useContextSelector(SubjectsContext, (context) => context.subjects);

  const fetchSubjects = useContextSelector(SubjectsContext, (context) => {
    return context.fetchSubjects;
  });

  useEffect(() => {
    fetchSubjects('');
  }, [fetchSubjects]);

  return (
    <ForumContainer>
      <SearchForm />
      {subjects.flatMap(discipline => {
        return (
          <SubjectPreview key={discipline.id} discipline={discipline} />
        )
      })}
    </ForumContainer>
  )
}