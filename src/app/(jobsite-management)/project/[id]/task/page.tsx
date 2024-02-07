import { getProjectById, getProjectTasksById } from "@/actions";
import { Breadcrumb, ProjectTopMenu } from "@/components";
import { ProjectTaskTable } from "./ui/ProjectTaskTable";

interface Props {
    params: {
        id: string;
    };
}

const breadElements = [
    {
        name: 'Projects',
        href: '/project',
        link: '/project',
    },
    {
        name: 'Tasks',
        href: '',
        link: '',
    },
]

export default async function ProjectByIdTaskPage({ params }: Props) {

    const { id } = params;
    const { ok, project } = await getProjectById(id);
    const { tasks } = await getProjectTasksById(project!.id);

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
            {
                project
                    ? <ProjectTaskTable tasks={tasks} projectId={project.id} />
                    : <div>Loading...</div>
            }

        </div>
    );
} 