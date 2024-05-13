import Link from 'next/link';

export default function Navigation() {
  return (
    <nav>
      <ul className="flex gap-[20px]">
        <li>
          <Link className="link-text" href="#">
            Главная
          </Link>
        </li>
      </ul>
    </nav>
  );
}
