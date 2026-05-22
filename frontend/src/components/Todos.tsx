import { TodoItem } from "./TodoItem"
import { NewTodoInput } from "./NewTodoInput"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { memo, useCallback } from 'react'
import { TabsType } from './types/Tabs.type'


type TodosProps = {
  tabs: TabsType,
  setTabs: (tabs: TabsType) => void,
  selectedTab: string
}

const TodosComponent = (props: TodosProps) => { 

  const { tabs, setTabs, selectedTab } = props;

  const onToggleTodo = useCallback((index: number) => {
    const newTabs = { ...tabs }; 
    newTabs[selectedTab] = [...newTabs[selectedTab]];
    newTabs[selectedTab][index] = { ...newTabs[selectedTab][index], completed: !newTabs[selectedTab][index].completed };
    setTabs(newTabs);
  }, [tabs, selectedTab, setTabs]);

  

  const onClickDeleteTodo = useCallback(() => {
    const newTabs = { ...tabs }; 
    newTabs[selectedTab] = [ ...newTabs[selectedTab].filter(todo => todo.completed === false) ];
    setTabs(newTabs);
  }, [tabs, selectedTab, setTabs]);

  return(
    <div className='
      w-80
      mt-10
      min-h-[400px]
      mx-auto
      py-5
      px-1
      flex
      justify-center
      bg-gray-200
      rounded-3xl
      relative
    '>
      <ul>
        <TodoItem tabs={tabs}
                  selectedTab={selectedTab}
                  onToggleTodo={onToggleTodo}
        />
        <div>
          <NewTodoInput tabs={tabs}
                        selectedTab={selectedTab}
                        setTabs={setTabs}/>
          <button onClick={onClickDeleteTodo} className='
            absolute
            bottom-4
            right-2
            mt-2
            mr-2
          ' >
          <FontAwesomeIcon icon={faTrash} /></button> 
        </div>
      </ul>
    </div>
  )
}

export const Todos = memo(TodosComponent);