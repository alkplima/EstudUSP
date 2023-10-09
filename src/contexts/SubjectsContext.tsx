import { ReactNode, useState, useCallback } from "react";
import { api } from "../lib/axios";
import { createContext } from "use-context-selector";
import { Post } from "./PostsContext";

export interface Subject {
  id: string;
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
  subjects: Subject[];
  fetchSubjects: (query?: string) => Promise<void>;
  createSubject: (data: CreateSubjectInput) => Promise<void>;
  filterSubjects: (query: string) => void;
}

export const SubjectsContext = createContext({} as SubjectsContextType);

interface SubjectsProviderProps {
  children: ReactNode;
}

export function SubjectsProvider({ children }: SubjectsProviderProps) {
  const [subjects, setSubjects] = useState<Subject[]>([]);
  
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

  const filterSubjects = (query: string) => {
    const filteredSubjects = subjects.filter(subject => {
      return subject.title.toLowerCase().includes(query.toLowerCase());
    });

    setSubjects(filteredSubjects);
  };

  return (
    <SubjectsContext.Provider value={{
      subjects,
      fetchSubjects,
      createSubject,
      filterSubjects,
    }}>
      {children}
    </SubjectsContext.Provider>
  )

  
}

