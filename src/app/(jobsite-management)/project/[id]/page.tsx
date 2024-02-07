import { getProjectById } from "@/actions";
import { Breadcrumb, ProjectTopMenu } from "@/components";

interface Props {
  params: {
    id: string;
  };
}

export default async function ProjectByIdPage({ params }: Props) {

  const { id } = params;
  const { ok, project } = await getProjectById(id);

  const breadElements = [
    {
      name: 'Projects',
      href: '/project',
      link: '/project',
    },
    {
      name: 'Dashboard',
      href: '',
      link: '',
    },
  ]

  return (
    <div>

      <Breadcrumb element={ breadElements } />

      {
        project
          ? <ProjectTopMenu
            id={project.id}
            name={project.name}
            description={project.description}
            status={project.status}
          // selected={selected}
          />
          : <div></div>
      }

      <h1>Dashboard Page</h1>
    </div>
  );
} 