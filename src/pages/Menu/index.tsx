// import { Button } from "@primer/react";
import { useEffect } from "react";
import { ForumContainer } from "./styles";
import { DisciplinePreview } from './components/DisciplinePreview'
import { DisciplinesContext } from "../../contexts/DisciplinesContext";
import { useContextSelector } from "use-context-selector";
import { SearchForm } from "./components/SearchForm";
export function Menu() {
  const disciplines = useContextSelector(DisciplinesContext, (context) => context.disciplines);

  const fetchDisciplines = useContextSelector(DisciplinesContext, (context) => {
    return context.fetchDisciplines;
  });

  useEffect(() => {
    fetchDisciplines('');
  }, [fetchDisciplines]);

  return (
    <ForumContainer>
      <SearchForm />
      {disciplines.flatMap(discipline => {
        return (
          <DisciplinePreview key={discipline.id} discipline={discipline} />
        )
      })}
    </ForumContainer>
  )
}