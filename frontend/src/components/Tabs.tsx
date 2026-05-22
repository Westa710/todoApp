import { TabItem } from './TabItem'
import { NewTabInput } from './NewTabInput';
import { memo, useCallback } from 'react'
import { TabsType } from './types/Tabs.type'

type TabsProps = {
  tabs: TabsType,
  setTabs: (tabs: TabsType) => void,
  selectedTab: string,
  setSelectedTab: (tab: string) => void
}

const TabsComponent = (props: TabsProps) => {
  const { tabs, setTabs, selectedTab, setSelectedTab } = props;

  const tabsName = Object.keys(tabs);

  const onClickSelectTab = useCallback((tab: string) => {
    setSelectedTab(tab);
  }, [setSelectedTab]);

  const onClickDeleteTab = useCallback((tabName: keyof TabsType) => {
    const ifTabHasUncompletedTodo = tabs[tabName].some((tab) => {
      return tab.completed === false;
    })
    
    if(ifTabHasUncompletedTodo){
      if(!window.confirm('未終了のTODOが含まれています．タブを削除しますか?')){
        return;
      }
    }
    const newTabs = { ...tabs };
    delete newTabs[tabName];
    setTabs(newTabs);
    if(tabName === selectedTab) {
      setSelectedTab(Object.keys(newTabs)[0] || "");
    }
  }, [tabs, selectedTab, setTabs, setSelectedTab]);

  return (
    <div className='overflow-x-auto'>
      <ul className='flex'>
        <TabItem  tabsName={tabsName}
                  selectedTab={selectedTab}
                  onClickSelectTab={onClickSelectTab}
                  onClickDeleteTab={onClickDeleteTab}
        />
        <NewTabInput  tabs={tabs}
                      setTabs={setTabs}
                      setSelectedTab={setSelectedTab}
        />
      </ul>
    </div>
  )
}

export const Tabs = memo(TabsComponent);