import { getCompanyByUserActiveCompany, getCompanyProjects } from "@/actions";
import { Breadcrumb, Title } from "@/components";
import Link from "next/link";
import { ProjectTable } from "./ui/ProjectTable";

const breadElements = [
    {
      name: 'projects',
      href: '',
      link: '',
    },
  ]

export default async function () {

    const companyProjects = await getCompanyProjects();
    const projects = companyProjects.projects


    return (

        <div>

            <Breadcrumb element={breadElements} />

            <Title title={"Projects"} />


            {
                companyProjects
                    ? <ProjectTable projects={projects} />
                    : <div>Loading...</div>
            }



        </div>

    );
}