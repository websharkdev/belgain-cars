import { redirect } from 'next/navigation';
import { ProfileForm } from '@/features/dashboard/profile/profile.form';
import { requireUser } from '@/lib/auth-session';
import prisma from '@/lib/prisma';
import { routes } from '@/lib/routes';
import { getUserDisplayName } from '@/lib/string.lib';

export default async function DashboardProfilePage() {
  const user = await requireUser();

  const dbUser = await prisma.user.findUnique({
    where: { id: user.id },
    select: {
      email: true,
      lastName: true,
      name: true,
      phone: true,
    },
  });

  if (!dbUser) {
    redirect(routes.signIn);
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
