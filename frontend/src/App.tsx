import { useState } from 'react'
import { Tabs } from './components/Tabs'
import { Todos } from './components/Todos'
import './App.css'
import './index.css'


export const App = () => {
  const [tabs, setTabs] = useState({});

  const [selectedTab, setSelectedTab] = useState(Object.keys(tabs)[0]);

  return (
    <>
      <Tabs tabs={tabs}
            setTabs={setTabs}
            selectedTab={selectedTab} 
            setSelectedTab={setSelectedTab} />
      {Object.keys(tabs).length > 0 && 
        <Todos  tabs={tabs} 
                setTabs={setTabs}
                selectedTab={selectedTab} />
      }
      {Object.keys(tabs).length === 0 && 
        <p>タスクを登録するには，タブを追加してください</p>
      }
    </>
  )
}

