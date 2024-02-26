import { getProjectById } from "@/actions";
import { Breadcrumb, ProjectTopMenu } from "@/components";

interface Props {
    params: {
        id: string;
    };
}

export default async function ProjectByIdPersonalPage({ params }: Props) {

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
            name: 'Personal',
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
                        shortName={project.shortName ? project.shortName : ''}
                        location={project.location ? project.location : ''}
                        end={project.end ? project.end : ''}
                    />
                    : <div></div>
            }

            <h1>Personal Page</h1>
        </div>
    );
} 