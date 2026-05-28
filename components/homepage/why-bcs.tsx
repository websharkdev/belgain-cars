import { SectionHeader } from '@/components/homepage/section-header';
import { WhyBcsHeroCard } from '@/components/why-bcs/why-bcs-hero-card';
import { WhyBcsStatCard } from '@/components/why-bcs/why-bcs-stat-card';
import { whyBcsHeroCard, whyBcsStats } from '@/data/homepage';

function WhyBcsStatsGrid() {
  const rows = [whyBcsStats.slice(0, 2), whyBcsStats.slice(2)];

  return (
    <div className="flex min-w-0 flex-1 flex-col gap-5">
      {rows.map((row, index) => (
        <div key={index} className="flex flex-col gap-5 sm:flex-row">
          {row.map((stat) => (
            <WhyBcsStatCard key={stat.id} stat={stat} />
          ))}
        </div>
      ))}
    </div>
  );
}

export function WhyBcs() {
  return (
    <section className="flex w-full flex-col gap-6 pb-2">
      <SectionHeader title="Why BCS Autoparts" />

      <div className="flex w-full flex-col items-stretch gap-5 lg:flex-row">
        <WhyBcsHeroCard data={whyBcsHeroCard} />
        <WhyBcsStatsGrid />
      </div>
    </section>
  );
}
