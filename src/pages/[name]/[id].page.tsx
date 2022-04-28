import { NextPage } from "next";
import { useRouter } from "next/router";
import gql from "graphql-tag";
import {
  useCounterDetailPageQuery,
  useDecrementMutation,
  useIncrementMutation,
} from "@/pages/[name]/[id].page.gen";
import { z } from "zod";
import { useCallback } from "react";

gql`
  query CounterDetailPage($id: ID!, $name: String!) {
    counter(id: $id, name: $name) {
      count
    }
  }
  mutation Increment($id: ID!, $name: String!) {
    incrementCount(id: $id, name: $name)
  }
  mutation Decrement($id: ID!, $name: String!) {
    decrementCount(id: $id, name: $name)
  }
`;

const CounterDetailPage: NextPage = () => {
  const router = useRouter();
  const id = z.string().nonempty().parse(router.query.id);
  const name = z.string().nonempty().parse(router.query.name);
  const { data, refetch } = useCounterDetailPageQuery({ id, name });
  const { mutateAsync: increment } = useIncrementMutation();
  const { mutateAsync: decrement } = useDecrementMutation();
  const handleClickIncrement = useCallback(() => {
    increment({ id, name }).then(() => refetch());
  }, [id, increment, name, refetch]);
  const handleClickDecrement = useCallback(() => {
    decrement({ id, name }).then(() => refetch());
  }, [decrement, id, name, refetch]);

  if (data == null) return null;
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <div>
        <h1>{name}</h1>
        <h2>count: {data.counter.count}</h2>
        <button onClick={handleClickIncrement}>+1</button>
        <button onClick={handleClickDecrement}>-1</button>
      </div>
    </div>
  );
};

CounterDetailPage.getInitialProps = async () => ({ pageProps: {} });

export default CounterDetailPage;
