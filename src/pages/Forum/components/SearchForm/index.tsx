import { MagnifyingGlass } from "phosphor-react";
import { SearchFormContainer } from "./styles";
import { useForm } from "react-hook-form";
import * as z from 'zod';
import { zodResolver } from "@hookform/resolvers/zod";
import { TransactionsContext } from "../../../../contexts/DisciplinesContext";
import { useContextSelector } from "use-context-selector";
// import { memo } from "react";

/**
 * Três motivos para um compnoente renderizar?
 * - Hooks changed (mudou estado, contexto, reducer, etc);
 * - Props changed (mudou propriedades);
 * - Parent component re-rendered (componente pai renderizou);
 * 
 * Qual o fluxo de renderização?
 * 1. O React recria o HTML da interface daquele componente;
 * 2. O React compara a versão do HTML novo com a do HTML antigo;
 * 3. SE mudou alguma coisa, ele reescreve o HTML na tela;
 * 
 * Memo:
 * 0. Hooks changed, Props changed (deep comparison)?
 * 0.1: Comparar a versão anterior doos hooks e props;
 * 0.2: SE mudou algo, ele vai permitir a nova renderização;
 * 
 * (Só vale a pena usar o Memo se o componente for muito grande, o que não é o caso aqui...)
 */

const searchFormSchema = z.object({
  query: z.string(),
});

type SearchFormInputs = z.infer<typeof searchFormSchema>;

// function SearchFormComponent() {
export function SearchForm() {
  const fetchTransactions = useContextSelector(TransactionsContext, (context) => {
    return context.fetchTransactions;
  });

  const { 
    register, 
    handleSubmit,
    formState: { isSubmitting }, 
  } = useForm<SearchFormInputs>({
    resolver: zodResolver(searchFormSchema),
});

  async function handleSearchTransactions(data: SearchFormInputs) {
    await fetchTransactions(data.query);
  }

  return (
    <SearchFormContainer onSubmit={handleSubmit(handleSearchTransactions)}>
      <input 
        type="text" 
        placeholder="Busque uma transação" 
        {...register('query')}
      />

      <button type="submit" disabled={isSubmitting}>
        <MagnifyingGlass size={20} />
        Buscar
      </button>
    </SearchFormContainer>
  )
}

// export const SearchForm = memo(SearchFormComponent);