import { memo } from 'react';

type TabItemProps = {
  tabsName: string[],
  selectedTab: string,
  onClickSelectTab: (tab: string) => void,
  onClickDeleteTab: (tab: string) => void
}

const tabItemComponent = (props: TabItemProps) => {
  const {
    tabsName,
    selectedTab,
    onClickSelectTab,
    onClickDeleteTab
  } = props

  const MAX_TAB_NAME_LENGTH = 6;

  const truncateTabName = (name: string) => {
    if (name.length > MAX_TAB_NAME_LENGTH) {
      return name.substring(0, MAX_TAB_NAME_LENGTH) + '...';
    }
    return name;
  }


  return (
    <>
      {(tabsName.map((tab, index) => {
        const truncatedTab = truncateTabName(tab);
        const selectButtonClass = `h-8 w-28 text-lg ${tab === selectedTab ? 'border-b-2 border-blue-400 bg-gray-300' : 'bg-gray-200'} text-gray-700`;
        const deleteButtonClass = `h-8 w-10 ${tab === selectedTab ? 'border-b-2 border-blue-400 bg-gray-300' : 'bg-gray-200'}  justify-center inline-flex item-center mt-0 text-2xl`;
        return (
          <li key={index} className="
            flex
            h-8
            w-30
            text-lg
          ">
            <button onClick={() => onClickSelectTab(tab)} className={selectButtonClass}>{truncatedTab}</button>
            <button onClick={() => onClickDeleteTab(tab)} className={deleteButtonClass}>×</button>
          </li>
        );
      }))}
    </>
  )
}

export const TabItem = memo(tabItemComponent);