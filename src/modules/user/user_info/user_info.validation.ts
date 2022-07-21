import { JSONSchemaType } from 'ajv';
import { RegisterAccount } from './user_info.interface';

export const UserValidation = {
  register: {
    body: {
      type: 'object',
      properties: {
        userName: {
          type: 'string',
          minLength: 5,
          errorMessage: {
            type: 'mustString',
            minLength: 'min length',
          },
        },
        password: { type: 'string' },
      },
      required: ['email', 'password'],
      additionalProperties: false,
      errorMessage: {
        required: {
          email: 'emailIsRequired',
          password: 'passwordIsRequired',
        },
      },
    } as JSONSchemaType<RegisterAccount>,
  },
};
