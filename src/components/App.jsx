import React, { useState } from 'react';
import { FeedBackOptions } from './FeedbackOptins/FeedbackOptions';
import { Section } from './Section/Section';
import { Statistics } from './Statistics/Statistics';
import { Notification } from './Notification/Notification';

export default function App() {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const options = { good, neutral, bad };

  const handleFeedback = e => {
    if (e.target.name === 'good') {
      setGood(prevGood => prevGood + 1);
    } else if (e.target.name === 'neutral') {
      setNeutral(prevNeutral => prevNeutral + 1);
    } else {
      setBad(prevBad => prevBad + 1);
    }
  };

  const countTotalFeedback = () => {
    let total = good + neutral + bad;

    return total;
  };

  const countPositiveFeedbackPercentage = () => {
    const total = countTotalFeedback();

    if (total > 0) {
      return Math.round((good / total) * 100);
    }
  };

  return (
    <>
      <Section title={'Please leave feedback'}>
        <FeedBackOptions
          options={Object.keys(options)}
          onLeaveFeedback={handleFeedback}
        />
      </Section>
      <Section title={'Statistics'}>
        {countTotalFeedback() > 0 ? (
          <Statistics
            good={good}
            bad={bad}
            neutral={neutral}
            total={countTotalFeedback()}
            persentage={countPositiveFeedbackPercentage()}
          />
        ) : (
          <Notification message="There is no feedback" />
        )}
      </Section>
    </>
  );
}
