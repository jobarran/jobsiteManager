import Link from "next/link";

const AdminPage = () => {
  return (
    <div>
      <h1>Admin page</h1>

      <Link
        href="/admin/new-user"
      >
        <button className=" flex items-center justify-center w-full px-4 py-2 text-sm font-medium text-gray-900 border border-gray-300 rounded-lg md:w-auto hover:bg-gray-100 hover:text-primary-700s" type="button">
          <svg className="h-3.5 w-3.5 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <path clipRule="evenodd" fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" />
          </svg>
          Add User
        </button>
      </Link>

    </div>
  );
}

export default AdminPage;