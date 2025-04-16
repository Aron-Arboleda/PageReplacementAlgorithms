import {
  CardContainer,
  FlexContainer,
  LargeContainer,
  WhiteContainer,
} from '@components/Containers/Containers';
import Main from '@components/Containers/Main';
import {
  BodyTitle,
  Heading2Text,
  MiriamLibreText,
  NormalInterText,
} from '@components/Texts/Texts';

import firstInfirstOutImage from '@assets/images/aboutPageImages/firstInFirstOut.png';
import optimalImage from '@assets/images/aboutPageImages/optimal.png';
import leastRecentlyUsedImage from '@assets/images/aboutPageImages/lru.png';

import './AboutPage.css';

interface InfoGroupData {
  title: string;
  imageSrc: string;
  info: string;
  otherDetails: string[];
}

export const infoGroups: InfoGroupData[] = [
  {
    title: 'First-In-First-Out (FIFO) Algorithm',
    imageSrc: firstInfirstOutImage, // replace with your actual path
    info: 'First-In, First-Out (FIFO) is a simple algorithm that removes the oldest page in memory—the one that was loaded first—whenever a new page needs to be loaded due to a page fault and RAM is full. It uses a queue structure where pages are added to the end when they are loaded, and the page at the front of the queue is removed first. While easy to implement, FIFO can lead to poor performance in some cases because it doesn’t consider how often or how recently a page is used.',
    otherDetails: [
      'Can vary by reference string',
      'Adding more frames can cause more page faults!',
      'Use a FIFO queue to track ages of pages.',
    ],
  },
  {
    title: 'Optimal Algorithm',
    imageSrc: optimalImage, // replace with your actual path
    info: 'The Optimal Page Replacement Algorithm is a theoretical memory management strategy that replaces the page in memory that will not be used for the longest time in the future. It is designed to produce the lowest possible number of page faults by making the best possible decision at each step, assuming perfect knowledge of future memory accesses. Although it cannot be implemented in practice due to the need for future knowledge, it is commonly used as a benchmark to evaluate the efficiency of real-world page replacement algorithms like FIFO and LRU.',
    otherDetails: [
      'Replace page that will not be used for longest period of time',
      'Based on future knowledge, so it gives the minimum possible number of page faults.',
      'Used for comparison, not practical in real systems (since the OS can’t see the future).',
    ],
  },
  {
    title: 'Least Recently Used (LRU) Algorithm',
    imageSrc: leastRecentlyUsedImage, // replace with your actual path
    info: 'The Least Recently Used (LRU) Page Replacement Algorithm is a memory management technique that replaces the page that has not been used for the longest period of time. It operates on the assumption that pages used recently are more likely to be used again soon, while those not accessed for a while are less likely to be needed. LRU tracks the usage history of pages, either through counters or stacks, to make its replacement decisions. Although more complex to implement than FIFO, LRU generally performs better by reducing the number of page faults in real-world scenarios.',
    otherDetails: [
      'Use past knowledge rather than future',
      'Replace page that has not been used in the most amount of time',
      'Associate time of last use with each page',
    ],
  },
];

const InfoGroup = ({ title, imageSrc, info, otherDetails }: InfoGroupData) => {
  return (
    <div className="infoGroupContainer">
      <MiriamLibreText
        text={title}
        style={{ fontWeight: 'bold', fontSize: '16px' }}
      />
      <WhiteContainer
        style={{ padding: '20px', width: '100%', boxSizing: 'border-box' }}
      >
        <div style={{ display: 'flex', gap: '20px' }}>
          <img src={imageSrc} alt={title} className="infoImage" />
          <FlexContainer style={{ gap: '7px' }}>
            <NormalInterText>{info}</NormalInterText>
            <MiriamLibreText
              text={'Other Details:'}
              style={{ fontWeight: 'bold', fontSize: '14px' }}
            />
            <ul className="infoList">
              {otherDetails.map((detail, index) => (
                <li key={index} style={{ fontSize: '14px' }}>
                  {detail}
                </li>
              ))}
            </ul>
          </FlexContainer>
        </div>
      </WhiteContainer>
    </div>
  );
};

const AboutPage = () => {
  return (
    <Main>
      <LargeContainer>
        <div className="headingContainer">
          <BodyTitle title={'About'} style={{ margin: 0 }} />
        </div>
        <div className="bodyContainer">
          <CardContainer title="Information">
            <Heading2Text text="Page Replacement Algorithms" />
            <NormalInterText>
              Page replacement algorithms are techniques used by the operating
              system to decide which memory page to remove from RAM when a page
              fault occurs and there is no free space available. Since RAM is
              limited, these algorithms help manage virtual memory efficiently
              by selecting which page to evict and replace with a new one from
              disk. Common algorithms include FIFO (First-In, First-Out), LRU
              (Least Recently Used), and the Optimal algorithm, each aiming to
              minimize the number of future page faults and improve system
              performance.
            </NormalInterText>
            {infoGroups.map((group, idx) => (
              <InfoGroup
                key={idx}
                title={group.title}
                imageSrc={group.imageSrc}
                info={group.info}
                otherDetails={group.otherDetails}
              />
            ))}
          </CardContainer>
        </div>
      </LargeContainer>
    </Main>
  );
};

export default AboutPage;
