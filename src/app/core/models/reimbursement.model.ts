import { PlatformCode } from '../enums';

export interface ReimbursementModel {
  platformCode: PlatformCode;
  bookingId: string;
  shipmentId: string;
  createdDate: Date;
  verifyReimbursementsLink: string;
}
