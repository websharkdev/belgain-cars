'use client';

import * as React from 'react';

const DRAG_THRESHOLD_PX = 4;

function useDragScroll() {
  const [isDragging, setIsDragging] = React.useState(false);

  const attach = React.useCallback((element: HTMLElement | null) => {
    if (!element) {
      return undefined;
    }

    const state = {
      pointerId: -1,
      startX: 0,
      scrollLeft: 0,
      moved: false,
    };

    const endDrag = (pointerId: number) => {
      if (state.pointerId !== pointerId) {
        return;
      }

      const moved = state.moved;
      state.pointerId = -1;
      state.moved = false;
      setIsDragging(false);

      try {
        element.releasePointerCapture(pointerId);
      } catch {
        // Pointer capture may already be released.
      }

      if (moved) {
        const preventClick = (event: MouseEvent) => {
          event.preventDefault();
          event.stopImmediatePropagation();
        };

        element.addEventListener('click', preventClick, {
          capture: true,
          once: true,
        });
      }
    };

    const onPointerDown = (event: PointerEvent) => {
      if (event.button !== 0) {
        return;
      }

      state.pointerId = event.pointerId;
      state.startX = event.pageX;
      state.scrollLeft = element.scrollLeft;
      state.moved = false;
    };

    const onPointerMove = (event: PointerEvent) => {
      if (state.pointerId !== event.pointerId) {
        return;
      }

      const deltaX = event.pageX - state.startX;

      if (!state.moved && Math.abs(deltaX) < DRAG_THRESHOLD_PX) {
        return;
      }

      if (!state.moved) {
        state.moved = true;
        setIsDragging(true);
        element.setPointerCapture(event.pointerId);
      }

      event.preventDefault();
      element.scrollLeft = state.scrollLeft - deltaX;
    };

    const onPointerUp = (event: PointerEvent) => {
      endDrag(event.pointerId);
    };

    const onPointerCancel = (event: PointerEvent) => {
      endDrag(event.pointerId);
    };

    element.addEventListener('pointerdown', onPointerDown);
    element.addEventListener('pointermove', onPointerMove);
    element.addEventListener('pointerup', onPointerUp);
    element.addEventListener('pointercancel', onPointerCancel);

    return () => {
      element.removeEventListener('pointerdown', onPointerDown);
      element.removeEventListener('pointermove', onPointerMove);
      element.removeEventListener('pointerup', onPointerUp);
      element.removeEventListener('pointercancel', onPointerCancel);
    };
  }, []);

  return { attach, isDragging };
}

export { useDragScroll };
