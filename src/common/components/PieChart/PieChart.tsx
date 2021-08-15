import clsx from 'clsx';
import React, { useEffect, useMemo, useRef, useState } from 'react';

import classes from './PieChart.module.css';

interface Props {
  className?: string;
  votes: number[];
}

export const PieChart: React.FC<Props> = ({ className, votes }) => {
  const ref = useRef<HTMLCanvasElement>(null);

  const voteCount = useMemo(() => votes.reduce((a, b) => a + b), [votes]);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const degToRad = (deg: number) => (deg * Math.PI) / 180;

    const colors = ['red', 'yellow', 'green', 'white', 'darkred', 'blue'];

    const w = canvas.width;
    const h = canvas.height;

    ctx.clearRect(0, 0, w, h);

    if (!voteCount) return;

    let angle = 0;

    for (let i = 0; i < votes.length; ++i) {
      ctx.fillStyle = colors[i];

      const percent = (votes[i] / voteCount) * 100;

      ctx.beginPath();
      ctx.moveTo(w / 2, h / 2);
      ctx.arc(
        w / 2,
        h / 2,
        w / 2,
        degToRad(angle * 3.6),
        degToRad((angle + percent) * 3.6)
      );
      ctx.lineTo(w / 2, h / 2);
      ctx.fill();

      angle += percent;
    }
  }, [votes, voteCount]);

  return (
    <div className={clsx(classes.container, className)}>
      <canvas
        className={classes.canvas}
        ref={ref}
        width='1000'
        height='1000'
      ></canvas>
    </div>
  );
};
