import {
  ValidationArguments,
  ValidationOptions,
  registerDecorator,
} from 'class-validator';

export const IsPhone = (validationOptions?: ValidationOptions) => {
  return (object: Object, propertyName: string) =>
    registerDecorator({
      name: 'IsPhone',
      target: object.constructor,
      propertyName,
      options: validationOptions,
      validator: {
        validate(value: string, args: ValidationArguments) {
          return value.length === 10 && value.startsWith('0');
        },
      },
    });
};
