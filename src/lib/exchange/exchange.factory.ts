import { ExchangeNameEnum } from '@prisma/client';
import { BinanceExchange } from 'src/lib/exchange/binance-exchange';
import { BitstampExchange } from 'src/lib/exchange/bitstamp-exchange';
import { GetExchangeDto } from 'src/lib/exchange/dto';
import { KrakenExchange } from 'src/lib/exchange/kraken-exchange';
import { CryptoExchange } from 'src/lib/exchange/types';

const exchangeClasses = {
  [ExchangeNameEnum.KRAKEN]: KrakenExchange,
  [ExchangeNameEnum.BINANCE]: BinanceExchange,
  [ExchangeNameEnum.BITSTAMP]: BitstampExchange,
};
export class ExchangeFactory {
  static create(exchangeDto: GetExchangeDto): CryptoExchange {
    const ExchangeClass = exchangeClasses[exchangeDto.exchange];
    const exchange = new ExchangeClass(exchangeDto);

    switch (exchangeDto.exchange) {
      case ExchangeNameEnum.KRAKEN:
        return exchange as KrakenExchange;
      case ExchangeNameEnum.BINANCE:
        return exchange as BinanceExchange;
      case ExchangeNameEnum.BITSTAMP:
        return exchange as BitstampExchange;
    }
  }
}
