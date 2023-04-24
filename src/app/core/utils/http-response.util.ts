import { HttpErrorResponse } from '@angular/common/http';

export function tryGetInnerError(errorRes: HttpErrorResponse): string {
  const { error } = errorRes;

  let errorMessage: string;

  if (error?.innerException) {
    const innerException = JSON.parse(error.innerException);

    errorMessage =
      innerException.ResponseBody.message || innerException.Message;
  } else {
    errorMessage = error?.message;
  }

  return errorMessage || '';
}
