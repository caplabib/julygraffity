/**
 * Svelte Action to enable click-and-drag horizontal scrolling on containers
 * while preventing accidental clicks on child elements when dragging.
 */
export function dragScroll(node) {
  let isDown = false;
  let startX = 0;
  let scrollLeft = 0;
  let hasDragged = false;

  function onMouseDown(e) {
    // Only drag on primary mouse button (left click)
    if (e.button !== 0) return;
    isDown = true;
    hasDragged = false;
    startX = e.pageX - node.offsetLeft;
    scrollLeft = node.scrollLeft;
    node.style.cursor = 'grabbing';
    node.style.userSelect = 'none';
  }

  function onMouseMove(e) {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - node.offsetLeft;
    const walk = (x - startX) * 1.5; // Scroll speed factor
    if (Math.abs(x - startX) > 5) {
      hasDragged = true;
    }
    node.scrollLeft = scrollLeft - walk;
  }

  function onMouseUp() {
    if (!isDown) return;
    isDown = false;
    node.style.cursor = '';
    node.style.removeProperty('user-select');
  }

  function onClickCapture(e) {
    if (hasDragged) {
      e.stopPropagation();
      e.preventDefault();
      hasDragged = false;
    }
  }

  function onWheel(e) {
    if (e.deltaY !== 0) {
      e.preventDefault();
      node.scrollLeft += e.deltaY;
    }
  }

  node.addEventListener('mousedown', onMouseDown);
  window.addEventListener('mousemove', onMouseMove);
  window.addEventListener('mouseup', onMouseUp);
  node.addEventListener('click', onClickCapture, true);
  node.addEventListener('wheel', onWheel, { passive: false });

  return {
    destroy() {
      node.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      node.removeEventListener('click', onClickCapture, true);
      node.removeEventListener('wheel', onWheel);
    }
  };
}
