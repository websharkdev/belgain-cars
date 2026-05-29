import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { ProfileForm } from '@/features/dashboard/profile/profile.form';
import { auth } from '@/lib/auth';
import prisma from '@/lib/prisma';
import { getUserDisplayName } from '@/lib/string.lib';

export default async function DashboardProfilePage() {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session) {
    redirect('/auth/sign-in');
  }

  const dbUser = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: {
      email: true,
      lastName: true,
      name: true,
      phone: true,
    },
  });

  if (!dbUser) {
    redirect('/auth/sign-in');
  }

  const display = getUserDisplayName({
    email: dbUser.email,
    firstName: dbUser.name,
    lastName: dbUser.lastName,
  });

  return (
    <ProfileForm
      user={{
        email: dbUser.email,
        firstName: dbUser.name,
        fullName: display.fullName,
        initials: display.initials.slice(0, 1),
        lastName: dbUser.lastName,
        phone: dbUser.phone ?? '',
      }}
    />
  );
}
