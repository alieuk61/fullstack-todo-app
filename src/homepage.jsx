import { useState, useContext } from 'react';
import Header from './components/header';
import './styles/homepage/_homepage.scss';
import InputDiv from './components/input-div';
import { myContext } from './context/context';
import CrossIcon from './assets/images/icon-cross';


function HomePage() {
  const [count, setCount] = useState(0);
  const {commentsData, todoFilter, currentPage, setPage, dynamicPageFilter, todoUpdate, deleteMany} = useContext(myContext);

  return (
    <main className='homepage'>
        <Header />

        <section className='todo-list'>
          <InputDiv />

          <div className='todos'>
            {
              dynamicPageFilter().map((todo, index) => {
            
                return(
                  <div key={index} className='todo'>
                    <div style={{display: 'flex', gap: '20px'}}>
                    <button className={`${todo.completed ? 'checked' : 'null'}`} onClick={(e) => {
                      todoUpdate(todo)
                      }}></button>
                    <p style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>{todo.item}</p>
                    </div>
                    <CrossIcon todoObj = {todo} />
                  </div>
                )
              })
            }
            <section className='footer'>
              <div className='todo-length'>
                <h5>{commentsData.length} items left</h5>
              </div>
              <div className='dynamic-page-buttons'>
                {
                  todoFilter.map((page, index) => {
                    return(
                      <h5 
                      onClick={() => {setPage(page)}}
                      className={`${page === currentPage ? 'active' : null}`}
                      >{page}</h5>
                    )
                  })
                }
              </div>
              <div className='clear-completed'>
                <h5 onClick={deleteMany}>Clear completed</h5>
              </div>
            </section>
          </div>
        </section>

    </main>
  )
}

export default HomePage;
