export interface ApiResponse {
  success: boolean;
  message?: string;
  data?: {
    totalRows?: number;
    limit?: number;
    page?: number;
    rows?: object[] | object;
  };
}
