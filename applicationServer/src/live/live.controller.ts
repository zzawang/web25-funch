import { Controller, Get, Param, Query } from '@nestjs/common';
import { LiveService } from '@live/live.service';
import { SUGGEST_LIVE_COUNT } from '@src/constants';

@Controller('live')
export class LiveController {
  constructor(private readonly liveService: LiveService) {}

  @Get(':broadcastId')
  getPlaylistUrl(@Param('broadcastId') broadcastId: string) {
    return this.liveService.responsePlaylistUrl(broadcastId);
  }

  @Get('/list/suggest')
  getSuggestLiveList() {
    return { suggest: this.liveService.getCurrentLiveListRandomShuffle(SUGGEST_LIVE_COUNT) };
  }
}