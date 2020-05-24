import Link from 'next/link';

export default function Home() {
  return (
    <ul>
      <li>
        <Link href="/base/b">
          <a>a</a>
        </Link>
      </li>
      <li>
        <Link href="/base/a">
          <a>b</a>
        </Link>
      </li>
    </ul>
  );
}
