'use server';

import { changePasswordAction as changePassword } from './account-settings/change-password.action';
import { deleteAccountAction as deleteAccount } from './account-settings/delete-account.action';
import { updateProfileAction as updateProfile } from './account-settings/update-profile.action';
import { updatePersonalInfoAction as updatePersonalInfo } from './account-settings/update-personal-info.action';
import { uploadAvatarAction as uploadAvatar } from './account-settings/upload-avatar.action';

export const changePasswordAction = async (
  ...args: Parameters<typeof changePassword>
) => changePassword(...args);

export const deleteAccountAction = async (
  ...args: Parameters<typeof deleteAccount>
) => deleteAccount(...args);

export const updatePersonalInfoAction = async (
  ...args: Parameters<typeof updatePersonalInfo>
) => updatePersonalInfo(...args);

export const updateProfileAction = async (
  ...args: Parameters<typeof updateProfile>
) => updateProfile(...args);

export const uploadAvatarAction = async (
  ...args: Parameters<typeof uploadAvatar>
) => uploadAvatar(...args);
