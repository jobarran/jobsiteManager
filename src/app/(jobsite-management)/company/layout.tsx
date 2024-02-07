import { auth } from "@/auth.config";
import { redirect } from "next/navigation";

export default async function JobsiteLayout({ children }: {
 children: React.ReactNode;
}) {

  return (

    <main className="flex justify-center">
      <div className="w-full sm:w-[500px]">
        {children}
      </div>
    </main>
  );
}