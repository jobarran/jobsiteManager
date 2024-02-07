import { getCompanyByUserActiveCompany } from "@/actions";
import { Title } from "@/components";
import { RegisterProjectForm } from "./ui/RegisterProjectForm";



export default async function () {

    const { ok, company = [] } = await getCompanyByUserActiveCompany();


    return (

        <div>

            <RegisterProjectForm />

        </div>

    );
}