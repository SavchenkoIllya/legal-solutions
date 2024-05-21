import Table from "../components/table/table";
import TableHead from "../components/table/table-head";
import TableHeadContent from "../components/table/table-head-content";
import TableBody from "../components/table/table-body";

export default function Users() {
  return (
    <section className="min-h-[90dvh]">
      <Table>
        <TableHead>
          <TableHeadContent>Product name</TableHeadContent>
          <TableHeadContent>Product name</TableHeadContent>
          <TableHeadContent>Product name</TableHeadContent>
          <TableHeadContent>Product name</TableHeadContent>
        </TableHead>
        <TableBody>
          <tr className="last:border-none bg-white border-b dark:bg-gray-800 dark:border-gray-700">
            <th
              scope="row"
              className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
            >
              Apple MacBook Pro 17
            </th>
            <td className="px-6 py-4">Silver</td>
            <td className="px-6 py-4">Laptop</td>
            <td className="px-6 py-4">$2999</td>
          </tr>
          <tr className="last:border-none bg-white border-b dark:bg-gray-800 dark:border-gray-700">
            <th
              scope="row"
              className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
            >
              Apple MacBook Pro 17
            </th>
            <td className="px-6 py-4">Silver</td>
            <td className="px-6 py-4">Laptop</td>
            <td className="px-6 py-4">$2999</td>
          </tr>
        </TableBody>
      </Table>
    </section>
  );
}
