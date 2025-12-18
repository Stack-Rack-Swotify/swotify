
import React from 'react';

export type AuthMode = 'login' | 'signup';

export interface StatItem {
  id: string;
  label: string;
  value: string;
  color: 'blue' | 'green' | 'purple' | 'orange' | 'red';
  icon: React.ReactNode;
}

export interface SecurityTip {
  title: string;
  content: string;
}
