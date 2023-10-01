import { MagnifyingGlass } from "phosphor-react";
import { SearchFormContainer } from "./styles";
import { useForm } from "react-hook-form";
import * as z from 'zod';
import { zodResolver } from "@hookform/resolvers/zod";
import { useContextSelector } from "use-context-selector";
import { SubjectsContext } from "../../../../contexts/SubjectsContext";
import { useState } from "react";


const searchFormSchema = z.object({
  query: z.string(),
});

type SearchFormInputs = z.infer<typeof searchFormSchema>;

export function SearchForm() {
  const [currentSearchWord, setCurrentSearchWord] = useState('');

  const fetchSubjects = useContextSelector(SubjectsContext, (context) => {
    return context.fetchSubjects;
  });

  const { 
    register, 
    handleSubmit,
    formState: { isSubmitting }, 
  } = useForm<SearchFormInputs>({
    resolver: zodResolver(searchFormSchema),
  });

  async function handleSearchSubjects(data: SearchFormInputs) {
    await fetchSubjects(data.query);
    setCurrentSearchWord(data.query);
  }

  return (
    <>
      <SearchFormContainer onSubmit={handleSubmit(handleSearchSubjects)}>
        <input 
          type="text" 
          placeholder="Buscar disciplinas"
          {...register('query')}
        />

        <button type="submit" disabled={isSubmitting}>
          <MagnifyingGlass size={20} />
        </button>
      </SearchFormContainer>
      {!!currentSearchWord &&
        <p>Resultados para <i>"{currentSearchWord}"</i> :</p>
      }
    </>
  )
}

// export const SearchForm = memo(SearchFormComponent);