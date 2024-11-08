'use client';

import Badge from '@app/features/Badge';
import AccordionButton from '@components/AccordionButton';
import type { Live } from '@libs/internalTypes';
import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';
import { type ReactNode, type PropsWithChildren, useState } from 'react';
import LiveBadge from './LiveBadge';

type ChildrenArgs = {
  visibleLives: Live[];
  isExpanded: boolean;
  toggle: () => void;
};

type Props = {
  lives: Live[];
  children: (args: ChildrenArgs) => ReactNode;
};

const LivesWrapper = ({ lives, children }: Props) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggle = () => {
    setIsExpanded((prev) => !prev);
  };

  const visibleLives = isExpanded ? lives : lives.slice(0, 3);

  return children({ visibleLives, isExpanded, toggle });
};

const ExpandButton = ({ isExpanded, toggle }: { isExpanded: boolean; toggle: () => void }) => {
  return (
    <div className="my-6 flex justify-center">
      <AccordionButton isExpanded={isExpanded} toggle={toggle} />
    </div>
  );
};

const LivesList = ({ children }: PropsWithChildren) => {
  return <div className={clsx('gap-x-live-x flex flex-wrap gap-y-7')}>{children}</div>;
};

type LiveProps = {
  live: Live;
};

const Live = ({ live }: LiveProps) => {
  return (
    <div className={clsx('w-live')}>
      <Link
        aria-label={`${live.viewers}명이 보고 있는 방송 보러가기, 제목 '${live.title}'`}
        href={`/lives/${live.id}`}
        className={clsx(
          'pb-live-aspect-ratio relative block overflow-hidden',
          'rounded-xl border-0 border-solid border-transparent',
        )}
      >
        <div className="absolute left-0 top-0 h-full w-full">
          <Image
            src={live.thumbnail}
            fill={true}
            sizes="100%"
            alt={`스트리머 ${live.streamer.name}가 스트리밍 중인 영상의 섬네일`}
          />
        </div>
        <LiveBadge viewers={live.viewers} />
      </Link>
      <div className={clsx('mt-3 grid grid-cols-[2.5rem,1fr] gap-2.5')}>
        <div className="relative h-10 w-full overflow-hidden rounded-full">
          <Image
            src={live.streamer.profileImage}
            fill={true}
            sizes="100%"
            alt={`스트리머 ${live.streamer.name}의 프로필 이미지`}
          />
        </div>
        <div className="w-full pr-5">
          <h3 className="text-content-neutral-primary funch-bold16">{live.title}</h3>
          <p className="funch-bold14 text-content-neutral-strong inline-flex items-center">{live.streamer.name}</p>
          <div className="mt-1.5 flex flex-wrap gap-1">
            <Badge>{live.category}</Badge>
            {live.tags.map((tag, index) => (
              <Badge key={index}>{tag}</Badge>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const Lives = Object.assign(LivesWrapper, {
  List: LivesList,
  Live,
  Expand: ExpandButton,
});

export default Lives;
