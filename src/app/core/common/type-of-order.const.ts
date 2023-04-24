import { TypeOfOrder } from '../enums';

export const TypeOfOrders = [
  { code: [TypeOfOrder.direct], name: 'Direct' },
  { code: [TypeOfOrder.urgent], name: 'Urgent' },
  { code: [TypeOfOrder.return], name: 'Return' },
  { code: [TypeOfOrder.returnUrgent], name: 'ReturnUrgent' },
  { code: [TypeOfOrder.both], name: 'Both' },
];
