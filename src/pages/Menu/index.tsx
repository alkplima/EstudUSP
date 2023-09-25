// import { Button } from "@primer/react";
import { ForumContainer } from "./styles";
import { DisciplinePreview } from './components/DisciplinePreview'
import { DisciplinesContext } from "../../contexts/DisciplinesContext";
import { useContextSelector } from "use-context-selector";
import { SearchForm } from "./components/SearchForm";
export function Menu() {
  const disciplines = useContextSelector(DisciplinesContext, (context) => context.disciplines);

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