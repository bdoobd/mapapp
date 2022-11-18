export function getOffset(map) {
  ß;
  const offset = map.getSize().y * 0.15;

  map.panBy([0, -offset], { animation: false });
}
