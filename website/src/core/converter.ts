import { FULL_EN_TO_TH, FULL_TH_TO_EN } from './kedmanee-map';
import { FULL_EN_TO_TH_PATTACHOTE, FULL_TH_TO_EN_PATTACHOTE } from './pattachote-map';

export type Layout = 'kedmanee' | 'pattachote';
export type Direction = 'EN→TH' | 'TH→EN';

function getMap(layout: Layout, direction: Direction): Record<string, string> {
  if (layout === 'kedmanee') {
    return direction === 'EN→TH' ? FULL_EN_TO_TH : FULL_TH_TO_EN;
  }
  return direction === 'EN→TH' ? FULL_EN_TO_TH_PATTACHOTE : FULL_TH_TO_EN_PATTACHOTE;
}

export function convert(text: string, layout: Layout, direction: Direction): string {
  const map = getMap(layout, direction);
  return text
    .split('')
    .map((char) => map[char] ?? char)
    .join('');
}

export function convertENtoTH(text: string, layout: Layout = 'kedmanee'): string {
  return convert(text, layout, 'EN→TH');
}

export function convertTHtoEN(text: string, layout: Layout = 'kedmanee'): string {
  return convert(text, layout, 'TH→EN');
}
