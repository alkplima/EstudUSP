import { ReactNode, useEffect, useState, useCallback } from "react";
import { api } from "../lib/axios";
import { createContext } from "use-context-selector";
import { Post } from "./PostsContext";

export interface Subject {
  id: number;
  title: string;
  semester: number;
  previewImg: string;
  lastQuestions: Post[];
}

interface CreateSubjectInput {
  title: string;
  semester: number;
  previewImg: string;
}

interface SubjectsContextType {
  disciplines: Subject[];
  activeSubjectId: number;
  setActiveSubjectId: (id: number) => void;
  fetchSubjects: (query?: string) => Promise<void>;
  createSubject: (data: CreateSubjectInput) => Promise<void>;
}

export const SubjectsContext = createContext({} as SubjectsContextType);

interface SubjectsProviderProps {
  children: ReactNode;
}

export function SubjectsProvider({ children }: SubjectsProviderProps) {
  const [disciplines, setSubjects] = useState<Subject[]>([]);
  const [activeSubjectId, setActiveSubjectId] = useState(-1);
  
  const fetchSubjects = useCallback(async (query?: string) => {
    const response = await api.get('/subjects', {
      params: {
        _sort: 'title', // pode ser 'semester' tbm, se tiverem mais disciplinas
        _order: 'z',
        q: query,
      }
    });
    
    setSubjects(response.data);
  }, []);

  const createSubject = useCallback(async (data: CreateSubjectInput) => {
    const { title, semester, previewImg } = data;

    const response = await api.post('/subjects', {
      title,
      semester,
      previewImg,
    });

    setSubjects(state => [response.data, ...state])
  }, []);

  useEffect(() => {
    fetchSubjects();
  }, [fetchSubjects]);

  return (
    <SubjectsContext.Provider value={{
      disciplines,
      activeSubjectId,
      setActiveSubjectId,
      fetchSubjects,
      createSubject,
    }}>
      {children}
    </SubjectsContext.Provider>
  )

  
}

