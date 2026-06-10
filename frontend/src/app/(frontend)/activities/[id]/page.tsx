import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { ArrowLeft, Clock, Sparkles, Users } from 'lucide-react';
import { getActivityBySlug } from '@/lib/data/activities';
import { ActivityInquiryForm } from '@/components/ActivityInquiryForm';

interface ActivityPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: ActivityPageProps): Promise<Metadata> {
  const { id } = await params;
  const activity = await getActivityBySlug(id);

  if (!activity) {
    return { title: 'Experience Not Found' };
  }

  return {
    title: `${activity.title} | Not Just A Stay`,
    description: activity.shortDescription || activity.description?.slice(0, 160),
  };
}

function formatPrice(value: number, currency = 'INR') {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency,
    maximumFractionDigits: 0,
  }).format(value);
}

export default async function ActivityPage({ params }: ActivityPageProps) {
  const { id } = await params;
  const activity = await getActivityBySlug(id);

  if (!activity) {
    notFound();
  }

  const groupSizeText = activity.groupSize?.minGuests && activity.groupSize?.maxGuests
    ? `${activity.groupSize.minGuests}-${activity.groupSize.maxGuests} guests`
    : activity.groupSize?.maxGuests
      ? `Up to ${activity.groupSize.maxGuests} guests`
      : null;

  return (
    <main className="min-h-screen bg-[#F8F8F8] text-[#141414]">
      <header className="border-b border-black/10 px-5 py-5 md:px-10">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-5">
          <Link href="/activities" className="inline-flex items-center gap-2 text-[13px] font-semibold uppercase text-[#6f6f6f] transition-colors hover:text-[#141414]">
            <ArrowLeft className="h-4 w-4" />
            Experiences
          </Link>
          <Link href="/" className="text-center text-2xl font-semibold leading-none tracking-tight">
            Not Just<br />A Stay
          </Link>
          <Link href="/properties" className="bg-[#141414] px-5 py-3 text-[12px] font-semibold uppercase tracking-wide text-white transition-colors hover:bg-[#A1834C]">
            Villas
          </Link>
        </div>
      </header>

      <section className="mx-auto grid max-w-7xl gap-8 px-5 py-8 md:grid-cols-12 md:px-10 md:py-12">
        <div className="md:col-span-5">
          <p className="mb-5 inline-flex items-center gap-2 text-[12px] font-semibold uppercase text-[#A1834C]">
            <Sparkles className="h-4 w-4" />
            Hosted experience
          </p>
          <h1 className="max-w-xl text-5xl font-medium leading-[1.02] tracking-tight md:text-7xl">
            {activity.title}
          </h1>
          <p className="mt-8 max-w-xl text-lg leading-8 text-[#6f6f6f]">
            {activity.shortDescription || activity.description}
          </p>

          <div className="mt-10 grid grid-cols-3 gap-5">
            {activity.duration && (
              <div className="border-t border-black/10 pt-4">
                <Clock className="mb-3 h-4 w-4 text-[#A1834C]" />
                <p className="text-[11px] font-semibold uppercase text-[#8b8b8b]">Duration</p>
                <p className="mt-1 text-lg font-medium">{activity.duration}</p>
              </div>
            )}
            {groupSizeText && (
              <div className="border-t border-black/10 pt-4">
                <Users className="mb-3 h-4 w-4 text-[#A1834C]" />
                <p className="text-[11px] font-semibold uppercase text-[#8b8b8b]">Group</p>
                <p className="mt-1 text-lg font-medium">{groupSizeText}</p>
              </div>
            )}
            <div className="border-t border-black/10 pt-4">
              <Sparkles className="mb-3 h-4 w-4 text-[#A1834C]" />
              <p className="text-[11px] font-semibold uppercase text-[#8b8b8b]">From</p>
              <p className="mt-1 text-lg font-medium">{formatPrice(activity.price, activity.currency)}</p>
            </div>
          </div>
        </div>

        <div className="md:col-span-7">
          {activity.featuredImage?.url && (
            <div className="relative aspect-[4/3] overflow-hidden bg-neutral-200 md:aspect-[1.15/1]">
              <Image
                src={activity.featuredImage.url}
                alt={activity.featuredImage.alt || activity.title}
                fill
                priority
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 58vw"
              />
            </div>
          )}
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-8 px-5 pb-16 md:grid-cols-12 md:px-10">
        <div className="space-y-8 md:col-span-7">
          <section className="border-t border-black/10 pt-8">
            <h2 className="text-3xl font-medium tracking-tight">What to expect</h2>
            <p className="mt-5 text-base leading-8 text-[#6f6f6f]">
              {activity.description}
            </p>
          </section>

          {activity.highlights && activity.highlights.length > 0 && (
            <section className="border-t border-black/10 pt-8">
              <h2 className="text-3xl font-medium tracking-tight">Highlights</h2>
              <div className="mt-6 grid gap-x-8 md:grid-cols-2">
                {activity.highlights.map((item) => (
                  <div key={item.highlight} className="flex items-center gap-3 border-t border-black/10 py-4">
                    <Sparkles className="h-4 w-4 text-[#A1834C]" />
                    <span className="text-sm font-medium">{item.highlight}</span>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        <aside className="md:col-span-5 lg:col-span-4 lg:col-start-9">
          <div className="sticky top-6 bg-white p-6 ring-1 ring-black/5">
            <p className="text-[11px] font-semibold uppercase text-[#A1834C]">Plan this experience</p>
            <h2 className="mt-2 text-2xl font-medium tracking-tight">{formatPrice(activity.price, activity.currency)} / person</h2>
            <div className="mt-6">
              <ActivityInquiryForm activityId={activity.id} activityTitle={activity.title} />
            </div>
          </div>
        </aside>
      </section>
    </main>
  );
}
