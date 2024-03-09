export type Validator<FormType = unknown> = {
  [Key in keyof FormType]?: (value: FormType[Key]) => boolean | string;
};
