
import Layout from "@/components/layout/Layout";
import WaitingList from "@/components/waitinglist/WaitingList";

const WaitingListPage = () => {
  return (
    <Layout>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">Waiting List</h1>
        <WaitingList />
      </div>
    </Layout>
  );
};

export default WaitingListPage;
