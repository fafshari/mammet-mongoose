import Image from "next/image";
import Link from "next/link";

const NavBar = () => {
    return (
        <nav className="bg-slate-900 border-gray-200 px-2 sm:px-4 py-2.5">
  <div className="container flex flex-wrap items-center justify-between mx-auto">
    
    <Link className="flex items-center" href="/" passHref>
        <>
            <Image
            id="title"
            width="32" height="32"
            className="block w-16 h-6 h-16 mr-3 border-0 rounded-full border-slate-700 sm:h-9"
            src="https://media.discordapp.net/attachments/640978235382956064/1018682382498418728/unknown.png?width=321&height=173"
            alt="mammet logo"
            />
            <span className="self-center text-xl font-semibold whitespace-nowrap ">Mammet</span>
        </>
    </Link>
    <button data-collapse-toggle="navbar-default" type="button" className="inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-default" aria-expanded="false">
      <span className="sr-only">Open main menu</span>
      <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"></path></svg>
    </button>
    <div className="hidden w-full md:block md:w-auto" id="navbar-default">
      <ul className="flex flex-col p-4 mt-4 border border-gray-900 rounded-lg md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 dark:bg-gray-800 dark:border-gray-700">
        <li>
            <Link href="/" className="block py-2 pl-3 pr-4 bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0">Home</Link>
        </li>
        <li>
          <Link href="/animals" className="block py-2 pl-3 pr-4 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Animals</Link>
        </li>
        <li>
          <Link href="/items" className="block py-2 pl-3 pr-4 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Items</Link>
        </li>
        <li>
          <Link href="/products" className="block py-2 pl-3 pr-4 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Products</Link>
        </li>
        <li>
          <Link href="/workshop" className="block py-2 pl-3 pr-4 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Workshop</Link>
        </li>
      </ul>
    </div>
  </div>
</nav>
    )
}

export default NavBar;