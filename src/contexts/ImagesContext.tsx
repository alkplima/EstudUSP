import { ReactNode, useEffect, useState, useCallback } from "react";
import { api } from "../lib/axios";
import { createContext } from "use-context-selector";

interface Image {
  file: File;
  id: number;
  name: string;
  readableSize: string;
}

interface CreateImageInput {
  name: string;
  size: number;
  url: string;
  postId: number;
}

interface ImagesContextType {
  images: Image[];
  fetchImages: (query?: string) => Promise<void>;
  createImage: (data: CreateImageInput) => Promise<void>;
}

export const ImagesContext = createContext({} as ImagesContextType);

interface ImagesProviderProps {
  children: ReactNode;
}

export function ImagesProvider({ children }: ImagesProviderProps) {
  const [images, setImages] = useState<Image[]>([]);
  
  const fetchImages = useCallback(async (query?: string) => {
    const response = await api.get('/images', {
      params: {
        _sort: 'semester',
        _order: 'desc',
        q: query,
      }
    });
    
    setImages(response.data);
  }, []);

  const createImage = useCallback(async (data: CreateImageInput) => {
    const { name, size, url, postId } = data;

    const response = await api.post('/images', {
      name,
      size,
      url,
      postId
    });
    setImages(state => [response.data, ...state])
  }, []);

  useEffect(() => {
    fetchImages();
  }, [fetchImages]);

  return (
    <ImagesContext.Provider value={{
      images,
      fetchImages,
      createImage,
    }}>
      {children}
    </ImagesContext.Provider>
  )

  
}

