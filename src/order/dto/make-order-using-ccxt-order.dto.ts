import { OrderSideEnum, OrderStatusEnum, OrderTypeEnum } from '@prisma/client';
import { getTickerSymbols } from 'src/order/common/utils';
import { CreateOrderDto } from 'src/order/dto';

/**
 * Prepare an Order DTO using a ccxt order object
 *
 * @param userId
 * @param accessKey
 * @param ccxtOrder
 * @returns
 */
export const makeOrderDtoUsingCcxtOrder = (
  userId: number,
  accessKeyId: number,
  ccxtOrder,
): CreateOrderDto => {
  const { base, quote, currency } = getTickerSymbols(ccxtOrder.symbol);

  return {
    orderId: ccxtOrder.id,
    timestamp: ccxtOrder.timestamp,
    datetime: ccxtOrder.datetime,
    status: OrderStatusEnum[ccxtOrder.status.toUpperCase()],
    symbol: ccxtOrder.symbol,
    base,
    quote,
    currency,
    type: OrderTypeEnum[ccxtOrder.type.toUpperCase()],
    side: OrderSideEnum[ccxtOrder.side.toUpperCase()],
    price: ccxtOrder.price,
    filled: ccxtOrder.filled || ccxtOrder.amount,
    cost: ccxtOrder.cost,
    fee: ccxtOrder.fee.cost,
    accessKeyId: accessKeyId,
    userId,
    rawData: ccxtOrder,
  };
};
