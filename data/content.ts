import type { SiteContent } from './types';
import { hardcodedContent } from './adapters/hardcoded';

const adapter: SiteContent = hardcodedContent;

export function getSiteContent(): SiteContent {
  return adapter;
}
