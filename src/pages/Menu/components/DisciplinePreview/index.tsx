import { formatDistanceToNow } from 'date-fns'
import ptBr from 'date-fns/locale/pt-BR'

import { DisciplineLastQuestions, DisciplinePreviewContainer, DisciplinePreviewContent } from './styles';
import { Subtitle } from '../../../../styles/global';
import { useContextSelector } from 'use-context-selector';
import { PostsContext } from '../../../../contexts/PostsContext';
import { Link } from 'react-router-dom';
import { DisciplinesContext } from '../../../../contexts/DisciplinesContext';


export interface DisciplineType {
  id: number;
  name: string;
  semester: number;
  previewImg: string;
}

interface DisciplineProps {
  discipline: DisciplineType;
}

export function DisciplinePreview({ discipline }: DisciplineProps) {

  const posts = useContextSelector(PostsContext, (context) => context.posts);
  const setActiveDisciplineId = useContextSelector(DisciplinesContext, (context) => context.setActiveDisciplineId);

  const orderedReverseFilteredPosts = posts.filter(post => post.disciplineId === discipline.id);

  function handleSetActiveDisciplineId() {
    setActiveDisciplineId(discipline.id);
  }

  return (
    
    <DisciplinePreviewContainer>
      <Link to={`/forum`} onClick={handleSetActiveDisciplineId}>
        <DisciplinePreviewContent>
          <div className="disciplineImg">
            <img src={discipline.previewImg} alt="" />
          </div>
          <div className='disciplineInfo'>
            <h6>{discipline.name}</h6>
            <Subtitle>Semestre {discipline.semester}</Subtitle>
          </div>
        </DisciplinePreviewContent>

        {orderedReverseFilteredPosts.length > 0 && 
          <DisciplineLastQuestions>
            <table>
              <tbody>
                <tr>
                  <td><Subtitle>Últimas dúvidas</Subtitle></td>
                  <td></td>
                </tr>
                {orderedReverseFilteredPosts.slice(0, 4).map(post => {
                  return (
                    <tr key={post.id}>
                      <td><p>{post.postTitle}</p></td>
                      <td><span>{formatDistanceToNow(new Date(post.publishedAt), {locale: ptBr})}</span></td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </DisciplineLastQuestions>
        }
      </Link>
    </DisciplinePreviewContainer>
  );
}