'use client';

import { MILESTONES } from '@/lib/milestones';
import { HeroMilestone } from '@/components/milestones/HeroMilestone';
import { AboutMilestone } from '@/components/milestones/AboutMilestone';
import { ProjectsMilestone } from '@/components/milestones/ProjectsMilestone';
import { SkillsMilestone } from '@/components/milestones/SkillsMilestone';
import { ContactMilestone } from '@/components/milestones/ContactMilestone';

interface FrameOverlayContentProps {
  currentFrame: number;
}

export function FrameOverlayContent({ currentFrame }: FrameOverlayContentProps) {
  return (
    <>
      {MILESTONES.map((m) => {
        const isActive = currentFrame >= m.startFrame && currentFrame < m.endFrame;
        const totalFramesInMilestone = m.endFrame - m.startFrame;
        const rawLocalProgress =
          (currentFrame - m.startFrame) / Math.max(1, totalFramesInMilestone);
        const localProgress = Math.max(0, Math.min(1, rawLocalProgress));

        switch (m.id) {
          case 'hero':
            return (
              <HeroMilestone
                key={m.id}
                progress={localProgress}
                isActive={isActive}
              />
            );
          case 'about':
            return (
              <AboutMilestone
                key={m.id}
                progress={localProgress}
                isActive={isActive}
              />
            );
          case 'projects':
            return (
              <ProjectsMilestone
                key={m.id}
                progress={localProgress}
                isActive={isActive}
              />
            );
          case 'skills':
            return (
              <SkillsMilestone
                key={m.id}
                progress={localProgress}
                isActive={isActive}
              />
            );
          case 'contact':
            return (
              <ContactMilestone
                key={m.id}
                progress={localProgress}
                isActive={isActive}
              />
            );
          default:
            return null;
        }
      })}
    </>
  );
}
