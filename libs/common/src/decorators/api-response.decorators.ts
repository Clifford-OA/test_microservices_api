/* eslint-disable @typescript-eslint/ban-types */
import { applyDecorators } from '@nestjs/common';
import {
  ApiExtraModels,
  ApiResponse,
  ApiResponseOptions,
  getSchemaPath,
} from '@nestjs/swagger';

export class ResponseDto<T> {
    success: boolean;
    result?: T;
    error: ErrorDto | null;
  }

  export class ErrorDto {
    code: number;
    message: string;
  }

export const ApiSuccessResponse = (
  type: Function,
  status = 200,
  options?: ApiResponseOptions,
) => {
  return applyDecorators(
    ApiExtraModels(type),
    ApiResponse({
      status,
      description: 'Success',
      ...options,
      schema: {
        type: 'object',
        properties: {
          success: { type: 'boolean', example: true },
          result: { $ref: getSchemaPath(type) },
        },
      },
    }),
  );
};

export const ApiPagedResponse = (
  queryType: Function,
  responseType: Function,
  status = 200,
  options?: ApiResponseOptions,
) => {
  return applyDecorators(
    ApiExtraModels(queryType, responseType),
    // ApiQuery({
    //   type: queryType,
    // }),
    ApiResponse({
      status,
      description: 'Success',
      ...options,
      schema: {
        type: 'object',
        properties: {
          success: { type: 'boolean', example: true },
          result: {
            type: 'object',
            properties: {
              items: {
                type: 'array',
                items: { $ref: getSchemaPath(responseType) },
              },
              totalCount: { type: 'number' },
            },
          },
        },
      },
    }),
  );
};

export const ApiEmptyResponse = (status = 201) =>
  ApiResponse({
    status,
    description: 'Success',
    schema: {
      type: 'object',
      properties: {
        success: { type: 'boolean', example: true },
      },
    },
  });

export interface ApiErrorResponseOptions {
  status?: number;
  description?: string;
  message?: string;
  messages?: Record<string, string>;
}

export const ApiErrorResponse = (options?: ApiErrorResponseOptions) => {
  // eslint-disable-next-line prefer-const
  let status = options?.status || 400;
  let examples: Record<string, { value: ResponseDto<any> }>;

  if (options?.messages) {
    examples = {};
    for (const key in options.messages) {
      examples[key] = {
        value: {
          success: false,
          error: {
            code: status,
            message: options.messages[key],
          },
        },
      };
    }
  }

  return ApiResponse({
    status,
    description: options?.description ?? 'Bad Request',
    content: {
      'application/json': {
        schema: {
          type: 'object',
          properties: {
            success: { type: 'boolean', example: false },
            error: {
              type: 'object',
              properties: {
                code: { type: 'number', example: status },
                message: {
                  type: 'string',
                  example: options?.message,
                },
              },
            },
          },
        },
        examples,
      },
    },
  } as any);
};

export const ApiNotFoundErrorResponse = () =>
  ApiErrorResponse({
    status: 404,
    description: 'Not Found',
    message: 'Not Found',
  });
