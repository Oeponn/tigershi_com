import React, {useState} from 'react';
import {useSprings, animated, to as interpolate} from '@react-spring/web';
import {useDrag} from 'react-use-gesture';
import {
  crona,
  kobenji,
  puparia,
  rei,
  skiz,
  wassily,
  willowbelle,
} from './images';

import styles from './styles.module.scss';

const cards = [
  {
    description: 'Clothing test illustration of sl33zyskiz, ' +
    'an NYC fashion influencer.',
    fullUrl: 'https://twitter.com/hyavoc/status/1486504518774837251',
    title: 'sl33zyskiz',
    url: skiz,
  },
  {
    description: 'A portrait of a friend who is a tattoo artist.',
    fullUrl: 'https://www.pixiv.net/en/artworks/101676386',
    title: 'Bchan',
    url: wassily,
  },
  {
    description: 'Crona from Soul Eater. Black blood pattern inspired by the ' +
    'cyber sigilism tattoo trend.',
    fullUrl: 'https://twitter.com/hyavoc/status/1503169847479386122',
    title: 'Crona',
    url: crona,
  },
  {
    description: 'Lighting and expression practice on a classic character — ' +
    'Rei from Evangelion.',
    fullUrl: 'https://twitter.com/hyavoc/status/1598819000125120517',
    title: 'Rei Ayanami',
    url: rei,
  },
  {
    description: 'A tribute to the short solo animated film "Puparia" by ' +
    'Shingo Tamagawa on Youtube. ',
    fullUrl: 'https://twitter.com/hyavoc/status/1544433020656132105',
    title: 'Moths',
    url: puparia,
  },
  {
    description: 'Commissioned avatar for the twitch streamer Wiillowbelle.',
    fullUrl: 'https://twitter.com/hyavoc/status/1713615867001668074',
    title: 'Willowbelle',
    url: willowbelle,
  },
  {
    description: 'My most recent digital paint of Kobeni and Denji from the ' +
    'anime Chainsaw Man.',
    fullUrl: 'https://twitter.com/hyavoc/status/1719035484712861883',
    title: 'Kobeni and Denji',
    url: kobenji,
  },
];

const TAP_THRESHOLD = 100;

// These two are just helpers, they curate spring data, values that are
// later being interpolated into css
const to = (i: number) => ({
  x: 0,
  y: i * -4,
  scale: 1,
  rot: -10 + Math.random() * 20,
  delay: i * 100,
});
const from = (_i: number) => ({x: 0, rot: 0, scale: 1.5, y: -1000});
// This is being used down there in the view, it interpolates rotation and
// scale into a css transform
const trans = (r: number, s: number) =>
  `perspective(1500px) rotateX(30deg) rotateY(${r / 10}deg) ` +
  `rotateZ(${r}deg) scale(${s})`;

function Deck() {
  // The set flags all the cards that are flicked out
  const [gone] = useState(() => new Set());
  const [props, api] = useSprings(cards.length, (i) => ({
    ...to(i),
    from: from(i),
  })); // Create a bunch of springs using the helpers above
  // Create a gesture, we're interested in down-state,
  // delta (current-pos - click-pos), direction and velocity
  const bind = useDrag(({
    args: [index], down, movement: [mx], direction: [xDir], velocity, event,
  }) => {
    const swipeThreshold = 10; // Set a threshold for swipe movement
    // If you flick hard enough it should trigger the card to fly out
    const trigger = velocity > 0.2 || Math.abs(mx) > swipeThreshold;
    const isSwipe = Math.abs(mx) > swipeThreshold; // Check if it's a swipe

    const dir = xDir < 0 ? -1 : 1; // Direction should either be left or right
    // if (!down) {
    //   if (trigger && isSwipe) {
    //     // If button/finger's up and it's a swipe
    //     // console.log('send it away');
    //     gone.add(index);
    //   } else if (!isSwipe) {
    //     // If it's not a swipe, it's a tap
    //     // window.open('https://twitter.com/hyavoc/status/1719035484712861883');
    //   }
    // }
    const target = event.currentTarget as HTMLElement;
    if (down) {
      // When the drag starts, record the start time
      if (event) {
        target.dataset.dragStartTime = Date.now().toString();
      }
    } else {
      // When the drag ends, calculate the duration
      const dragStartTime = target.dataset.dragStartTime ?
        Number(target.dataset.dragStartTime) : Date.now();
      const duration = Date.now() - dragStartTime;

      console.log('duration:', duration);

      if (trigger && isSwipe) {
        // If it's a swipe
        console.log('send it away');
        gone.add(index);
      } else if (duration < TAP_THRESHOLD) {
        const url = cards[index].fullUrl;
        // If it's a tap (duration is less than the threshold)
        if (confirm(`Opening link to ${url}`)) {
          console.log('opening!');
          window.open(url);
        } else {
          console.log('Cancelled');
        }
      }
    }
    api.start((i) => {
      // We're only interested in changing spring-data for the current spring
      if (index !== i) return;
      const isGone = gone.has(index);
      // When a card is gone it flys out left or right, otherwise goes back to 0
      const x = isGone ? (200 + window.innerWidth) * dir : down ? mx : 0;
      // How much the card tilts, flicking it harder makes it rotate faster
      const rot = mx / 100 + (isGone ? dir * 10 * velocity : 0);
      const scale = down ? 1.1 : 1; // Active cards lift up a bit
      return {
        x,
        rot,
        scale,
        delay: undefined,
        config: {friction: 50, tension: down ? 800 : isGone ? 200 : 500},
      };
    });
    if (!down && gone.size === cards.length) {
      setTimeout(() => {
        gone.clear();
        api.start((i) => to(i));
      }, 600);
    }
  });
  // Now we're just mapping the animated values to our view,
  // that's it. Btw, this component only renders once. :-)
  return (
    <>
      {props.map(({x, y, rot, scale}, i) => {
        const {
          title,
          url,
          description,
          fullUrl,
        } = cards[i];
        return (
          <animated.div className={styles.deck} key={url} style={{x, y}}>
            {/* This is the card itself, we're binding our gesture to it
            (and inject its index so we know which is which) */}
            <animated.div
              {...bind(i)}
              style={{
                transform: interpolate([rot, scale], trans),
                backgroundImage: `url(${url})`,
              }}
            >
              <div className={styles.descriptionContainer}>
                <p className={styles.title}>{title}</p>
                <p className={styles.description}>{description}</p>
                <a
                  className={styles.link}
                  href={fullUrl}
                  rel="noreferrer"
                  target="_blank">
              Tap to see full size→
                </a>
              </div>
            </animated.div>
          </animated.div>
        );
      })}
    </>
  );
}


const Art = () => {
  return (
    <div className={styles.pageContainer}>
      <Deck />
    </div>
  );
};

export default Art;
