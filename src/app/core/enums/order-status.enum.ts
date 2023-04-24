export enum OrderStatus {
  /** Mới tạo */
  new = 'New',
  /** Kế hoạch */
  planing = 'Planing',
  /** Đã lập chuyến */
  planingComplete = 'PlaningComplete',
  /** Đang vận chuyển */
  transfer = 'Transfer',
  /** Đã giao hàng */
  received = 'Received',

  /** Đã nhận chứng từ */
  invoicePart = 'InvoicePart',
  /** Đã nhận chứng từ */
  invoiceComplete = 'InvoiceComplete',
  /**
   * Đã nhận chứng từ
   * This is FE definition - NOT DEFINED IN BE,
   * It could be used to stand for `invoicePart` and `invoiceComplete`
   * when we need to rendering them to FE, because they belong to one group.
   */
  invoice = 'Invoice',

  /** Hủy */
  closed = 'Closed',
  /** Trả về */
  open = 'Open',

  /** @deprecated */
  request = 'Request',
  /** @deprecated */
  closePart = 'ClosePart',
}

export const isOrderStatusInvoice = (v: any) =>
  v === OrderStatus.invoice ||
  v === OrderStatus.invoiceComplete ||
  v === OrderStatus.invoicePart;
