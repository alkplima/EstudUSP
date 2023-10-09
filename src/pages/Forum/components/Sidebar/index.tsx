// import { PencilLine } from 'phosphor-react'
import { ComplaintInfoContainer, SidebarContainer, SidebarItem } from './styles'
import { SubjectsContext } from '../../../../contexts/SubjectsContext';
import { useContextSelector } from 'use-context-selector';
import { Subtitle } from '../../../../styles/global';
import { CaretLeft, Info } from 'phosphor-react';
import { Link, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { SecondaryButton } from '../../../../components/SecondaryButton/styles';
// import { Avatar } from '../../../../components/Avatar'

export function Sidebar () {

  const { subjects, fetchSubjects } = useContextSelector(SubjectsContext, (context) => {
    return {
      subjects: context.subjects,
      fetchSubjects: context.fetchSubjects,
    }
  });

  useEffect(() => {
    if (!subjects.length) fetchSubjects();
  });

  const { subjectId } = useParams();
  const currentActiveSubject = subjects.find(discipline => discipline.id === subjectId);
  
  return (
    <SidebarContainer>
      <Link to='/'>
        <SecondaryButton variant={false} >
          <CaretLeft size={20} />
          Voltar
        </SecondaryButton>
      </Link>
      {currentActiveSubject &&        
        <SidebarItem>
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
      <ComplaintInfoContainer>
        
        <p><Info size={20} /> Caso encontre algum erro ou deseje denunciar alguma pergunta ou resposta, envie um email para <a href="mailto:atendimento@estudusp.com.br">atendimento@estudusp.com.br</a>. Você pode anexar prints para nos ajudar a identificar os problemas.</p>
      </ComplaintInfoContainer>
    </SidebarContainer>
  )
}