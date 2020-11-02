import * as React from 'react';
import {getSrc, getSrcSet} from './utils';
import * as styles from './Photo.module.scss';

//Tomlong: for customMedia, must use require instead of import here
const {customMedia} = require('./global.module.scss');

console.log('styles', styles);
console.log(customMedia['--photo-breakpoint']);
const photoBreakpoint = customMedia['--photo-breakpoint'];
export interface PhotoProps {
  publicId: any;
  alt: any;
  rounded: any;
  borderRadius: any;
  newImageSrc: string;
}

const Photo = ({
  publicId,
  alt,
  rounded,
  borderRadius,
  newImageSrc,
}: PhotoProps) => {
  //   test();
  return (
    <div className={styles.photoDiv}>
      <figure>
        <img
          className={rounded ? styles.roundedPhoto : styles.photo}
          style={
            typeof borderRadius !== 'undefined'
              ? {
                  ['--border-radius']: borderRadius,
                  // borderRadius: borderRadius,
                } as React.CSSProperties
              : (null as unknown) as React.CSSProperties
          }
          src={getSrc({
            publicId,
            width: 200,
          })}
          srcSet={getSrcSet({
            publicId,
            widths: [200, 400, 800],
          })}
          sizes={`${photoBreakpoint} 400px, 200px`}
          // sizes="(min-width: 30rem) 400px, 200px"
        />{' '}
        <figcaption className={styles.caption}> {alt} </figcaption>
        <span>
          {'Here is your cusotoms media data:' +
            photoBreakpoint +
            'Here is your styles data:' +
            styles['photo-div']}
        </span>
        <img
          className={rounded ? styles.roundedPhoto : styles.photo}
          style={
            typeof borderRadius !== 'undefined'
              ? {
                  ['--border-radius']: borderRadius,
                  // borderRadius: borderRadius,
                } as React.CSSProperties
              : (null as unknown) as React.CSSProperties
          }
          src={newImageSrc}
          sizes={`${photoBreakpoint} 400px, 200px`}
          // sizes="(min-width: 30rem) 400px, 200px"
        />
        {' My new Image is here'}
      </figure>
    </div>
  );
};

Photo.defaultProps = {
  rounded: false,
  borderRadius: 1,
};

export default Photo;
