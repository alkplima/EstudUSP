import { Header } from './components/Header'
import { Post } from './components/Post'
import { Sidebar } from './components/Sidebar'
import { PostType } from './components/Post'
import {BaseStyles, ThemeProvider, theme} from '@primer/react'
import deepmerge from 'deepmerge'

import styles from './App.module.css'
import './global.css'

const customTheme = deepmerge(theme, {
  fonts: {
    normal: 'Roboto, sans-serif',
    mono: 'MonoLisa, monospace',
  },
})

const posts: PostType[] = [
  {
    id: 1,
    author: {
      avatarUrl: 'https://github.com/alkplima.png',
      username: 'Alexandre Kira'
    },
    content: [
      { type: 'paragraph', content: 'Post 1'},
      { type: 'paragraph', content: 'Batatinha frita 123'},
      { type: 'paragraph', content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quo accusamus ducimus quam vitae nihil, sed, numquam ratione eligendi totam iusto minus sit deserunt? Atque explicabo a facere veniam unde vel?'},
      { type: 'link', content: 'https://github.com/alkplima'},
    ],
    publishedAt: new Date('2021-09-11 20:43:30'),
  },
  {
    id: 2,
    author: {
      avatarUrl: 'https://github.com/gustavohls1.png',
      username: 'Gustavo Henrique'
    },
    content: [
      { type: 'paragraph', content: 'Post 2'},
      { type: 'paragraph', content: 'Fala galeraa 👋'},
      { type: 'paragraph', content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quo accusamus ducimus quam vitae nihil, sed, numquam ratione eligendi totam iusto minus sit deserunt? Atque explicabo a facere veniam unde vel?'},
      { type: 'link', content: 'https://github.com/gustavohls1'},
    ],
    publishedAt: new Date('2023-10-05 08:54:00'),
  },
];

function App() {

  return (
    <ThemeProvider theme={customTheme} dayScheme='dark_dimmed'>
      <BaseStyles>
        <Header />

        <div className={styles.wrapper}>
          <Sidebar />
          <main>
            {posts.map(post => {
              return (
                <Post 
                  key={post.id} 
                  post={post}
                />
                )
              })}
          </main>
        </div>
      </BaseStyles>
    </ThemeProvider>
  )
}

export default App
