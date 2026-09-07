export interface MilestoneConfig {
  id: 'hero' | 'about' | 'projects' | 'skills' | 'contact';
  title: string;
  startFrame: number; // 0-indexed inclusive
  endFrame: number;   // 0-indexed exclusive
}

export const MILESTONES: MilestoneConfig[] = [
  {
    id: 'hero',
    title: 'Welcome',
    startFrame: 0,
    endFrame: 26,
  },
  {
    id: 'about',
    title: 'About Me',
    startFrame: 26,
    endFrame: 56,
  },
  {
    id: 'projects',
    title: 'Featured Projects',
    startFrame: 56,
    endFrame: 86,
  },
  {
    id: 'skills',
    title: 'Skills & Toolkit',
    startFrame: 86,
    endFrame: 106,
  },
  {
    id: 'contact',
    title: 'Contact',
    startFrame: 106,
    endFrame: 152,
  },
];

export function getActiveMilestone(frameIndex: number): MilestoneConfig {
  const milestone = MILESTONES.find(
    (m) => frameIndex >= m.startFrame && frameIndex < m.endFrame
  );
  return milestone || MILESTONES[MILESTONES.length - 1];
}
