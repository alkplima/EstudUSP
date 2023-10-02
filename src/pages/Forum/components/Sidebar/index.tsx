// import { PencilLine } from 'phosphor-react'
import { SidebarContainer, SidebarItem } from './styles'
import { SubjectsContext } from '../../../../contexts/SubjectsContext';
import { useContextSelector } from 'use-context-selector';
import { Subtitle } from '../../../../styles/global';
import { CaretLeft } from 'phosphor-react';
import { Link, useParams } from 'react-router-dom';
// import { Avatar } from '../../../../components/Avatar'


export function Sidebar () {

  const { subjects } = useContextSelector(SubjectsContext, (context) => {
    return {
      subjects: context.subjects,
    }
  });

  const { subjectId } = useParams();
  const currentActiveSubject = subjects.find(discipline => discipline.id === subjectId);

  console.log({ subjectId, subjects });
  
  return (
    <SidebarContainer>
      <Link to='/' className='returnMenu'>
        <CaretLeft size={24} />
        Voltar ao Menu
      </Link>
      {currentActiveSubject &&        <SidebarItem>
          <img 
            className='cover' 
            src={currentActiveSubject.previewImg}
          />
          <div className='profile'>
            <h6>{currentActiveSubject.title}</h6>
            <Subtitle>Semestre {currentActiveSubject.semester}</Subtitle>
          </div>
        </SidebarItem>
      }
    </SidebarContainer>
  )
}