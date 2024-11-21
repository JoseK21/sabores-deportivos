import TabsInfo from "@/components/pages/comercios-afiliados/tabs-info";

const Page = ({ params }: { params: { slug: string } }) => {

  return (
    <main>
      <TabsInfo slug={params.slug} />
    </main>
  );
};

export default Page;
