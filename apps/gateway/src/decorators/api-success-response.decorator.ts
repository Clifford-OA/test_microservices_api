import { applyDecorators } from "@nestjs/common";
import { ApiCreatedResponse, ApiExtraModels, ApiResponse, getSchemaPath } from "@nestjs/swagger";


export const ApiSuccessResponse = (type: Function, status = 200) => {
    return applyDecorators(
        ApiExtraModels(type),
        ApiResponse({
            status,
            schema: {
                type: "object",
                properties: {
                    status: { type: "string" },
                    result: { $ref: getSchemaPath(type) }
                }
            }
        })
    )
};
