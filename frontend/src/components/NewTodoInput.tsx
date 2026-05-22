import { useCallback, useState } from 'react'
import { TabsType } from './types/Tabs.type'


type NewTodoInputProps = {
  tabs: TabsType,
  selectedTab: string,
  setTabs: (tabs: TabsType) => void
}

export const NewTodoInput = (props: NewTodoInputProps) => {
  const { tabs, selectedTab, setTabs } = props;

  const [newTodoName, setNewTodoName] = useState("");

  const onClickSaveTodo = useCallback(() => {
    if(newTodoName === "") {
      return;
    };

    for (const todo of tabs[selectedTab]) {
      if (newTodoName === todo.name) {
        window.alert("同名のTODOは追加できません");
        return;
      }
    }

    const newTodos = tabs[selectedTab];
    newTodos.push({name: newTodoName, completed: false});
    
    const newTabs = { ...tabs };
    newTabs[selectedTab] = newTodos;

    setTabs(newTabs);
    setNewTodoName("");
  }, [newTodoName, tabs, selectedTab, setTabs]);

  const todoInputKeyDown = useCallback((event: React.KeyboardEvent<HTMLInputElement>) => {
    if(event.key === "Enter"){
      onClickSaveTodo();
    }
  }, [onClickSaveTodo]);
  
  return (
  <>
    <input type="text"
            value={newTodoName}
            onChange={(e) => setNewTodoName(e.target.value)}
            onKeyDown={todoInputKeyDown}
            placeholder=' TODOを入力' 
            className='
              mt-2
              rounded-md
              focus:outline-none 
              focus:ring-2
              focus:ring-cyan-300 
              focus:ring-opacity-75
    '/>
    <button onClick={onClickSaveTodo} className='
      pl-1
      text-xl
    '>+</button>
  </>
  )
}