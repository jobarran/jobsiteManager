import Link from "next/link"
import { IoIosArrowForward } from "react-icons/io";
import { GoHomeFill } from "react-icons/go";



interface Props {
    element?: {
        name: string,
        href: string,
        link: string,
    }[]
}

export const Breadcrumb = ({ element }: Props) => {

    return (

        <nav className="flex mb-3" aria-label="Breadcrumb">
            <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
                <Link
                    href={'/'} as={'/'}
                    className="inline-flex items-center" passHref
                >
                    <GoHomeFill className="w-3 h-3 me-2.5 dark:text-gray-400" />
                    <span className='inline-flex items-center text-sm font-medium text-gray-400 hover:text-gray-700'>Home</span>
                </Link>

                {
                    element?.length !== 0
                        ?
                        element?.map((item: any, index: number) => (
                            item.href !== '' ?
                                <div key={index}>
                                    <Link key={index} href={item.href} as={item.link} className="inline-flex items-center" passHref>
                                        <IoIosArrowForward className="w-3 h-3 me-2.5" />
                                        <span className='inline-flex items-center text-sm font-medium text-gray-400 hover:text-gray-700'>{item.name}</span>
                                    </Link>
                                </div>
                                :
                                <div key={index} className="inline-flex items-center">
                                    <IoIosArrowForward className="w-3 h-3 me-2.5" />
                                    <span className='inline-flex items-center text-sm font-medium text-gray-400'>{item.name}</span>
                                </div>
                        ))
                        : <div></div>
                }

            </ol>
        </nav >
    )
}
