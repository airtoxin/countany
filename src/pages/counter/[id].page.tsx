import { NextPage } from "next";
import { useRouter } from "next/router";

const CounterDetailPage: NextPage = () => {
  const router = useRouter();
  const id = router.query.id;
  return (
    <h1>{id}</h1>
  )
};

export default CounterDetailPage;
