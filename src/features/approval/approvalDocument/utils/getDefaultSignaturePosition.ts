export const getDefaultSignaturePosition = (index: number, total: number) => {
  const baseY = 100;
  const sigWidth = 200;
  const gap = 40;

  if (total <= 3) {
    const totalWidth = total * sigWidth + (total - 1) * gap;
    const pageWidth = 794;
    const startX = (pageWidth - totalWidth) / 2;

    return {
      x: startX + index * (sigWidth + gap),
      y: baseY,
    };
  }

  const perRow = 3;
  const row = Math.floor(index / perRow);
  const col = index % perRow;

  const totalWidth = perRow * sigWidth + (perRow - 1) * gap;
  const pageWidth = 794;
  const startX = (pageWidth - totalWidth) / 2;

  return {
    x: startX + col * (sigWidth + gap),
    y: baseY + row * 120,
  };
};
