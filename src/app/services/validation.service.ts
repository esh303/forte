export class ValidationService {

    static getValidatorErrorMessage(validatorName: string, validatorValue?: any) {
      const config:any = {
        'required': 'Required',
        'invalidEmailAddress': '(Invalid email address)',
        'minlength': `(Minimum length ${validatorValue.requiredLength})`,
        'maxlength': `(Maximum length ${validatorValue.requiredLength})`
      };
      return config[validatorName];
    }
}


