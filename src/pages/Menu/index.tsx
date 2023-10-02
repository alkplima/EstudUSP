// import { Button } from "@primer/react";
import { useEffect, useState } from "react";
import { ForumContainer } from "./styles";
import { DisciplinePreview } from './components/DisciplinePreview'
import { DisciplinesContext } from "../../contexts/DisciplinesContext";
import { useContextSelector } from "use-context-selector";
import { SearchForm } from "./components/SearchForm";
import { Loading } from "../../components/Loading/styles";
export function Menu() {
  const [isLoading, setIsLoading] = useState(false);
  const disciplines = useContextSelector(DisciplinesContext, (context) => context.disciplines);

  const fetchDisciplines = useContextSelector(DisciplinesContext, (context) => {
    return context.fetchDisciplines;
  });

  useEffect(() => {
    setIsLoading(true);
    fetchDisciplines('')
      .then(() => {
        setIsLoading(false);
      })
      .catch(() => {
        setIsLoading(false);
      });
  }, [fetchDisciplines]);

  return (
    <ForumContainer>
      <SearchForm />
      {disciplines.flatMap(discipline => {
        return (
          <DisciplinePreview key={discipline.id} discipline={discipline} />
        )
      })}
      {isLoading &&
        <Loading size={25}>
            <img src='./loading.svg' alt='EstudUSP - Loading' />
        </Loading>
      }
    </ForumContainer>
  )
}