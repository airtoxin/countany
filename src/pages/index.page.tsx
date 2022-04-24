import type { NextPage } from 'next'
import gql from "graphql-tag";

gql`
  mutation HomePage($name: String!) {
    createCounter(name: $name) {
      id
    }
  }
`;

const HomePage: NextPage = () => {
  return (
    <div>
      <button>create button</button>
    </div>
  )
}

export default HomePage
