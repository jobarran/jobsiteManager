import { getProjectById } from "@/actions";
import { Breadcrumb, ProjectTopMenu } from "@/components";

interface Props {
    params: {
        id: string;
    };
}

export default async function ProjectByIdDocsPage({ params }: Props) {

    const { id } = params;
    const { ok, project } = await getProjectById(id);
    // console.log(project)

    const breadElements = [
        {
          name: 'Projects',
          href: '/project',
          link: '/project',
        },
        {
            name: 'Docs',
            href: '',
            link: '',
          },
      ]

    return (
        <div>

            <Breadcrumb element={breadElements} />

            {
                project
                    ? <ProjectTopMenu
                        id={project.id}
                        name={project.name}
                        description={project.description}
                        status={project.status}
                    />
                    : <div></div>
            }

            <h1>Docs Page</h1>
        </div>
    );
} 