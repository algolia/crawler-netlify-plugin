import * as React from 'preact';
import type { VNode } from '@algolia/autocomplete-js';
import { AlgoliaRecord, HighlightedHierarchy } from './types';

export const templates = {
  poweredBy: ({ hostname }: { hostname: string }): VNode => {
    const escapedHostname = encodeURIComponent(hostname);
    return (
      <div className="aa-powered-by">
        Search by
        <a
          href={`https://www.algolia.com/?utm_source=netlify&utm_medium=link&utm_campaign=autocomplete-${escapedHostname}`}
          className="aa-powered-by-link"
        >
          Algolia
        </a>
      </div>
    );
  },

  item: (
    record: AlgoliaRecord,
    title: Array<string | VNode>,
    description: Array<string | VNode>,
    hierarchy: HighlightedHierarchy | null
  ): VNode => {
    return (
      <a href={record.url}>
        <div className="aa-ItemContent">
          <div className="aa-ItemIcon">
            <svg width="20" height="20" viewBox="0 0 20 20">
              <path
                d="M17 6v12c0 .52-.2 1-1 1H4c-.7 0-1-.33-1-1V2c0-.55.42-1 1-1h8l5 5zM14 8h-3.13c-.51 0-.87-.34-.87-.87V4"
                stroke="currentColor"
                fill="none"
                fillRule="evenodd"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <div>
            <div className="aa-ItemTitle">{hierarchy?.lvl0 ?? title}</div>
            {hierarchy ? (
              <div className="aa-ItemHierarchy">
                {hierarchyToBreadcrumbVNodes(hierarchy)}
              </div>
            ) : (
              ''
            )}
            {description ? (
              <div className="aa-ItemDescription">{description}</div>
            ) : (
              ''
            )}
          </div>
        </div>
      </a>
    );
  },
};

/**
 * Transform a highlighted hierarchy object into an array of VNode[].
 * 3 levels max are returned.
 *
 * @param {Hierarchy} hierarchy An highlighted hierarchy, i.e. { lvl0: (string | VNode)[], lvl1: (string | VNode)[], lvl2: (string | VNode)[], ... }
 * @returns {Array<string | Array<string | VNode>>} An array of VNode[], representing of the highlighted hierarchy starting from lvl1.
 *                                                  Between each VNode[] we insert a ' > ' character to render them as breadcrumbs eventually.
 */
function hierarchyToBreadcrumbVNodes(
  hierarchy: HighlightedHierarchy
): Array<string | Array<string | VNode>> {
  const breadcrumbVNodeArray: Array<string | Array<string | VNode>> = [];
  let addedLevels = 0;
  for (let i = 1; i < 7 && addedLevels < 3; ++i) {
    if (hierarchy[`lvl${i}`] && hierarchy[`lvl${i}`].length > 0) {
      if (addedLevels > 0) {
        breadcrumbVNodeArray.push(' > ');
      }
      breadcrumbVNodeArray.push(hierarchy[`lvl${i}`]);
      ++addedLevels;
    }
  }
  return breadcrumbVNodeArray;
}