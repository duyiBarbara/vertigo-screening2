
// Add missing React import to resolve React namespace issues in types
import React from 'react';

export enum View {
  DASHBOARD = 'DASHBOARD',
  ROMBERG = 'ROMBERG',
  TUG = 'TUG',
  DIX_HALLPIKE = 'DIX_HALLPIKE',
  HINTS = 'HINTS',
  DHI = 'DHI',
  VAS = 'VAS',
  ABCD2_SCORE = 'ABCD2_SCORE',
  MCTSIB = 'MCTSIB',
  TRAINING_CENTER = 'TRAINING_CENTER',
  LECTURE_DETAIL = 'LECTURE_DETAIL',
  HEARING_TEST = 'HEARING_TEST',
  DVA_TEST = 'DVA_TEST',
  BHIT_TEST = 'BHIT_TEST'
}

export interface TestResult {
  id: string;
  testName: string;
  date: Date;
  summary: string;
  riskLevel: 'LOW' | 'MODERATE' | 'HIGH';
}

export interface Lecture {
  id: string;
  title: string;
  subtitle: string;
  icon: string;
  sections: {
    id: string;
    title: string;
    // React.ReactNode is used here, requiring the React namespace
    content: React.ReactNode;
  }[];
}