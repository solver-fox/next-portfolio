import { forwardRef, useId } from 'react';
import { classes } from 'utils/style';
import styles from './Monogram.module.css';

export const Monogram = forwardRef(({ highlight, className, ...props }, ref) => {
  const id = useId();
  const clipId = `${id}monogram-clip`;

  return (
    <svg
      aria-hidden
      className={classes(styles.monogram, className)}
      width="64"
      height="64"
      viewBox="0 0 64 64"
      ref={ref}
      {...props}
    >
      <defs>
        <clipPath id={clipId}>
          <path d="m51.176 42.817-.687-.824q-3.342 2.793-7.371 4.349-4.12 1.602-7.554 1.602h-.87V15.348q5.128 2.426 9.569 3.205l5.86-5.585h-.275q-6.684 0-13.46-3.434L23.752 20.292v13.872q0 2.839-.275 3.708-.504 1.786-2.198 2.93-3.525-5.265-3.525-10.942 0-4.899 1.969-8.424 2.014-3.617 6.959-7.737l-.504-.733Q19.723 16.355 16.152 21.757 12.581 27.205 12.581 33.661q0 8.836 5.631 14.788 5.677 5.906 14.055 5.906 11.537 0 18.908-11.537zM30.07 17.5 33.321 14.615V47.808q-6.73-.687-11.171-5.769l2.61-2.198q1.602-1.328 2.61-2.426 1.053-1.145 1.557-2.014.366-.641.595-1.282.229-.641.32-1.282.092-.641.137-1.969.092-1.328.092-3.388z" />
        </clipPath>
      </defs>
      <rect clipPath={`url(#${clipId})`} width="100%" height="100%" />
      {highlight && (
        <g clipPath={`url(#${clipId})`}>
          <rect className={styles.highlight} width="100%" height="100%" />
        </g>
      )}
    </svg>
  );
});
