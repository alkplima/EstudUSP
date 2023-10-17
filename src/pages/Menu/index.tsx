// import { Button } from "@primer/react";
import { useEffect, useState } from "react";
import { ForumContainer } from "./styles";
import { SubjectPreview } from './components/SubjectsPreview'
import { SubjectsContext } from "../../contexts/SubjectsContext";
import { useContextSelector } from "use-context-selector";
import { SearchForm } from "./components/SearchForm";
import { Loading } from "../../components/Loading/styles";
import { TermsPopup } from "./components/TermsPopup";

export function Menu() {
  const [isTermsPopupOpen, setIsTermsPopupOpen] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const subjects = useContextSelector(SubjectsContext, (context) => context.subjects);

  const fetchSubjects = useContextSelector(SubjectsContext, (context) => {
    return context.fetchSubjects;
  });

  useEffect(() => {
    const termsPopupState = localStorage.getItem('termsPopupState');
    if (termsPopupState === 'closed') {
      setIsTermsPopupOpen(false);
    }
  }
  , []);

  useEffect(() => {
    fetchSubjects('')
      .finally(() => {
        setIsLoading(false);
      });
  }, [fetchSubjects]);

  return (
    <>
      {!isTermsPopupOpen ? (
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
      ) : (
        <TermsPopup setOpen={setIsTermsPopupOpen} />
      )}
    </>
  )
}