import { loans } from "@prisma/client";

export interface LoansPaginatedResponse {
  data: loans[];
  total: number;
}
