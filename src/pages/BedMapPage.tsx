
import Layout from "@/components/layout/Layout";
import BedMap from "@/components/beds/BedMap";

const BedMapPage = () => {
  return (
    <Layout>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">Bed Map</h1>
        <BedMap />
      </div>
    </Layout>
  );
};

export default BedMapPage;
