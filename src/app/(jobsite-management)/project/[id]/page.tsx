import { getProjectById, getProjectTasksById } from "@/actions";
import { Breadcrumb, ProjectDashboardChartsCard, ProjectDashboardTodoCard, ProjectTopMenu } from "@/components";

interface Props {
  params: {
    id: string;
  };
}

export default async function ProjectByIdPage({ params }: Props) {

  const { id } = params;
  const { ok, project } = await getProjectById(id);
  const { tasks } = await getProjectTasksById(project!.id);

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

      <Breadcrumb element={breadElements} />

      <div className="dashboard-container flex flex-col items-center">

        {project ? (
          <ProjectTopMenu
            id={project.id}
            name={project.name}
            description={project.description}
            status={project.status}
            shortName={project.shortName ? project.shortName : ''}
            location={project.location ? project.location : ''}
            end={project.end ? project.end : ''}
          />
        ) : (
          <div></div>
        )}

        <div className="w-full xl:flex">
          <div className="w-full xl:w-7/12 xl:mr-4 mb-4 xl:mb-0">
            <div className="charts-card">
              <ProjectDashboardChartsCard />
            </div>
          </div>
          <div className="w-full xl:w-5/12">
            <div className="todo-card">
              <ProjectDashboardTodoCard tasks={tasks} />
            </div>
          </div>
        </div>
      </div>

    </div>
  );
} 