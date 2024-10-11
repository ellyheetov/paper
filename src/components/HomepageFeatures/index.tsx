import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

type FeatureItem = {
  title: string;
  Img: string;
  description: JSX.Element;
};

const FeatureList: FeatureItem[] = [
  {
    title: 'iOS Developer',
    Img: require('@site/static/img/im_developer.png').default,
    description: (
      <>
        I’m an iOS developer with a passion for building apps that feel just right.
        I enjoy the process of turning ideas into smooth, user-friendly experiences, and I’m always looking for new ways to improve my skills and stay updated with the latest in mobile tech. 
      </>
    ),
  },
  {
    title: 'Adventure',
    Img: require('@site/static/img/adventure.png').default,
    description: (
      <>
        When I’m not coding, you’ll probably find me climbing, playing futsal, or doing something active. 
        I love challenging myself and pushing my limits, especially when it involves being outdoors or working with a team. 
        These activities give me the energy and focus I need to bring the same level of excitement and dedication to my work.
      </>
    ),
  },
  {
    title: 'Sharing',
    Img: require('@site/static/img/sharing.jpg').default,
    description: (
      <>
        I like to share what I’m up to, whether it’s tech-related, an adventure story, or just thoughts on life. 
        Blogging is a way for me to reflect, connect with others, and keep track of what I’m learning along the way.
      </>
    ),
  },
];

function Feature({title, Img, description}: FeatureItem) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <img src={Img} alt={title} className={styles.featureImg} /> 
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): JSX.Element {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
