'use client';

import { useSyncExternalStore } from 'react';
import { createPortal } from 'react-dom';

/**
 * Renders children into document.body.
 *
 * Every overlay on this page lives inside a SectionReveal, which animates a
 * transform. A transformed ancestor becomes the containing block for
 * `position: fixed`, so a backdrop nested under one is positioned against that
 * section instead of the viewport. Portalling out of the tree removes the whole
 * class of problem rather than depending on when the transform happens to clear.
 */

// Whether we are on the client. Read through useSyncExternalStore rather than a
// mount flag in an effect: the value never changes, so there is nothing to
// subscribe to, and the server and client snapshots differ by design.
const neverChanges = () => () => {};
const onClient = () => true;
const onServer = () => false;

export function Portal({ children }) {
  const isClient = useSyncExternalStore(neverChanges, onClient, onServer);

  if (!isClient) return null;

  return createPortal(children, document.body);
}
