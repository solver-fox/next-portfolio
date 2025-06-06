import backgroundSprLarge from 'assets/spr-background-large.jpg';
import backgroundSprPlaceholder from 'assets/spr-background-placeholder.jpg';
import backgroundSpr from 'assets/spr-background.jpg';
import imageSprLessonBuilderDarkLarge from 'assets/delivery/image.png';
import imageSprLessonBuilderDarkPlaceholder from 'assets/spr-lesson-builder-dark-placeholder.jpg';
import imageSprLessonBuilderDark from 'assets/delivery/image.png';
import recipeSprLarge from 'assets/delivery/recipe.png';
import recipeSpr from 'assets/delivery/recipe.png';
import { Footer } from 'components/Footer';
import { Link } from 'components/Link';
import { Meta } from 'components/Meta';
import { useTheme } from 'components/ThemeProvider';
import { Image } from 'components/Image';
import {
  ProjectBackground,
  ProjectContainer,
  ProjectHeader,
  ProjectImage,
  ProjectSection,
  ProjectSectionContent,
  ProjectSectionHeading,
  ProjectSectionText,
  ProjectTextRow,
} from 'layouts/Project';
import { Fragment } from 'react';
import { media } from 'utils/style';
import { delivery } from 'contents/project';
const { title, description, roles, url } = delivery;

export const Delivery = () => {
  const { themeId } = useTheme();

  const isDark = themeId === 'dark';

  return (
    <Fragment>
      <ProjectContainer className="spr">
        <Meta title={title} prefix="Projects" description={description} />
        <ProjectBackground
          srcSet={[backgroundSpr, backgroundSprLarge]}
          placeholder={backgroundSprPlaceholder}
          opacity={0.2}
          sizes={`(max-width: ${media.mobile}px) 100vw, (max-width: ${media.tablet}px) 800px, 1000px`}
        />
        <ProjectHeader title={title} description={description} url={url} roles={roles} />
        <ProjectSection
        // backgroundElement={
        //   <Image
        //     srcSet={[imageSprLessonBuilderDark, imageSprLessonBuilderDarkLarge]}
        //     placeholder={imageSprLessonBuilderDarkPlaceholder}
        //     alt="A promotional image from Enderal showing several characters in the game overlooking a distant city."
        //     sizes={`100vw`}
        //   />
        // }
        >
          <ProjectTextRow>
            <ProjectSectionHeading>The problem</ProjectSectionHeading>
            <ProjectSectionText>{delivery.detail.problem}</ProjectSectionText>
          </ProjectTextRow>
        </ProjectSection>
        <ProjectSection
        // backgroundElement={
        //   <Image
        //     srcSet={[recipeSpr, recipeSprLarge]}
        //     placeholder={imageSprLessonBuilderDarkPlaceholder}
        //     alt="A promotional image from Enderal showing several characters in the game overlooking a distant city."
        //     sizes={`100vw`}
        //   />
        // }
        >
          <ProjectSectionContent>
            <ProjectTextRow center centerMobile noMargin>
              <ProjectSectionHeading>Project outcomes</ProjectSectionHeading>
              <ProjectSectionText>{delivery.detail.outcome}</ProjectSectionText>
            </ProjectTextRow>
          </ProjectSectionContent>
        </ProjectSection>
      </ProjectContainer>
      <Footer />
    </Fragment>
  );
};
