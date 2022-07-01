export function getErrorMessage(e: any): string {
  return e?.response?.data?.message ?? 'An Error Occured';
}
