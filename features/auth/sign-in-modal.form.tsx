'use client';

import * as React from 'react';
import { User, X } from 'lucide-react';
import { useRouter } from '@/i18n/routing';
import { signInAction } from '@/app/actions/auth/sign-in.action';
import { signUpAction } from '@/app/actions/auth/sign-up.action';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
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
import { SeparatorWithText } from '@/components/ui/separator-with-text';
import { AUTH_PASSWORD_MIN_LENGTH } from '@/features/auth/auth.constants';
import { getAuthInputClassName } from '@/features/auth/components/auth-input.variants';
import { PasswordInput } from '@/features/auth/components/password-input';
import {
  FacebookIcon,
  GoogleIcon,
} from '@/features/auth/components/social-auth-icons';
import type {
  AccountType,
  AuthMode,
  SignInFormErrors,
  SignUpFormErrors,
} from '@/features/auth/auth.types';
import { encodePasswordForAction } from '@/lib/password.lib';
import { cn } from '@/lib/utils';
import { signInActionSchema, signUpActionSchema } from '@/schemas/auth.schema';

const authDialogVariants = {
  mode: {
    'sign-in': 'h-[696px]',
    'sign-up': 'h-[645px]',
  },
};

const accountTypeTabVariants = {
  state: {
    active: 'bg-background text-ink shadow-[0_1px_2px_rgba(2,10,21,0.04)]',
    inactive:
      'bg-transparent text-ink-60 hover:bg-background/50 hover:text-ink',
  },
};

type AccountTypeTabState = keyof typeof accountTypeTabVariants.state;

function getAccountTypeTabClassName(state: AccountTypeTabState) {
  return cn(
    'h-10 flex-1 rounded-full px-5 py-2 text-base leading-6 font-medium transition-colors hover:shadow-none',
    accountTypeTabVariants.state[state],
  );
}

interface SignInModalFormProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  onSuccess?: () => void;
  trigger?: React.ReactNode;
}

export function SignInModalForm({
  open: controlledOpen,
  onOpenChange,
  onSuccess,
  trigger,
}: SignInModalFormProps = {}) {
  const router = useRouter();
  const [uncontrolledOpen, setUncontrolledOpen] = React.useState(false);
  const open = controlledOpen ?? uncontrolledOpen;
  const setOpen = onOpenChange ?? setUncontrolledOpen;
  const [mode, setMode] = React.useState<AuthMode>('sign-in');
  const [accountType, setAccountType] = React.useState<AccountType>('person');
  const [showPassword, setShowPassword] = React.useState(false);
  const [rememberMe, setRememberMe] = React.useState(false);
  const [signInErrors, setSignInErrors] = React.useState<SignInFormErrors>({});
  const [signUpErrors, setSignUpErrors] = React.useState<SignUpFormErrors>({});
  const [isPending, startTransition] = React.useTransition();

  const resetFormState = () => {
    setSignInErrors({});
    setSignUpErrors({});
    setShowPassword(false);
    setRememberMe(false);
  };

  const switchMode = (nextMode: AuthMode) => {
    resetFormState();
    setMode(nextMode);
  };

  const handleSignInSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);
    const rawValues = {
      email: String(formData.get('email') ?? ''),
      password: String(formData.get('password') ?? ''),
    };
    const parsed = signInActionSchema.safeParse({
      email: rawValues.email,
      password: encodePasswordForAction(rawValues.password),
    });

    if (!parsed.success) {
      const fieldErrors = parsed.error.flatten().fieldErrors;

      setSignInErrors({
        email: fieldErrors.email?.[0],
        password: fieldErrors.password?.[0],
      });
      return;
    }

    setSignInErrors({});

    startTransition(async () => {
      const result = await signInAction(parsed.data);

      if (result.error) {
        setSignInErrors({ form: result.error });
        return;
      }

      form.reset();
      resetFormState();
      setOpen(false);
      onSuccess?.();
      router.refresh();
    });
  };

  const handleSignUpSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);
    const role = 'user';
    const rawValues = {
      firstName: String(formData.get('firstName') ?? ''),
      lastName: String(formData.get('lastName') ?? ''),
      email: String(formData.get('email') ?? ''),
      password: String(formData.get('password') ?? ''),
      companyName: '',
    };
    const parsed = signUpActionSchema.safeParse({
      ...rawValues,
      password: encodePasswordForAction(rawValues.password),
    });

    if (!parsed.success) {
      const fieldErrors = parsed.error.flatten().fieldErrors;

      setSignUpErrors({
        firstName: fieldErrors.firstName?.[0],
        lastName: fieldErrors.lastName?.[0],
        email: fieldErrors.email?.[0],
        password: fieldErrors.password?.[0],
      });
      return;
    }

    setSignUpErrors({});

    startTransition(async () => {
      const result = await signUpAction(parsed.data, role);

      if (result.error) {
        setSignUpErrors({ [result.field ?? 'form']: result.error });
        return;
      }

      form.reset();
      resetFormState();
      setOpen(false);
      onSuccess?.();
      router.refresh();
    });
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(nextOpen) => {
        setOpen(nextOpen);
        if (!nextOpen) {
          resetFormState();
          setMode('sign-in');
          setAccountType('person');
        }
      }}
    >
      {trigger !== null ? (
        <DialogTrigger asChild>
          {trigger ?? (
            <Button
              type="button"
              variant="pillMuted"
              className="px-5"
              aria-label="Sign in to your account"
            >
              <User
                data-icon="inline-start"
                className="text-ink"
                strokeWidth={1.5}
              />
              <span className="text-ink pb-px text-sm leading-5 font-normal">
                Sign In
              </span>
            </Button>
          )}
        </DialogTrigger>
      ) : null}

      <DialogContent
        showCloseButton={false}
        className={cn(
          'bg-background text-ink flex max-h-[calc(100svh-2rem)] w-[calc(100%-2rem)] max-w-[506px] flex-col gap-0 overflow-hidden rounded-[20px] border-0 p-0 shadow-[0_24px_70px_rgba(2,10,21,0.18)] ring-0 sm:max-w-[506px]',
          authDialogVariants.mode[mode],
        )}
      >
        <DialogClose asChild>
          <Button
            type="button"
            variant="pillMuted"
            size="icon"
            className="bg-muted hover:bg-ink-06 absolute top-5 right-5 size-12"
            aria-label="Close sign in dialog"
          >
            <X className="text-ink" strokeWidth={1.5} />
          </Button>
        </DialogClose>

        {mode === 'sign-in' ? (
          <>
            <DialogTitle className="px-5 pt-[84px] text-center text-3xl leading-[1.2] font-medium">
              Sign in to your account
            </DialogTitle>
            <DialogDescription className="sr-only">
              Enter your email and password to sign in to your account.
            </DialogDescription>

            <div className="flex min-h-0 flex-1 flex-col overflow-y-auto px-5 pt-[34px]">
              <form
                className="flex flex-col gap-5"
                onSubmit={handleSignInSubmit}
              >
                <FieldGroup className="gap-10">
                  <FieldGroup className="gap-4">
                    <Field data-invalid={Boolean(signInErrors.email)}>
                      <FieldLabel
                        htmlFor="sign-in-email"
                        className="text-ink-60 line-clamp-1 text-sm leading-5 font-normal"
                      >
                        Email
                      </FieldLabel>
                      <Input
                        id="sign-in-email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        placeholder="example@gmail.com"
                        aria-invalid={Boolean(signInErrors.email)}
                        className={getAuthInputClassName(
                          signInErrors.email ? 'error' : 'default',
                        )}
                      />
                      <FieldError>{signInErrors.email}</FieldError>
                    </Field>

                    <FieldGroup className="gap-3">
                      <Field data-invalid={Boolean(signInErrors.password)}>
                        <FieldLabel
                          htmlFor="sign-in-password"
                          className="text-ink-60 line-clamp-1 text-sm leading-5 font-normal"
                        >
                          Password
                        </FieldLabel>
                        <PasswordInput
                          id="sign-in-password"
                          name="password"
                          shown={showPassword}
                          onShownChange={setShowPassword}
                          autoComplete="current-password"
                          minLength={AUTH_PASSWORD_MIN_LENGTH}
                          placeholder="•••••••••••"
                          aria-invalid={Boolean(signInErrors.password)}
                          className={getAuthInputClassName(
                            signInErrors.password ? 'error' : 'default',
                          )}
                        />
                        <FieldError>{signInErrors.password}</FieldError>
                      </Field>

                      <div className="flex items-start justify-between gap-4">
                        <Field
                          orientation="horizontal"
                          className="w-auto gap-2"
                        >
                          <Checkbox
                            id="remember-me"
                            checked={rememberMe}
                            onCheckedChange={(checked) =>
                              setRememberMe(checked === true)
                            }
                            className="border-ink-10 bg-background data-checked:border-primary data-checked:bg-primary size-5 rounded-sm"
                          />
                          <FieldLabel
                            htmlFor="remember-me"
                            className="text-ink-70 text-sm leading-5 font-normal"
                          >
                            Remember me
                          </FieldLabel>
                        </Field>

                        <Button
                          type="button"
                          variant="link"
                          size="auto"
                          className="text-primary hover:text-primary-hover h-auto p-0 text-sm leading-5 font-medium underline-offset-4"
                        >
                          Forgot password?
                        </Button>
                      </div>
                    </FieldGroup>
                  </FieldGroup>

                  <FieldGroup className="gap-2">
                    <Button
                      type="submit"
                      disabled={isPending}
                      className="bg-primary text-primary-foreground hover:bg-primary-hover disabled:bg-primary/5 disabled:text-ink-40 h-12 w-full rounded-full px-5 py-3 text-base leading-6 font-medium disabled:opacity-100"
                    >
                      {isPending ? 'Signing in...' : 'Sign in'}
                    </Button>
                    <FieldError>{signInErrors.form}</FieldError>
                  </FieldGroup>
                </FieldGroup>
              </form>

              <SeparatorWithText>or</SeparatorWithText>

              <div className="flex flex-col gap-3">
                <Button
                  type="button"
                  variant="pillMuted"
                  className="bg-muted text-ink hover:bg-ink-06 h-12 w-full gap-3 px-5 py-3 text-base leading-6 font-medium"
                >
                  <GoogleIcon className="size-5" />
                  Sign in with Google
                </Button>
                <Button
                  type="button"
                  variant="pillMuted"
                  className="bg-muted text-ink hover:bg-ink-06 h-12 w-full gap-3 px-5 py-3 text-base leading-6 font-medium"
                >
                  <FacebookIcon className="size-5" />
                  Sign in with Facebook
                </Button>
              </div>
            </div>

            <div className="flex justify-center gap-1 px-5 py-4">
              <span className="text-ink-40 text-base leading-6 font-normal">
                Don&apos;t have an account?
              </span>
              <Button
                type="button"
                variant="link"
                size="auto"
                className="text-primary hover:text-primary-hover h-auto p-0 text-base leading-6 font-medium underline"
                onClick={() => switchMode('sign-up')}
              >
                Sign up
              </Button>
            </div>
          </>
        ) : (
          <>
            <DialogTitle className="px-5 pt-[55px] text-center text-3xl leading-[1.2] font-medium">
              Create an account
            </DialogTitle>
            <DialogDescription className="text-ink-60 mt-1 text-center text-sm leading-5 font-normal">
              Choose your account type to get started
            </DialogDescription>

            <div
              className="bg-muted mx-5 mt-[19px] flex rounded-full p-1"
              role="tablist"
              aria-label="Account type"
            >
              <Button
                type="button"
                variant="ghost"
                className={getAccountTypeTabClassName(
                  accountType === 'person' ? 'active' : 'inactive',
                )}
                role="tab"
                aria-selected={accountType === 'person'}
                onClick={() => setAccountType('person')}
              >
                Person
              </Button>
              <Button
                type="button"
                variant="ghost"
                className={getAccountTypeTabClassName(
                  accountType === 'business' ? 'active' : 'inactive',
                )}
                role="tab"
                aria-selected={accountType === 'business'}
                onClick={() => setAccountType('business')}
              >
                Business
              </Button>
            </div>

            <div className="flex min-h-0 flex-1 flex-col overflow-y-auto px-5 pt-[22px]">
              <form
                className="flex flex-col gap-10"
                onSubmit={handleSignUpSubmit}
              >
                <FieldGroup className="gap-4">
                  <div className="grid grid-cols-2 gap-4">
                    <Field data-invalid={Boolean(signUpErrors.firstName)}>
                      <FieldLabel
                        htmlFor="sign-up-first-name"
                        className="text-ink-60 line-clamp-1 text-sm leading-5 font-normal"
                      >
                        First name
                      </FieldLabel>
                      <Input
                        id="sign-up-first-name"
                        name="firstName"
                        autoComplete="given-name"
                        placeholder="John"
                        aria-invalid={Boolean(signUpErrors.firstName)}
                        className={getAuthInputClassName(
                          signUpErrors.firstName ? 'error' : 'default',
                        )}
                      />
                      <FieldError>{signUpErrors.firstName}</FieldError>
                    </Field>

                    <Field data-invalid={Boolean(signUpErrors.lastName)}>
                      <FieldLabel
                        htmlFor="sign-up-last-name"
                        className="text-ink-60 line-clamp-1 text-sm leading-5 font-normal"
                      >
                        Last name
                      </FieldLabel>
                      <Input
                        id="sign-up-last-name"
                        name="lastName"
                        autoComplete="family-name"
                        placeholder="Turner"
                        aria-invalid={Boolean(signUpErrors.lastName)}
                        className={getAuthInputClassName(
                          signUpErrors.lastName ? 'error' : 'default',
                        )}
                      />
                      <FieldError>{signUpErrors.lastName}</FieldError>
                    </Field>
                  </div>

                  <Field data-invalid={Boolean(signUpErrors.email)}>
                    <FieldLabel
                      htmlFor="sign-up-email"
                      className="text-ink-60 line-clamp-1 text-sm leading-5 font-normal"
                    >
                      Email
                    </FieldLabel>
                    <Input
                      id="sign-up-email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      placeholder="john.turner@gmail.com"
                      aria-invalid={Boolean(signUpErrors.email)}
                      className={getAuthInputClassName(
                        signUpErrors.email ? 'error' : 'default',
                      )}
                    />
                    <FieldError>{signUpErrors.email}</FieldError>
                  </Field>

                  <Field data-invalid={Boolean(signUpErrors.password)}>
                    <FieldLabel
                      htmlFor="sign-up-password"
                      className="text-ink-60 line-clamp-1 text-sm leading-5 font-normal"
                    >
                      Password
                    </FieldLabel>
                    <PasswordInput
                      id="sign-up-password"
                      name="password"
                      shown={showPassword}
                      onShownChange={setShowPassword}
                      autoComplete="new-password"
                      minLength={AUTH_PASSWORD_MIN_LENGTH}
                      placeholder="•••••••••••"
                      aria-invalid={Boolean(signUpErrors.password)}
                      className={getAuthInputClassName(
                        signUpErrors.password ? 'error' : 'default',
                      )}
                    />
                    <FieldError>{signUpErrors.password}</FieldError>
                  </Field>
                </FieldGroup>

                <FieldGroup className="gap-2">
                  <Button
                    type="submit"
                    disabled={isPending}
                    className="bg-primary text-primary-foreground hover:bg-primary-hover disabled:bg-primary/5 disabled:text-ink-40 h-12 w-full rounded-full px-5 py-3 text-base leading-6 font-medium disabled:opacity-100"
                  >
                    {isPending ? 'Creating account...' : 'Create an account'}
                  </Button>
                  <FieldError>{signUpErrors.form}</FieldError>
                </FieldGroup>
              </form>
            </div>

            <div className="flex justify-center gap-1 px-5 py-4">
              <span className="text-ink-40 text-base leading-6 font-normal">
                Already have an account?
              </span>
              <Button
                type="button"
                variant="link"
                size="auto"
                className="text-primary hover:text-primary-hover h-auto p-0 text-base leading-6 font-medium underline"
                onClick={() => switchMode('sign-in')}
              >
                Sign in
              </Button>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
