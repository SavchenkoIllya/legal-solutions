import { cn } from '@/utils/cn';
import { forwardRef } from 'react';
import { Transition } from '@headlessui/react';

type PopupProps = React.ComponentPropsWithRef<'div'> & { isOpened: boolean };

export const LanguagePopup = forwardRef<HTMLDivElement, PopupProps>(
  (props, ref) => {
    const { isOpened, ...restProps } = props;
    return (
      <Transition
        show={isOpened}
        enter="transition-opacity duration-500"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity duration-500"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <div
          id="mega-menu-dropdown"
          className={cn(
            'absolute z-10 -mt-4 text-sm text-center bg-gray rounded-lg shadow-md w-[68px] opacity-0 open:opacity-100 open:transition-opacity open:duration-500'
          )}
          ref={ref}
          {...restProps}
        >
          <div className="p-4 pt-6 pb-0 text-gray-900 md:pb-4">
            <ul
              className="space-y-4"
              aria-labelledby="mega-menu-dropdown-button"
            >
              <li>
                <a
                  href="#"
                  className="bold-transition descriptor-font text-gray-500  hover:text-blue-600 dark:hover:text-blue-500"
                >
                  en
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-500  hover:text-blue-600 dark:hover:text-blue-500"
                >
                  ru
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-500 hover:text-blue-600 dark:hover:text-blue-500"
                >
                  pl
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-500 hover:text-blue-600 dark:hover:text-blue-500"
                >
                  ua
                </a>
              </li>
            </ul>
          </div>
        </div>
      </Transition>
    );
  }
);
