import profileImgLarge from 'assets/profile-large.jpg';
import profileImgPlaceholder from 'assets/profile-placeholder.jpg';
import profileImg from 'assets/profile.jpg';
import { Button } from 'components/Button';
import { DecoderText } from 'components/DecoderText';
import { Divider } from 'components/Divider';
import { Heading } from 'components/Heading';
import { Image } from 'components/Image';
import { Section } from 'components/Section';
import { Text } from 'components/Text';
import { Transition } from 'components/Transition';
import { Fragment, useState } from 'react';
import { media } from 'utils/style';
import styles from './Profile.module.css';
import { profile, skills } from 'contents/home';

const ProfileText = ({ visible, titleId }) => (
  <Fragment>
    {
      skills.map((skillSet, index) =>
        <div key={index}>
          <Heading className={styles.title} data-visible={visible} level={5} id={titleId}>
            <DecoderText text={skillSet.heading} start={visible} />
          </Heading>
          <Text key={index} className={styles.description} data-visible={visible} size="l" as="p">
            {skillSet.desc}
          </Text>
        </div>
      )
    }
  </Fragment>
);

export const Skill = ({ id, visible, sectionRef }) => {
  const [focused, setFocused] = useState(false);
  const titleId = `${id}-title`;

  return (
    <Section
      className={styles.profile}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      as="section"
      id={id}
      ref={sectionRef}
      aria-labelledby={titleId}
      tabIndex={-1}
    >
      <Transition in={visible || focused} timeout={0}>
        {visible => (
          <div className={styles.content}>
            <div className={styles.column}>
              <div className={styles.tag} aria-hidden>
                <Divider
                  notchWidth="64px"
                  notchHeight="8px"
                  collapsed={!visible}
                  collapseDelay={1000}
                />
                <div className={styles.tagText} data-visible={visible}>
                  Professional
                </div>
              </div>
              <Image
                reveal
                delay={100}
                placeholder={profileImgPlaceholder}
                srcSet={[profileImg, profileImgLarge]}
                sizes={`(max-width: ${media.mobile}px) 100vw, 480px`}
                alt={profile.imageAlt}
              />
            </div>
            <div className={styles.column}>
              <Heading className={styles.title} data-visible={visible} level={3} id={titleId}>
                <DecoderText text='Skills & Interests' start={visible} />
              </Heading>
              <ProfileText visible={visible} titleId={titleId} />
            </div>
          </div>
        )}
      </Transition>
    </Section>
  );
};
