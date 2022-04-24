import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";

type Tab = { name: string; component: JSX.Element };
export const ShopTabs = (props: { tabs: Tab[] }) => {
  return (
    <Tabs isLazy>
      <TabList>
        {props.tabs.map((tab) => (
          <Tab key={tab.name}>{tab.name}</Tab>
        ))}
      </TabList>
      <TabPanels>
        {props.tabs.map((tab) => (
          <TabPanel key={tab.name}>{tab.component}</TabPanel>
        ))}
      </TabPanels>
    </Tabs>
  );
};
