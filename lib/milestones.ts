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
    endFrame: 12,
  },
  {
    id: 'about',
    title: 'About Me',
    startFrame: 12,
    endFrame: 28,
  },
  {
    id: 'projects',
    title: 'Featured Projects',
    startFrame: 28,
    endFrame: 42,
  },
  {
    id: 'skills',
    title: 'Skills & Toolkit',
    startFrame: 42,
    endFrame: 52,
  },
  {
    id: 'contact',
    title: 'Contact',
    startFrame: 52,
    endFrame: 60,
  },
];

export function getActiveMilestone(frameIndex: number): MilestoneConfig {
  const milestone = MILESTONES.find(
    (m) => frameIndex >= m.startFrame && frameIndex < m.endFrame
  );
  return milestone || MILESTONES[MILESTONES.length - 1];
}
