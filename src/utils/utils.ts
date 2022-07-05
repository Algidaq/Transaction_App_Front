import * as React from 'react';
export function getErrorMessage(e: any): string {
  return e?.response?.data?.message ?? 'An Error Occured';
}

export const pageStyle: React.CSSProperties = {
  backgroundColor: 'white',
  margin: '8px 0px',
  borderRadius: '8px',
  padding: '0px 16px',
};

export function isNumOnly(value: string): boolean {
  return /^\d+$/.test(value);
}

export const required = 'اسم الحقل مطلوب';
export const invalid = ' الحقل غير صحيح';
