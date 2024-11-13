'use client';

import ChatFoldSvg from '@components/svgs/ChatFoldSvg';
import DottedSvg from '@components/svgs/DottedSvg';
import Button from '@components/Button';
import Live from './Live';
import useLiveContext from '@hooks/useLiveContext';
import NoLiveContent from './NoLiveContent';
import clsx from 'clsx';

const LiveSection = () => {
  const { isLivePage, liveId } = useLiveContext();
  // ** lives 페이지라면 [id]에 해당하는 스트리밍 중인 방송이 있는지 확인하여
  // 없으면 NoLiveContent를 보여주고,(liveId를 null로)
  // 있으면 확장된 Live 섹션을 보여준다.(liveId를 id로)
  // ** lives 페이지가 아니라면,
  // liveId가 존재하는 경우 앱 pip 모드로 전환하여 방송을 계속 보여주고,
  // liveId가 존재하지 않는 경우 아무것도 보여주지 않는다.

  // 1. isLivePage 확인

  // if livePage === true
  // 2.1 [id] 확인
  // 2.2 [id]에 해당하는 방송이 있는지 확인

  // if isStreaming === true
  // 3.1 Live 컴포넌트 렌더링 (확장된 Live 섹션)
  // 3.2 liveId를 [id]로 설정

  // if isStreaming === false
  // 3.1 NoLiveContent 렌더링
  // 3.2 liveId를 null로 설정

  // if livePage === false
  // 2.1 liveId 확인

  // if liveId !== null
  // 3.1 pip 모드로 전환
  // 3.2 방송 계속 보여주기

  // if liveId === null
  // 3.1 아무것도 보여주지 않기

  if (!isLivePage && liveId === null) return null;

  if (isLivePage && liveId === null) return <NoLiveContent />;

  return (
    <section
      className={clsx(isLivePage ? 'h-live-section relative w-full' : 'h-live-pip w-live-pip fixed bottom-20 right-20')}
    >
      {/*
        !isLivePage && liveId === null -> null

        나머지 = children?
      */}
      <Live>
        {({
          videoRef,
          videoWrapperRef,
          isShowControls,
          isPip,
          isPlay,
          toggleMute,
          playToggle,
          pipToggle,
          isFullscreen,
          toggleFullscreen,
          volume,
          handleChangeVolume,
          handleMouseLeaveFromVideoWrapper,
          handleMouseMoveOnVideoWrapper,
        }) => (
          <div className={clsx('h-full w-full', isLivePage ? 'grid grid-cols-[1fr,22rem]' : 'block')}>
            <div className="funch-scrollable bg-bg-weak w-full">
              <Live.VideoWrapper
                ref={videoWrapperRef}
                isShowControls={isShowControls}
                handleMouseMove={handleMouseMoveOnVideoWrapper}
                handleMouseLeave={handleMouseLeaveFromVideoWrapper}
              >
                <Live.Video ref={videoRef} />
                {isShowControls && (
                  <Live.VideoControllersWrapper>
                    <div>
                      <Live.Play isFullscreen={isFullscreen} playToggle={playToggle} isPlay={isPlay} />
                      <Live.Mute toggleMute={toggleMute} />
                      <Live.Volume volume={volume} handleChangeVolume={handleChangeVolume} />
                    </div>
                    <div>
                      <Live.Pip pipToggle={pipToggle} isFullscreen={isFullscreen} isPip={isPip} />
                      <Live.Fullscreen isFullscreen={isFullscreen} toggleFullscreen={toggleFullscreen} />
                    </div>
                  </Live.VideoControllersWrapper>
                )}
              </Live.VideoWrapper>
              {isLivePage && <Live.Info />}
            </div>
            {isLivePage && (
              <aside
                className={clsx('flex h-full w-[22rem] flex-col', 'border-border-neutral-weak border-x border-solid')}
              >
                <div
                  className={clsx(
                    'flex h-11 w-full items-center justify-between border-y',
                    'border-border-neutral-weak',
                  )}
                >
                  <ChatFoldSvg />
                  <strong className={clsx('text-content-neutral-strong')}>채팅</strong>
                  <DottedSvg />
                </div>
                <div className="flex flex-1 flex-col"></div>
                <div className="flex h-[82px] flex-col px-[10px]">
                  <div className="h-10 w-full">
                    <input
                      className={clsx(
                        'h-full w-full resize-none rounded-md border-none px-2 py-2',
                        'bg-surface-neutral-weak',
                      )}
                      placeholder="채팅을 입력해주세요"
                    />
                  </div>
                  <div className="flex justify-end py-1">
                    <Button>채팅</Button>
                  </div>
                </div>
              </aside>
            )}
          </div>
        )}
      </Live>
    </section>
  );
};

export default LiveSection;
