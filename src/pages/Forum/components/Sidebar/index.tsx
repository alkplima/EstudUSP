// import { PencilLine } from 'phosphor-react'
import { SidebarContainer, SidebarItem } from './styles'
import { SubjectsContext } from '../../../../contexts/SubjectsContext';
import { useContextSelector } from 'use-context-selector';
import { Subtitle } from '../../../../styles/global';
import { CaretLeft } from 'phosphor-react';
import { Link } from 'react-router-dom';
// import { Avatar } from '../../../../components/Avatar'


export function Sidebar () {

  const { disciplines, activeSubjectId } = useContextSelector(SubjectsContext, (context) => {
    return {
      disciplines: context.disciplines,
      activeSubjectId: context.activeSubjectId,
    }
  });
  
  let currentActiveSubject = disciplines.find(discipline => discipline.id === activeSubjectId);

  if (!currentActiveSubject) {
    currentActiveSubject = disciplines.find(discipline => discipline.id === parseInt(localStorage.getItem('activeSubjectId') || "-1", 10));
  }
  
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
            <h6>{currentActiveSubject.name}</h6>
            <Subtitle>Semestre {currentActiveSubject.semester}</Subtitle>
          </div>
        </SidebarItem>
      }
    </SidebarContainer>
  )
}