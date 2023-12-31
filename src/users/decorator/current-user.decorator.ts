import { createParamDecorator, ExecutionContext, Session } from '@nestjs/common';

export const CurrentUser = createParamDecorator(
  (data: never, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();
    
    return request.currentUser;
  },
);
