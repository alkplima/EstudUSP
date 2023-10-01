import { formatDistanceToNow } from 'date-fns'
import ptBr from 'date-fns/locale/pt-BR'

import { SubjectLastQuestions, SubjectPreviewContainer, SubjectPreviewContent } from './styles';
import { Subtitle } from '../../../../styles/global';
import { useContextSelector } from 'use-context-selector';
import { Link } from 'react-router-dom';
import { SubjectsContext, Subject } from '../../../../contexts/SubjectsContext';

interface SubjectProps {
  discipline: Subject;
}

export function SubjectPreview({ discipline }: SubjectProps) {
  const setActiveSubjectId = useContextSelector(SubjectsContext, (context) => context.setActiveSubjectId);

  function handleSetActiveSubjectId() {
    setActiveSubjectId(discipline.id);
  }

  return (    
    <SubjectPreviewContainer>
      <Link to={`/forum`} onClick={handleSetActiveSubjectId}>
        <SubjectPreviewContent>
          <div className="disciplineImg">
            <img src={discipline.previewImg} alt="" />
          </div>
          <div className='disciplineInfo'>
            <h6>{discipline.title}</h6>
            <Subtitle>Semestre {discipline.semester}</Subtitle>
          </div>
        </SubjectPreviewContent>

        {discipline.lastQuestions.length > 0 && 
          <SubjectLastQuestions>
            <table>
              <tbody>
                <tr>
                  <td><Subtitle>Últimas dúvidas</Subtitle></td>
                  <td></td>
                </tr>
                {discipline.lastQuestions.map(post => {
                  return (
                    <tr key={post.id}>
                      <td><p>{post.title}</p></td>
                      <td><span>{formatDistanceToNow(new Date(post.publishedAt), {locale: ptBr})}</span></td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </SubjectLastQuestions>
        }
      </Link>
    </SubjectPreviewContainer>
  );
}