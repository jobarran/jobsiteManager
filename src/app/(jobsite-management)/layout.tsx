import { SideMenu, TopMenu } from "@/components";

export default async function JobsiteLayout({ children }: {
  children: React.ReactNode;
}) {

  return (

    <main className="min-h-screen">

      <TopMenu />
      <SideMenu />

      <div className="p-4 lg:ml-64">
        {children}
      </div>
    </main>
  );
}