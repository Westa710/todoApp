import { TabsType } from './types/Tabs.type'

type TodoItemProps = {
  tabs: TabsType,
  selectedTab: string,
  onToggleTodo: (index: number) => void
}

export const TodoItem = (props: TodoItemProps) => {
  const { tabs, 
          selectedTab,
          onToggleTodo,
  } = props;

  return (
    <>
      {tabs[selectedTab].map((todo, index) => {
        return (
          <div key={index} className='
            w-[260px]
            mx-0
            flex
            border-b-2
            items-center
            border-gray-600
            h-10
            pl-2
          '>
            <label htmlFor={`todo-${index}`} className="flex items-center">
              <input 
                type="checkbox"
                id={`todo-${index}`}
                checked={todo.completed}
                onChange={() => {onToggleTodo(index)}}
                className="form-checkbox h-5 w-5 text-blue-600 rounded-full"
              />
              <span className="ml-2">{todo.name}</span>
            </label>
          </div>
        )
      })}
    </>
  )
}