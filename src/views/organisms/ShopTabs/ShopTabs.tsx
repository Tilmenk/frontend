import {
  Box,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Flex,
} from "@chakra-ui/react";

type Tab = { name: string; component: JSX.Element };
export const ShopTabs = (props: { tabs: Tab[] }) => {
  return (
    <Tabs isLazy>
      <TabList>
        {props.tabs.map((tab, index) => (
          <Tab ml={index === 0 ? 12 : 0} key={tab.name}>
            {tab.name}
          </Tab>
        ))}
      </TabList>
      <TabPanels>
        {props.tabs.map((tab) => (
          <TabPanel key={tab.name}>
            <Flex
              h={1000}
              borderRadius={6}
              bg={"gray.200"}
              borderWidth={1}
              borderColor={"gray.400"}
              shadow={"xl"}
              mx={12}
              alignItems={"flex-start"}
              justifyContent={"center"}
            >
              {tab.component}
            </Flex>
          </TabPanel>
        ))}
      </TabPanels>
    </Tabs>
  );
};
