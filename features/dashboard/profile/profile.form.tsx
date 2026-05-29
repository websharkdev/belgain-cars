'use client';

import * as React from 'react';
import {
  Calendar,
  ClipboardList,
  Edit2,
  KeyRound,
  Mail,
  Minus,
  Plus,
  Trash2,
} from 'lucide-react';
import { deleteAccountAction } from '@/app/actions/account-settings/delete-account.action';
import { updateProfileAction } from '@/app/actions/account-settings/update-profile.action';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Link, useRouter } from '@/i18n/routing';
import { routes } from '@/lib/routes';
import { encodePasswordForAction } from '@/lib/password.lib';
import { cn } from '@/lib/utils';
import {
  profileDetailsSchema,
  type ProfileDetailsValues,
} from './profile.schema';

interface ProfileFormProps {
  user: {
    email: string;
    firstName: string;
    fullName: string;
    initials: string;
    lastName: string;
    phone: string;
  };
}

interface ProfileFormErrors {
  email?: string;
  firstName?: string;
  form?: string;
  lastName?: string;
  phone?: string;
}

interface DeleteFormErrors {
  confirmation?: string;
  email?: string;
  form?: string;
  password?: string;
}

const inputVariants = {
  state: {
    default:
      'h-12 rounded-full border-transparent bg-muted px-4 py-3 text-base leading-6 text-ink placeholder:text-ink-40 focus-visible:border-transparent focus-visible:ring-3 focus-visible:ring-primary/15 md:text-base',
    error:
      'h-12 rounded-full border-danger/40 bg-danger/5 px-4 py-3 text-base leading-6 text-ink placeholder:text-ink-40 focus-visible:border-danger/40 focus-visible:ring-3 focus-visible:ring-danger/15 md:text-base',
  },
};

const editButtonVariants = {
  state: {
    active: 'bg-ink-05 text-ink hover:bg-ink-08',
    idle: 'bg-ink-05 text-ink hover:bg-ink-08',
  },
};

type InputState = keyof typeof inputVariants.state;
type EditButtonState = keyof typeof editButtonVariants.state;

function getInputClassName(state: InputState) {
  return cn(
    'w-full min-w-0 outline-none transition-colors',
    inputVariants.state[state],
  );
}

function getEditButtonClassName(state: EditButtonState) {
  return cn(
    'size-8 rounded-full hover:shadow-none [&_svg:not([class*=size-])]:size-4',
    editButtonVariants.state[state],
  );
}

function getFieldValue(value: string, fallback = 'Not filled in') {
  return value.trim() || fallback;
}

function SectionHeader({
  editing,
  onToggle,
  title,
}: {
  editing?: boolean;
  onToggle?: () => void;
  title: string;
}) {
  return (
    <div className="flex items-center gap-2">
      <h2 className="text-ink line-clamp-1 text-3xl leading-10 font-medium">
        {title}
      </h2>
      {onToggle ? (
        <Button
          type="button"
          variant="ghost"
          size="icon-sm"
          aria-label={editing ? `Cancel editing ${title}` : `Edit ${title}`}
          className={getEditButtonClassName(editing ? 'active' : 'idle')}
          onClick={onToggle}
        >
          {editing ? <Minus /> : <Edit2 />}
        </Button>
      ) : null}
    </div>
  );
}

function ReadField({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex min-w-28 flex-col items-start gap-1">
      <span className="text-ink-70 line-clamp-1 text-xs leading-5 font-normal">
        {label}
      </span>
      <span className="text-ink line-clamp-1 text-base leading-6 font-medium">
        {value}
      </span>
    </div>
  );
}

function ProfileInput({
  error,
  label,
  name,
  ...props
}: React.ComponentProps<typeof Input> & {
  error?: string;
  label: string;
  name: string;
}) {
  return (
    <Field data-invalid={Boolean(error)} className="w-full">
      <FieldLabel
        htmlFor={name}
        className="text-ink-60 line-clamp-1 text-sm leading-5 font-normal"
      >
        {label}
      </FieldLabel>
      <Input
        id={name}
        name={name}
        aria-invalid={Boolean(error)}
        className={getInputClassName(error ? 'error' : 'default')}
        {...props}
      />
      <FieldError>{error}</FieldError>
    </Field>
  );
}

function BelgiumPrefix() {
  return (
    <div className="text-ink flex items-center gap-1 text-base leading-6">
      <span className="relative size-4 overflow-hidden rounded-full bg-amber-300">
        <span className="absolute inset-y-0 left-0 w-1/3 bg-neutral-900" />
        <span className="absolute inset-y-0 right-0 w-1/3 bg-rose-500" />
      </span>
      <span>+32</span>
    </div>
  );
}

function ProfileSidebar({ user }: ProfileFormProps) {
  return (
    <aside className="w-full shrink-0 lg:w-72">
      <div className="border-ink-10 bg-background flex w-full flex-col gap-0.5 overflow-hidden rounded-3xl border p-1">
        <div className="bg-muted rounded-[20px] p-1">
          <div className="flex items-center gap-3 rounded-[20px] py-3 pr-3.5 pl-4">
            <div className="bg-primary text-primary-foreground grid size-12 shrink-0 place-items-center rounded-full text-2xl leading-9 font-normal">
              {user.initials}
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-ink line-clamp-1 text-base leading-6 font-normal">
                {user.fullName}
              </p>
              <p className="text-ink-70 line-clamp-1 text-sm leading-5 font-normal">
                {getFieldValue(user.phone)}
              </p>
            </div>
          </div>
        </div>
        <Button
          asChild
          variant="ghost"
          className="text-ink-80 hover:bg-muted h-12 justify-start gap-3 rounded-[20px] px-4 py-3 text-base leading-6 font-normal hover:shadow-none"
        >
          <Link href={routes.orderHistory}>
            <ClipboardList data-icon="inline-start" className="text-ink-70" />
            My orders
          </Link>
        </Button>
      </div>
    </aside>
  );
}

export function ProfileForm({ user }: ProfileFormProps) {
  const router = useRouter();
  const [profile, setProfile] = React.useState<ProfileDetailsValues>({
    firstName: user.firstName,
    lastName: user.lastName,
    phone: user.phone,
    email: user.email,
  });
  const [editingPersonal, setEditingPersonal] = React.useState(false);
  const [editingContact, setEditingContact] = React.useState(false);
  const [errors, setErrors] = React.useState<ProfileFormErrors>({});
  const [deleteErrors, setDeleteErrors] = React.useState<DeleteFormErrors>({});
  const [isSaving, startSaving] = React.useTransition();
  const [isDeleting, startDeleting] = React.useTransition();

  const resetEdits = () => {
    setProfile({
      firstName: user.firstName,
      lastName: user.lastName,
      phone: user.phone,
      email: user.email,
    });
    setErrors({});
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setProfile((current) => ({ ...current, [name]: value }));
  };

  const handleSave = (section: 'contact' | 'personal') => {
    const parsed = profileDetailsSchema.safeParse(profile);

    if (!parsed.success) {
      const fieldErrors = parsed.error.flatten().fieldErrors;
      setErrors({
        email: fieldErrors.email?.[0],
        firstName: fieldErrors.firstName?.[0],
        lastName: fieldErrors.lastName?.[0],
        phone: fieldErrors.phone?.[0],
      });
      return;
    }

    setErrors({});
    startSaving(async () => {
      const result = await updateProfileAction(parsed.data);

      if (result.error) {
        setErrors({ form: result.error });
        return;
      }

      if (section === 'personal') setEditingPersonal(false);
      if (section === 'contact') setEditingContact(false);
      router.refresh();
    });
  };

  const handleDeleteSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const values = {
      email: String(formData.get('email') ?? ''),
      password: encodePasswordForAction(String(formData.get('password') ?? '')),
      confirmation: String(formData.get('confirmation') ?? ''),
    };

    setDeleteErrors({});
    startDeleting(async () => {
      const result = await deleteAccountAction(values);

      if (result.error) {
        setDeleteErrors({ form: result.error });
        return;
      }

      form.reset();
      router.push(routes.home);
      router.refresh();
    });
  };

  return (
    <div className="w-full px-5 py-6 md:px-10 lg:px-20">
      <div className="flex w-full flex-col items-start gap-5 lg:flex-row">
        <ProfileSidebar user={user} />

        <div className="bg-background w-full min-w-0 flex-1 lg:max-w-[952px]">
          <section className="overflow-hidden py-4">
            <SectionHeader
              title="Personal Information"
              editing={editingPersonal}
              onToggle={() => {
                if (editingPersonal) resetEdits();
                setEditingPersonal((value) => !value);
              }}
            />

            {editingPersonal ? (
              <form
                className="mt-2.5 flex flex-col gap-5 xl:flex-row xl:items-end"
                onSubmit={(event) => {
                  event.preventDefault();
                  handleSave('personal');
                }}
              >
                <div className="grid flex-1 gap-5 md:grid-cols-3">
                  <ProfileInput
                    label="First name"
                    name="firstName"
                    value={profile.firstName}
                    error={errors.firstName}
                    onChange={handleInputChange}
                  />
                  <ProfileInput
                    label="Last name"
                    name="lastName"
                    value={profile.lastName}
                    error={errors.lastName}
                    onChange={handleInputChange}
                  />
                  <Field>
                    <FieldLabel
                      htmlFor="dateOfBirth"
                      className="text-ink-60 line-clamp-1 text-sm leading-5 font-normal"
                    >
                      Date of birth
                    </FieldLabel>
                    <div className="relative">
                      <Input
                        id="dateOfBirth"
                        name="dateOfBirth"
                        disabled
                        placeholder="00/00/0000"
                        className={cn(getInputClassName('default'), 'pr-12')}
                      />
                      <Calendar className="text-ink-40 pointer-events-none absolute top-1/2 right-4 size-4 -translate-y-1/2" />
                    </div>
                  </Field>
                </div>
                <Button
                  type="submit"
                  disabled={isSaving}
                  className="bg-primary text-primary-foreground hover:bg-primary-hover h-12 rounded-full px-5 py-3 text-base leading-6 font-medium"
                >
                  {isSaving ? 'Saving...' : 'Save'}
                </Button>
              </form>
            ) : (
              <div className="mt-2.5 flex flex-wrap items-center gap-x-16 gap-y-5">
                <ReadField
                  label="First name"
                  value={getFieldValue(profile.firstName)}
                />
                <ReadField
                  label="Last name"
                  value={getFieldValue(profile.lastName)}
                />
                <ReadField label="Date of birth" value="Not filled in" />
              </div>
            )}
          </section>

          <Separator className="bg-ink-10" />

          <section className="py-4">
            <SectionHeader
              title="Contact details"
              editing={editingContact}
              onToggle={() => {
                if (editingContact) resetEdits();
                setEditingContact((value) => !value);
              }}
            />

            {editingContact ? (
              <form
                className="mt-2.5 flex flex-col gap-5 xl:flex-row xl:items-end"
                onSubmit={(event) => {
                  event.preventDefault();
                  handleSave('contact');
                }}
              >
                <div className="grid flex-1 gap-5 md:grid-cols-2">
                  <Field data-invalid={Boolean(errors.phone)}>
                    <FieldLabel
                      htmlFor="phone"
                      className="text-ink-60 line-clamp-1 text-sm leading-5 font-normal"
                    >
                      Phone number
                    </FieldLabel>
                    <div
                      className={cn(
                        'bg-muted flex h-12 items-center gap-3 rounded-full px-4 py-3',
                        errors.phone ? 'ring-danger/40 ring-1' : '',
                      )}
                    >
                      <BelgiumPrefix />
                      <Separator
                        orientation="vertical"
                        className="bg-ink-10 h-6"
                      />
                      <Input
                        id="phone"
                        name="phone"
                        value={profile.phone}
                        aria-invalid={Boolean(errors.phone)}
                        className="text-ink h-auto flex-1 border-0 bg-transparent p-0 text-base leading-6 shadow-none focus-visible:ring-0 md:text-base"
                        onChange={handleInputChange}
                      />
                    </div>
                    <FieldError>{errors.phone}</FieldError>
                  </Field>
                  <ProfileInput
                    label="Email"
                    name="email"
                    type="email"
                    value={profile.email}
                    error={errors.email}
                    onChange={handleInputChange}
                  />
                </div>
                <Button
                  type="submit"
                  disabled={isSaving}
                  className="bg-primary text-primary-foreground hover:bg-primary-hover h-12 rounded-full px-5 py-3 text-base leading-6 font-medium"
                >
                  {isSaving ? 'Saving...' : 'Save'}
                </Button>
              </form>
            ) : (
              <div className="mt-2.5 flex flex-wrap items-center gap-x-16 gap-y-5">
                <ReadField
                  label="Phone"
                  value={getFieldValue(profile.phone ?? '')}
                />
                <ReadField label="Email" value={getFieldValue(profile.email)} />
              </div>
            )}
          </section>

          <Separator className="bg-ink-10" />

          <section className="py-5">
            <SectionHeader title="Delivery address" />
            <button
              type="button"
              className="bg-ink-05 text-ink hover:bg-ink-08 mt-2.5 flex h-20 w-full items-center justify-center gap-2 rounded-2xl pr-1 text-base leading-6 font-medium transition-colors"
            >
              <Plus className="size-5" />
              Add delivery methods for quick checkout use
            </button>
          </section>

          <Separator className="bg-ink-10" />

          <section className="py-5">
            <SectionHeader title="Security" />
            <div className="bg-ink-05 mt-2.5 flex flex-col gap-0.5 rounded-3xl">
              <button
                type="button"
                className="text-ink-80 hover:bg-ink-06 flex h-12 items-center gap-3 rounded-[20px] px-4 py-3 text-left text-base leading-6 font-medium transition-colors"
              >
                <Mail className="text-ink size-5" />
                Email preferences
              </button>
              <button
                type="button"
                className="text-ink-80 hover:bg-ink-06 flex h-12 items-center gap-3 rounded-[20px] px-4 py-3 text-left text-base leading-6 font-medium transition-colors"
              >
                <KeyRound className="text-ink size-5" />
                Change password
              </button>
            </div>
          </section>

          <section className="pt-10 pb-4">
            <SectionHeader title="Delete Account" />
            <Separator className="bg-ink-10 mt-2.5" />
            <p className="text-ink-70 mt-2 text-base leading-6 font-medium">
              Deleting your account will permanently remove your profile and all
              associated content.
              <br />
              This action cannot be reversed.
            </p>

            <Dialog>
              <DialogTrigger asChild>
                <Button
                  type="button"
                  className="bg-danger/10 text-danger hover:bg-danger/15 mt-8 h-12 rounded-full px-5 py-3 text-base leading-6 font-medium"
                >
                  Delete Account
                </Button>
              </DialogTrigger>
              <DialogContent className="rounded-3xl border-0 p-5 sm:max-w-md">
                <DialogHeader>
                  <DialogTitle className="text-2xl leading-8">
                    Delete Account
                  </DialogTitle>
                  <DialogDescription>
                    Confirm your email, password, and type DELETE to remove your
                    account permanently.
                  </DialogDescription>
                </DialogHeader>
                <form
                  className="flex flex-col gap-4"
                  onSubmit={handleDeleteSubmit}
                >
                  <FieldGroup className="gap-4">
                    <ProfileInput
                      label="Email"
                      name="email"
                      type="email"
                      error={deleteErrors.email}
                      placeholder={user.email}
                    />
                    <ProfileInput
                      label="Password"
                      name="password"
                      type="password"
                      error={deleteErrors.password}
                    />
                    <ProfileInput
                      label="Confirmation"
                      name="confirmation"
                      error={deleteErrors.confirmation}
                      placeholder="DELETE"
                    />
                    <FieldError>{deleteErrors.form}</FieldError>
                  </FieldGroup>
                  <DialogFooter className="m-0 border-0 bg-transparent p-0 sm:justify-between">
                    <DialogClose asChild>
                      <Button type="button" variant="pillMuted">
                        Cancel
                      </Button>
                    </DialogClose>
                    <Button
                      type="submit"
                      disabled={isDeleting}
                      className="bg-danger text-primary-foreground hover:bg-danger-dark rounded-full px-5"
                    >
                      <Trash2 data-icon="inline-start" />
                      {isDeleting ? 'Deleting...' : 'Delete Account'}
                    </Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>

            <FieldError className="mt-3">{errors.form}</FieldError>
          </section>
        </div>
      </div>
    </div>
  );
}
