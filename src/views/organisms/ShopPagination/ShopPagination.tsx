import React from "react";
import { Center, Flex } from "@chakra-ui/react";
import Pagination from "@choc-ui/paginator";

export function ShopPagination(props: {
  total: number;
  defaultCurrent: number;
  onChange?: (page: number) => void;
  current?: number;
}) {
  return (
    <Flex
      justifyContent={"center"}
      alignItems={"center"}
      p={1}
      bg={"gray.300"}
      borderRadius={5}
    >
      <Pagination
        showTotal={(total) => `${total} Items`}
        defaultCurrent={props.defaultCurrent}
        total={props.total}
        paginationProps={{ display: "flex" }}
        size={"md"}
        //pageSizeOptions={[18]}
        defaultPageSize={18}
        showSizeChanger
        onChange={props.onChange}
        current={props.current}
      />
    </Flex>
  );
}
