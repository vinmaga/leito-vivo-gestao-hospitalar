
import Layout from "@/components/layout/Layout";
import AdmissionForm from "@/components/admission/AdmissionForm";

const AdmissionsPage = () => {
  return (
    <Layout>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">New Admission</h1>
        <AdmissionForm />
      </div>
    </Layout>
  );
};

export default AdmissionsPage;
