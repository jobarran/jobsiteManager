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

    <div className="dashboard-container flex flex-col items-center">
      <Breadcrumb element={breadElements} />

      {project ? (
        <ProjectTopMenu
          id={project.id}
          name={project.name}
          description={project.description}
          status={project.status}
        />
      ) : (
        <div></div>
      )}

      <div className="w-full xl:flex">
        <div className="w-full xl:w-4/6 xl:mr-4 mb-4 xl:mb-0">
          <div className="charts-card">
            <ProjectDashboardChartsCard />
          </div>
        </div>
        <div className="w-full xl:w-2/6">
          <div className="todo-card">
            {
              project
                ? <ProjectDashboardTodoCard tasks={tasks} />
                : <div>Loading...</div>
            }
          </div>
        </div>
      </div>
    </div>

  );
} 