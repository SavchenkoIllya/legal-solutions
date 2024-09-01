import { cn } from '@/app/utils/cn';
import { useSearchParams } from 'next/navigation'

export default function LanguageButton({
  className,
  isOpened,
  ...props
}: React.ComponentPropsWithoutRef<'button'> & { isOpened: boolean }) {
  const searchParams = useSearchParams()
  const language = searchParams.get('lang') || "ru"

  return (
    <button
      {...props}
      id="mega-menu-dropdown-button"
      data-dropdown-toggle="mega-menu-dropdown"
      className={cn(
        'flex z-20 relative items-center transition-all descriptor-font gap-[10px] bg-gray rounded-[12px] text-dark py-[12px] px-[16px]  hover:bg-dark hover:text-light',
        className
      )}
    >
      {language}
      <svg
        className={cn(
          'w-[12px] h-[6px] transition-all duration-400',
          isOpened ? 'transform rotate-180' : ''
        )}
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
      >
        <path
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="m1 1 4 4 4-4"
        />
      </svg>
    </button>
  );
}
