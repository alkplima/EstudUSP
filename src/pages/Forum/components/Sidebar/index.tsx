// import { PencilLine } from 'phosphor-react'
import { SidebarContainer, SidebarItem } from './styles'
import { DisciplinesContext } from '../../../../contexts/DisciplinesContext';
import { useContextSelector } from 'use-context-selector';
import { Subtitle } from '../../../../styles/global';
import { ArrowLeft } from 'phosphor-react';
import { Link } from 'react-router-dom';
// import { Avatar } from '../../../../components/Avatar'


export function Sidebar () {

  const { disciplines, activeDisciplineId } = useContextSelector(DisciplinesContext, (context) => {
    return {
      disciplines: context.disciplines,
      activeDisciplineId: context.activeDisciplineId,
    }
  });
  
  let currentActiveDiscipline = disciplines.find(discipline => discipline.id === activeDisciplineId);

  if (!currentActiveDiscipline) {
    currentActiveDiscipline = disciplines.find(discipline => discipline.id === parseInt(localStorage.getItem('activeDisciplineId') || "-1", 10));
  }
  
  return (
    <SidebarContainer>
      <Link to='/' className='returnMenu'>
        <ArrowLeft size={24} />
        Voltar ao Menu
      </Link>
      {currentActiveDiscipline &&        <SidebarItem>
          <img 
            className='cover' 
            src={currentActiveDiscipline.previewImg}
          />
          <div className='profile'>
            <h6>{currentActiveDiscipline.name}</h6>
            <Subtitle>Semestre {currentActiveDiscipline.semester}</Subtitle>
          </div>
        </SidebarItem>
      }
    </SidebarContainer>
  )
}