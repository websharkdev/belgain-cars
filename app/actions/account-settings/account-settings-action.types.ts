import { type ChangePasswordValues } from '@/features/dashboard/account-settings/account-settings.schema';
import { type DeleteAccountValues } from '@/schemas/delete-account.schema';

export type ActionResult = {
  error?: string;
  imageUrl?: string;
  success?: true;
};

export type UpdateUserBody = {
  lastName: string;
  name: string;
};

export interface EncodedChangePasswordValues extends Omit<
  ChangePasswordValues,
  'currentPassword' | 'newPassword' | 'confirmPassword'
> {
  confirmPassword?: string;
  currentPassword?: string;
  newPassword?: string;
}

export interface EncodedDeleteAccountValues extends Omit<
  DeleteAccountValues,
  'confirmation' | 'password'
> {
  confirmation?: string;
  password?: string;
}
