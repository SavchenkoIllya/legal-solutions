'use client';
import React, { useState, useRef, useEffect } from 'react';
import LanguageButton from './language/button';
import { LanguagePopup } from './language/popup';

export default function Language(props: React.ComponentPropsWithoutRef<"div">) {
  const [isOpened, setOpened] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (isOpened && !dropdownRef.current?.contains(e.target as Node)) {
        setOpened(false);
      }
    };

    document.addEventListener('click', handleOutsideClick);

    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, [isOpened]);

  const handleClick = () => {
    setOpened((prev) => !prev);
  };

  return (
    <div {...props}>
      <LanguageButton isOpened={isOpened} onClick={handleClick} />
      <LanguagePopup ref={dropdownRef} isOpened={isOpened} />
    </div>
  );
}
