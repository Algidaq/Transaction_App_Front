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
