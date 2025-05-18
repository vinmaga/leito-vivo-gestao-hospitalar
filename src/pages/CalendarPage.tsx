
import Layout from "@/components/layout/Layout";

const CalendarPage = () => {
  return (
    <Layout>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">Calendar</h1>
        <div className="bg-white rounded-lg shadow p-6">
          <p>Hospital events and appointment calendar will be displayed here.</p>
        </div>
      </div>
    </Layout>
  );
};

export default CalendarPage;
