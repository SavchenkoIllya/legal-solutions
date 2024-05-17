export default function TableHead({ children }) {
    return (
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                {children}
            </tr>
        </thead>
    )
}