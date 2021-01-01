import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const User = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return {name: "Md. Masud", role: ['admin', 'manager'], designation: 'Senior Software Engineer'};
  },
);