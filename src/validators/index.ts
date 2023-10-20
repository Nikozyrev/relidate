export const required = (v: unknown) => !!v;

export const minLength = (length: number) => (v: string) => v.length >= length;

export const maxLength = (length: number) => (v: string) => v.length <= length;
