import { ApiResponse } from '@/interfaces/apitResponse';

class BaseController {
  protected response(success: boolean, message?: string, rows?: object[] | object, totalRows?: number, limit?: number, page?: number): ApiResponse {
    const data: ApiResponse = {
      success: success,
      message: message,
      data: {
        totalRows: totalRows,
        limit: limit,
        page: page,
        rows: rows,
      },
    };

    return data;
  }
}
export default BaseController;
