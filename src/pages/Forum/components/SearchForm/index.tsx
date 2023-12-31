import { MagnifyingGlass } from "phosphor-react";
import { SearchFormContainer } from "./styles";
import { useForm } from "react-hook-form";
import * as z from 'zod';
import { zodResolver } from "@hookform/resolvers/zod";
import { useContextSelector } from "use-context-selector";
import { PostsContext } from "../../../../contexts/PostsContext";
import { useState } from "react";
import { useParams } from "react-router-dom";


const searchFormSchema = z.object({
  query: z.string(),
});

type SearchFormInputs = z.infer<typeof searchFormSchema>;

export function SearchForm() {
  const [currentSearchWord, setCurrentSearchWord] = useState('');
  const { subjectId } = useParams();

  const fetchPosts = useContextSelector(PostsContext, (context) => {
    return context.fetchPosts;
  });

  const { 
    register, 
    handleSubmit,
    formState: { isSubmitting }, 
  } = useForm<SearchFormInputs>({
    resolver: zodResolver(searchFormSchema),
  });

  async function handleSearchPosts(data: SearchFormInputs) {
    await fetchPosts(subjectId || '', data.query);
    setCurrentSearchWord(data.query);
  }

  return (
    <>
      <SearchFormContainer onSubmit={handleSubmit(handleSearchPosts)}>
        <input 
          type="text" 
          placeholder="Buscar perguntas pelo título/autor"
          {...register('query')}
        />

        <button type="submit" disabled={isSubmitting}>
          <MagnifyingGlass size={20} weight="bold" />
        </button>
      </SearchFormContainer>
      {!!currentSearchWord &&
        <p>Resultados para <i>"{currentSearchWord}"</i> :</p>
      }
    </>
  )
}