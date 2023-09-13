import { PencilLine } from 'phosphor-react'

import styles from './Sidebar.module.css'
import { Avatar } from './Avatar'

export function Sidebar () {
  return (
    <aside className={styles.sidebar}>
      <img 
        className={styles.cover} 
        src="https://images.unsplash.com/photo-1597852074816-d933c7d2b988?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80"
      />
      
      <div className={styles.profile}>
        {/* <Avatar src="https://github.com/alkplima.png" /> */}

        <strong>Organização e Arquitetura de Computadores II</strong>
        <span>Semestre 4</span>
      </div>

      {/* <footer>
        <a href="#">
          <PencilLine
            size={20}
          />
          Editar seu perfil
        </a>
      </footer> */}
    </aside>
  )
}