export default function Table({ children }) {
    return (
        <div class="relative overflow-x-auto">
            <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                {children}
            </table>
        </div>
    )
}