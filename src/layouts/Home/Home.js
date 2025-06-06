import gamestackTexture2Large from 'assets/ecommerce/06.png';
import gamestackTexture2Placeholder from 'assets/ecommerce/06.png';
import gamestackTexture2 from 'assets/ecommerce/06.png';
import gamestackTextureLarge from 'assets/ecommerce/05-1.png';
import gamestackTexturePlaceholder from 'assets/ecommerce/05-1.png';
import gamestackTexture from 'assets/ecommerce/05-1.png';
import sliceTextureLarge from 'assets/hospital/home-placeholder.png';
import sliceTexturePlaceholder from 'assets/hospital/home-placeholder.png';
import sliceTexture from 'assets/hospital/home.png';
import sprTextureLarge from 'assets/delivery/dashboard.png';
import sprTexturePlaceholder from 'assets/delivery/dashboard-placeholder.png';
import sprTexture from 'assets/delivery/dashboard.png';
import { Footer } from 'components/Footer';
import { Meta } from 'components/Meta';
import { Intro } from 'layouts/Home/Intro';
import { Profile } from 'layouts/Home/Profile';
import { Skill } from 'layouts/Home/Skill';
import { ProjectSummary } from 'layouts/Home/ProjectSummary';
import { useEffect, useRef, useState } from 'react';
import styles from './Home.module.css';
import { disciplines, meta_title, meta_description, project } from 'contents/home';

export const Home = () => {
  const [visibleSections, setVisibleSections] = useState([]);
  const [scrollIndicatorHidden, setScrollIndicatorHidden] = useState(false);
  const intro = useRef();
  const projectOne = useRef();
  const projectTwo = useRef();
  const projectThree = useRef();
  const details = useRef();
  const skills = useRef();

  useEffect(() => {
    const sections = [intro, projectOne, projectTwo, projectThree, details, skills];

    const sectionObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const section = entry.target;
            observer.unobserve(section);
            if (visibleSections.includes(section)) return;
            setVisibleSections(prevSections => [...prevSections, section]);
          }
        });
      },
      { rootMargin: '0px 0px -10% 0px', threshold: 0.1 }
    );

    const indicatorObserver = new IntersectionObserver(
      ([entry]) => {
        setScrollIndicatorHidden(!entry.isIntersecting);
      },
      { rootMargin: '-100% 0px 0px 0px' }
    );

    sections.forEach(section => {
      sectionObserver.observe(section.current);
    });

    indicatorObserver.observe(intro.current);

    return () => {
      sectionObserver.disconnect();
      indicatorObserver.disconnect();
    };
  }, [visibleSections]);

  return (
    <div className={styles.home}>
      <Meta title={meta_title} description={meta_description} />
      <Intro
        id="intro"
        sectionRef={intro}
        disciplines={disciplines}
        scrollIndicatorHidden={scrollIndicatorHidden}
      />
      <ProjectSummary
        id="project-1"
        sectionRef={projectOne}
        visible={visibleSections.includes(projectOne.current)}
        index={1}
        title={project[1].title}
        description={project[1].description}
        buttonText={project[1].buttonText}
        buttonLink={project[1].buttonLink}
        model={{
          type: project[1].type,
          alt: project[1].alt,
          textures: [
            {
              srcSet: [sprTexture, sprTextureLarge],
              placeholder: sprTexturePlaceholder,
            },
          ],
        }}
      />
      <ProjectSummary
        id="project-2"
        alternate
        sectionRef={projectTwo}
        visible={visibleSections.includes(projectTwo.current)}
        index={2}
        title={project[2].title}
        description={project[2].description}
        buttonText={project[2].buttonText}
        buttonLink={project[2].buttonLink}
        model={{
          type: project[2].type,
          alt: project[2].alt,
          textures: [
            {
              srcSet: [gamestackTexture, gamestackTextureLarge],
              placeholder: gamestackTexturePlaceholder,
            },
            {
              srcSet: [gamestackTexture2, gamestackTexture2Large],
              placeholder: gamestackTexture2Placeholder,
            },
          ],
        }}
      />
      <ProjectSummary
        id="project-3"
        sectionRef={projectThree}
        visible={visibleSections.includes(projectThree.current)}
        index={3}
        title={project[3].title}
        description={project[3].description}
        buttonText={project[3].buttonText}
        buttonLink={project[3].buttonLink}
        model={{
          type: project[3].type,
          alt: project[3].alt,
          textures: [
            {
              srcSet: [sliceTexture, sliceTextureLarge],
              placeholder: sliceTexturePlaceholder,
            },
          ],
        }}
      />
      <Skill
        sectionRef={skills}
        visible={visibleSections.includes(skills.current)}
        id="skills"
      />
      <Profile
        sectionRef={details}
        visible={visibleSections.includes(details.current)}
        id="details"
      />
      <Footer />
    </div>
  );
};
