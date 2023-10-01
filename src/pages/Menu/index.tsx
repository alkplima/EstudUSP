// import { Button } from "@primer/react";
import { useEffect } from "react";
import { ForumContainer } from "./styles";
import { SubjectPreview } from './components/SubjectsPreview'
import { SubjectsContext } from "../../contexts/SubjectsContext";
import { useContextSelector } from "use-context-selector";
import { SearchForm } from "./components/SearchForm";
export function Menu() {
  const disciplines = useContextSelector(SubjectsContext, (context) => context.disciplines);

  const fetchSubjects = useContextSelector(SubjectsContext, (context) => {
    return context.fetchSubjects;
  });

  useEffect(() => {
    fetchSubjects('');
  }, [fetchSubjects]);

  return (
    <ForumContainer>
      <SearchForm />
      {disciplines.flatMap(discipline => {
        return (
          <SubjectPreview key={discipline.id} discipline={discipline} />
        )
      })}
    </ForumContainer>
  )
}