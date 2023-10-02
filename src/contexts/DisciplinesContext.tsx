import { ReactNode, useEffect, useState, useCallback } from "react";
import { api } from "../lib/axios";
import { createContext } from "use-context-selector";
import { AxiosResponse } from "axios";

interface Discipline {
  id: number;
  name: string;
  semester: number;
  previewImg: string;
}

interface CreateDisciplineInput {
  name: string;
  semester: number;
  previewImg: string;
}

interface DisciplinesContextType {
  disciplines: Discipline[];
  activeDisciplineId: number;
  setActiveDisciplineId: (id: number) => void;
  fetchDisciplines: (query?: string) => Promise<void | AxiosResponse<Discipline[]>>;
  createDiscipline: (data: CreateDisciplineInput) => Promise<void>;
}

export const DisciplinesContext = createContext({} as DisciplinesContextType);

interface DisciplinesProviderProps {
  children: ReactNode;
}

export function DisciplinesProvider({ children }: DisciplinesProviderProps) {
  const [disciplines, setDisciplines] = useState<Discipline[]>([]);
  const [activeDisciplineId, setActiveDisciplineId] = useState(-1);
  
  const fetchDisciplines = useCallback(async (query?: string) => {
    const response = await api.get('/disciplines', {
      params: {
        _sort: 'name', // pode ser 'semester' tbm, se tiverem mais disciplinas
        _order: 'z',
        q: query,
      }
    });
    
    setDisciplines(response.data);
    return response;
  }, []);

  const createDiscipline = useCallback(async (data: CreateDisciplineInput) => {
    const { name, semester, previewImg } = data;

    const response = await api.post('/disciplines', {
      name,
      semester,
      previewImg,
    });

    setDisciplines(state => [response.data, ...state])
  }, []);

  useEffect(() => {
    fetchDisciplines();
  }, [fetchDisciplines]);

  return (
    <DisciplinesContext.Provider value={{
      disciplines,
      activeDisciplineId,
      setActiveDisciplineId,
      fetchDisciplines,
      createDiscipline,
    }}>
      {children}
    </DisciplinesContext.Provider>
  )

  
}

