import type { NextPage } from "next";
import gql from "graphql-tag";
import { useCallback, useState } from "react";
import { useHomePageMutation } from "@/pages/index.page.gen";
import { useRouter } from "next/router";

gql`
  mutation HomePage($name: String!) {
    createCounter(name: $name) {
      id
    }
  }
`;

const HomePage: NextPage = () => {
  const router = useRouter();
  const [name, setName] = useState("");
  const { mutateAsync } = useHomePageMutation();
  const handleClick = useCallback(() => {
    mutateAsync({ name }).then((result) => {
      return router.push(
        `/${encodeURIComponent(name)}/${encodeURIComponent(
          result.createCounter.id
        )}`
      );
    });
  }, [mutateAsync, name, router]);

  return (
    <div>
      <label>カウンター名</label>
      <input
        type="text"
        value={name}
        onChange={(event) => setName(event.target.value)}
      />
      <button onClick={handleClick}>create button</button>
    </div>
  );
};

export default HomePage;
