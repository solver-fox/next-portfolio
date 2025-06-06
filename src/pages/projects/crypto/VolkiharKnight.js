import volkiharBackgroundLarge from 'assets/crypto/1.jpg';
import volkiharBackgroundPlaceholder from 'assets/crypto/1.jpg';
import volkiharBackground from 'assets/crypto/1.jpg';
import volkiharEnderalLarge from 'assets/crypto/2.jpg';
import volkiharEnderalPlaceholder from 'assets/crypto/2.jpg';
import volkiharEnderal from 'assets/crypto/2.jpg';
import volkiharProblemLarge from 'assets/crypto/3.jpg';
import volkiharProblemPlaceholder from 'assets/crypto/3.jpg';
import volkiharProblem from 'assets/crypto/3.jpg';
import solutionLarge from 'assets/crypto/4.jpg';
import solutionPlaceholder from 'assets/crypto/4.jpg';
import solution from 'assets/crypto/4.jpg';
import { Button } from 'components/Button';
import { Footer } from 'components/Footer';
import { Image } from 'components/Image';
import { Meta } from 'components/Meta';
import {
  ProjectBackground,
  ProjectContainer,
  ProjectHeader,
  ProjectSection,
  ProjectSectionColumns,
  ProjectSectionContent,
  ProjectSectionHeading,
  ProjectSectionText,
  ProjectTextRow,
} from 'layouts/Project';
import dynamic from 'next/dynamic';
import { Fragment } from 'react';
import { media } from 'utils/style';
import styles from './VolkiharKnight.module.css';
import { crypto } from 'contents/project';

// const Armor = dynamic(() => import('./Armor').then(mod => mod.Armor));

export function VolkiharKnight() {
  return (
    <Fragment>
      <Meta title={crypto.title} prefix="Projects" description={crypto.description} />
      <style
        dangerouslySetInnerHTML={{
          __html: `
            [data-theme='dark'] {
              --rgbPrimary: 240 211 150;
              --rgbAccent: 240 211 150;
            }
            [data-theme='light'] {
              --rgbPrimary: 134 99 23;
              --rgbAccent: 134 99 23;
            }
          `,
        }}
      />
      <ProjectContainer>
        <ProjectBackground
          srcSet={[volkiharBackground, volkiharBackgroundLarge]}
          placeholder={volkiharBackgroundPlaceholder}
          opacity={0.5}
        />
        <ProjectHeader
          title={crypto.title}
          description={crypto.description}
          roles={crypto.roles}
        />

        <ProjectSection>
          <ProjectSectionColumns>
            <div className={styles.textSection}>
              <ProjectSectionHeading>
                {Object.keys(crypto.detail)[0]}
              </ProjectSectionHeading>
              <ProjectSectionText>{Object.values(crypto.detail)[0]}</ProjectSectionText>
            </div>
          </ProjectSectionColumns>
        </ProjectSection>

        <ProjectSection
          backgroundElement={
            <Image
              srcSet={[volkiharProblem, volkiharProblemLarge]}
              placeholder={volkiharProblemPlaceholder}
              alt="A promotional image from Enderal showing several characters in the game overlooking a distant city."
              sizes={`100vw`}
            />
          }
        >
          <ProjectSectionColumns>
            <div className={styles.armor}>
              {/* <Armor alt="3D model of the Volkihar Knight armor" /> */}
            </div>
            <div className={styles.textSection}>
              <ProjectSectionHeading>
                {Object.keys(crypto.detail)[1]}
              </ProjectSectionHeading>
              <ProjectSectionText>{Object.values(crypto.detail)[1]}</ProjectSectionText>
            </div>
          </ProjectSectionColumns>
        </ProjectSection>

        <ProjectSection
          backgroundElement={
            <Image
              srcSet={[volkiharEnderal, volkiharEnderalLarge]}
              placeholder={volkiharEnderalPlaceholder}
              alt="A promotional image from Enderal showing several characters in the game overlooking a distant city."
              sizes={`100vw`}
            />
          }
        >
          <ProjectSectionContent>
            <ProjectTextRow center centerMobile noMargin>
              <ProjectSectionHeading>
                {Object.keys(crypto.detail)[2]}
              </ProjectSectionHeading>
              <ProjectSectionText>{Object.values(crypto.detail)[2]}</ProjectSectionText>
            </ProjectTextRow>
          </ProjectSectionContent>
        </ProjectSection>

        <ProjectSection
          backgroundElement={
            <Image
              srcSet={[solution, solutionLarge]}
              placeholder={solutionPlaceholder}
              alt="A promotional image from Enderal showing several characters in the game overlooking a distant city."
              sizes={`100vw`}
            />
          }
        >
          <ProjectSectionContent>
            <ProjectTextRow>
              <ProjectSectionHeading>
                {Object.keys(crypto.detail)[3]}
              </ProjectSectionHeading>
              <ProjectSectionText>{Object.values(crypto.detail)[3]}</ProjectSectionText>
            </ProjectTextRow>
          </ProjectSectionContent>
        </ProjectSection>
      </ProjectContainer>
      <Footer />
    </Fragment>
  );
}
