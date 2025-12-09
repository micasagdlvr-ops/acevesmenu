/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/


export interface MenuItem {
  id: string;
  title: string;
  category: string;
  image: string;
  description: string;
  details: string[];
  features?: string[];
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  isError?: boolean;
}

export enum Section {
  HERO = 'hero',
  MENU = 'menu',
  SERVICES = 'services',
  CONTACT = 'contact',
}