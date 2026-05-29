import { redirect } from 'next/navigation';
import { getServerSession, requireSession } from '@/lib/auth-session';
import prisma from '@/lib/prisma';
import { routes } from '@/lib/routes';

export type DashboardRole = 'admin' | 'user';

const ROLE_DASHBOARD_PATH: Record<DashboardRole, string> = {
  admin: routes.dashboardAdmin,
  user: routes.dashboardUser,
};

function normalizeRole(role?: string | null): DashboardRole | null {
  if (role === 'admin' || role === 'user') {
    return role;
  }

  return null;
}

async function getCurrentRole() {
  const session = await getServerSession();

  if (!session) {
    return null;
  }

  const users = await prisma.$queryRaw<Array<{ role: string | null }>>`
        SELECT "role"
        FROM "User"
        WHERE "id" = ${session.user.id}
        LIMIT 1
    `;

  const sessionUser = session.user as typeof session.user & {
    role?: string | null;
  };

  return (
    normalizeRole(users[0]?.role) ?? normalizeRole(sessionUser.role) ?? 'admin'
  );
}

export async function redirectToRoleDashboard() {
  const role = await getCurrentRole();

  if (!role) {
    redirect(routes.signIn);
  }

  redirect(ROLE_DASHBOARD_PATH[role]);
}

export async function assertDashboardAccess() {
  const role = await getCurrentRole();

  if (!role) {
    redirect(routes.signIn);
  }

  return role;
}

export async function getDashboardSessionUser() {
  const session = await requireSession();

  const users = await prisma.$queryRaw<
    Array<{
      email: string;
      image: string | null;
      lastName: string;
      name: string;
      phone: string | null;
      role: string | null;
    }>
  >`
        SELECT "email", "image", "lastName", "name", "phone", "role"
        FROM "User"
        WHERE "id" = ${session.user.id}
        LIMIT 1
    `;

  return users[0] ?? null;
}

export async function assertRoleDashboardAccess(expectedRole: DashboardRole) {
  const role = await getCurrentRole();

  if (!role) {
    redirect(routes.signIn);
  }

  if (role !== expectedRole) {
    redirect(ROLE_DASHBOARD_PATH[role]);
  }
}
