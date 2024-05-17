import Table from "../components/table/table.tsx"
import TableHead from "../components/table/table-head.tsx"
import TableHeadContent from "../components/table/table-head-content.tsx"
import TableBody from "../components/table/table-body.tsx"

export default function Users() {
    return (<section>
        <Table>
            <TableHead>
                <TableHeadContent>
                    Product name
                </TableHeadContent>
                <TableHeadContent>
                    Product name
                </TableHeadContent>
                <TableHeadContent>
                    Product name
                </TableHeadContent>
                <TableHeadContent>
                    Product name
                </TableHeadContent>
            </TableHead>
            <TableBody>
                <tr class="last:border-none bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                    <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        Apple MacBook Pro 17"
                    </th>
                    <td class="px-6 py-4">
                        Silver
                    </td>
                    <td class="px-6 py-4">
                        Laptop
                    </td>
                    <td class="px-6 py-4">
                        $2999
                    </td>
                </tr>
                <tr class="last:border-none bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                    <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        Apple MacBook Pro 17"
                    </th>
                    <td class="px-6 py-4">
                        Silver
                    </td>
                    <td class="px-6 py-4">
                        Laptop
                    </td>
                    <td class="px-6 py-4">
                        $2999
                    </td>
                </tr>
            </TableBody>
        </Table>
    </section>)
}