import React from 'react';
import ReactMarkdown from 'react-markdown';
import { Section, DecorativeShapes } from '../components/UI';
import { LEGAL_CONTENT } from '../constants';

interface LegalProps {
  type: 'privacy' | 'terms' | 'cookies' | 'financials';
}

const Legal: React.FC<LegalProps> = ({ type }) => {
  const content = LEGAL_CONTENT[type];

  return (
    <>
      <DecorativeShapes />
      <Section className="bg-slate-50 dark:bg-dark pt-24 min-h-screen">
        <div className="max-w-4xl mx-auto bg-white dark:bg-dark-card p-8 md:p-12 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800">
          <div className="prose prose-lg dark:prose-invert max-w-none prose-headings:font-heading prose-a:text-[#06B6D4]">
            <ReactMarkdown>{content}</ReactMarkdown>
          </div>
        </div>
      </Section>
    </>
  );
};

export default Legal;