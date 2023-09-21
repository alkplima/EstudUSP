// import { PencilLine } from 'phosphor-react'
import { SidebarContainer, SidebarItem } from './styles'
import { DisciplinesContext } from '../../../../contexts/DisciplinesContext';
import { useContextSelector } from 'use-context-selector';
// import { Avatar } from '../../../../components/Avatar'

interface SidebarProps {
  activeDisciplineId: number;
  setActiveDisciplineId: (id: number) => void;
}

export function Sidebar ({ activeDisciplineId, setActiveDisciplineId  }: SidebarProps) {  
  const disciplines = useContextSelector(DisciplinesContext, (context) => {
    return context.disciplines;
  });

  function handleChangeActiveDiscipline(currentId: number) {
    setActiveDisciplineId(currentId);
  }
  
  return (
    <SidebarContainer>
      {disciplines.map(discipline => {
        return (
          <SidebarItem key={discipline.id} isActive={discipline.id===activeDisciplineId} onClick={() => handleChangeActiveDiscipline(discipline.id)}>
            <img 
              className='cover' 
              src={discipline.previewImg}
            />
            <div className='profile'>
              <strong>{discipline.name}</strong>
              <span>Semestre {discipline.semester}</span>
            </div>
          </SidebarItem>
        )
      })}
    </SidebarContainer>
  )
}