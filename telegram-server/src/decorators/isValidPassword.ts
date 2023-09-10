import {
  ValidationArguments,
  ValidationOptions,
  registerDecorator,
} from 'class-validator';

export const IsValidPassword = (
  property: string,
  validationOptions?: ValidationOptions,
) => {
  return (object: Object, propertyName: string) => {
    registerDecorator({
      name: 'isValidPassword',
      target: object.constructor,
      propertyName,
      constraints: [property],
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          const [relatedPropertyName] = args.constraints;
          const relatedValue = (args.object as any)[relatedPropertyName];
          return (
            typeof value === 'string' &&
            typeof relatedValue === 'string' &&
            value === relatedValue
          );
        },
      },
    });
  };
};
