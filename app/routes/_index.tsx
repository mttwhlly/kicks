import { Suspense } from 'react';
import Search from '~/components/Search/Search';

export default function Index() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <Search />
    </Suspense>
  );
}
