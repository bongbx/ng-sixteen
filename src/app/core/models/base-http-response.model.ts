export interface BaseHttpResponse<T> {
  is_success: boolean;
  error_message: string;
  data?: T;
}
