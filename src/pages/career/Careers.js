import Barcode from 'assets/barcode.svg';
import { DecoderText } from 'components/DecoderText';
import { Divider } from 'components/Divider';
import { Footer } from 'components/Footer';
import { Heading } from 'components/Heading';
import { Image } from 'components/Image';
import { Meta } from 'components/Meta';
import { Section } from 'components/Section';
import { Text } from 'components/Text';
import { useReducedMotion } from 'framer-motion';
import { useWindowSize } from 'hooks';
import { useState, useEffect } from 'react';
import { formatDate } from 'utils/date';
import { cssProps } from 'utils/style';
import styles from './Articles.module.css';
import { careers } from 'contents/career';

const ArticlesPost = ({
  title,
  abstract,
  date,
  featured,
  banner,
  index,
  setFeatured = () => { }
}) => {
  const [hovered, setHovered] = useState(false);
  const [dateTime, setDateTime] = useState(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    setDateTime(formatDate(date));
  }, [date, dateTime]);

  const handleMouseEnter = () => {
    setHovered(true);
  };

  const handleMouseLeave = () => {
    setHovered(false);
  };

  return (
    <article
      className={styles.post}
      data-featured={!!featured}
      style={index !== undefined ? cssProps({ delay: index * 100 + 200 }) : undefined}
    >
      {featured && (
        <Text className={styles.postLabel} size="s">
          Latest
        </Text>
      )}
      {featured && !!banner && (
        <div className={styles.postImage}>
          <Image
            noPauseButton
            play={!reduceMotion ? hovered : undefined}
            src={{ src: banner }}
            placeholder={{ src: `${banner.split('.')[0]}-placeholder.jpg` }}
            alt=""
            role="presentation"
          />
        </div>
      )}
      <a
        className={styles.postLink}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onMouseDown={()=>setFeatured(Object.keys(careers)[index])}
      >
        <div className={styles.postDetails}>
          <div aria-hidden className={styles.postDate}>
            <Divider notchWidth="64px" notchHeight="8px" />
            {dateTime}
          </div>
          <Heading as="h2" level={featured ? 2 : 4}>
            {title}
          </Heading>
          <Text size={featured ? 'l' : 's'} as="p">
            {abstract}
          </Text>
        </div>
      </a>
    </article>
  );
};
export const Careers = () => {
  const { width } = useWindowSize();
  const singleColumnWidth = 1190;
  const isSingleColumn = width <= singleColumnWidth;
  const [featured, setFeatured] = useState(Object.keys(careers)[0]);

  const postsHeader = (
    <header className={styles.header}>
      <Heading className={styles.heading} level={5} as="h1">
        <DecoderText text="Charles's career" />
      </Heading>
      <Barcode />
    </header>
  );

  const postList = (
    <div className={styles.list}>
      {!isSingleColumn && postsHeader}
      {Object.keys(careers).map((key, index) => (
        <ArticlesPost key={key} index={index} {...careers[key]} setFeatured={setFeatured} />
      ))}
    </div>
  );

  const featuredPost = <ArticlesPost key={featured} {...careers[featured]} featured />;

  return (
    <article className={styles.articles}>
      <Meta
        title="Articles"
        description="A collection of careers includeing worked companies and graduated schools."
      />
      <Section className={styles.content}>
        {!isSingleColumn && (
          <div className={styles.grid}>
            {postList}
            {featuredPost}
          </div>
        )}
        {isSingleColumn && (
          <div className={styles.grid}>
            {postsHeader}
            {featuredPost}
            {postList}
          </div>
        )}
      </Section>
      <Footer />
    </article>
  );
};
