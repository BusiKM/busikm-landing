import { Fragment } from 'react';

import { Rozdzielacz } from '@/components/ui/Rozdzielacz';

/**
 * Pasek okna przeglądarki nad makietą – powtarza się w kilku ekranach.
 * `label` jako tablica rysuje części rozdzielone cienką kreską.
 */
export function Chrome({
  label,
  dark = false,
}: {
  label: string | readonly string[];
  dark?: boolean;
}) {
  const czesci = typeof label === 'string' ? [label] : label;
  return (
    <div
      className={`flex h-8 flex-none items-center gap-1.5 px-3 lg:h-11 lg:gap-1.5 lg:px-[18px] ${
        dark
          ? 'border-b border-line-dark'
          : 'border-b border-line bg-paper'
      }`}
    >
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className={`size-2 rounded-full lg:size-2.5 ${dark ? 'bg-[#2E2E34]' : 'bg-line'} ${
            i === 2 ? 'hidden lg:block' : ''
          }`}
        />
      ))}
      <span
        className={`ml-2 inline-flex min-w-0 items-center text-[11px] lg:ml-4 lg:text-[12px] ${dark ? 'text-ink-muted' : 'text-muted'}`}
      >
        {czesci.map((czesc, i) => (
          <Fragment key={czesc}>
            {i > 0 && <Rozdzielacz className="mx-2" />}
            <span className="truncate">{czesc}</span>
          </Fragment>
        ))}
      </span>
    </div>
  );
}
