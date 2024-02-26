import { getCompanyByUserActiveCompany } from "@/actions";
import { Title } from "@/components";
import { RegisterUserForm } from "./ui/RegisterUserForm";



export default async function () {

    const { ok, company = [] } = await getCompanyByUserActiveCompany();


    return (

        <div>

            <RegisterUserForm />

        </div>

    );
}