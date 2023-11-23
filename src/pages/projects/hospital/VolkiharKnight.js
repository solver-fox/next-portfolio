import volkiharBackgroundLarge from 'assets/hospital/operation.png';
import volkiharBackgroundPlaceholder from 'assets/hospital/dashboard.png';
import volkiharBackground from 'assets/hospital/operation.png';
import volkiharEnderalLarge from 'assets/hospital/bed.jpg';
import volkiharEnderalPlaceholder from 'assets/hospital/bed.jpg';
import volkiharEnderal from 'assets/hospital/bed.jpg';
import volkiharProblemLarge from 'assets/hospital/dashboard.png';
import volkiharProblemPlaceholder from 'assets/hospital/dashboard.png';
import volkiharProblem from 'assets/hospital/dashboard.png';
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
import { hospital } from 'contents/project';

// const Armor = dynamic(() => import('./Armor').then(mod => mod.Armor));

export function VolkiharKnight() {
  return (
    <Fragment>
      <Meta title={hospital.title} prefix="Projects" description={hospital.description} />
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
          title={hospital.title}
          description={hospital.description}
          roles={hospital.roles}
        />
        <ProjectSection
          backgroundElement={
            <Image
              srcSet={[volkiharProblem, volkiharProblemLarge]}
              placeholder={volkiharProblemPlaceholder}
              alt="A promotional image from Enderal showing several characters in the game overlooking a distant city."
              sizes={`100vw`}
            />
          }>
          <ProjectSectionColumns>
            <div className={styles.armor}>
              {/* <Armor alt="3D model of the Volkihar Knight armor" /> */}
            </div>
            <div className={styles.textSection}>
              <ProjectSectionHeading>{hospital.detail.problem_title}</ProjectSectionHeading>
              <ProjectSectionText>{hospital.detail.problem}</ProjectSectionText>
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
              <ProjectSectionHeading>Featured in HMS</ProjectSectionHeading>
              <ProjectSectionText>
                {hospital.detail.outcome}
              </ProjectSectionText>
              <Button
                secondary
                iconHoverShift
                icon="chevronRight"
                href="https://hms-user-side.netlify.app/"
              >
                View on Steam
              </Button>
            </ProjectTextRow>
          </ProjectSectionContent>
        </ProjectSection>
      </ProjectContainer>
      <Footer />
    </Fragment>
  );
}
