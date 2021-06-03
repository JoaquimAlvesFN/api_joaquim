// import { BadRequestException, ConflictException, NotFoundException } from '@nestjs/common';
import { IOrder } from 'modules/database/interfaces/order';

import { OrderRepository } from '../repositories/order';
import { OrderService } from './order';

describe('Admin/OrderService', () => {
  let orderRepository: OrderRepository;
  let service: OrderService;

  const order: IOrder = {
    id: 1,
    description: 'Order Test',
    quantity: 10,
    price: 8
  };

  beforeEach(async () => {
    orderRepository = new OrderRepository();
    service = new OrderService(orderRepository);
  });

  it('should create a order', async () => {
    jest.spyOn(orderRepository, 'insert').mockImplementationOnce(order => Promise.resolve({ ...order } as any));

    const result = await service.save(order);

    expect(result).not.toBeFalsy();
    expect(result).toEqual(order);
  });

  it('should list orders with pagination', async () => {
    jest.spyOn(orderRepository, 'insert').mockImplementationOnce(order => Promise.resolve({ ...order } as any));
    jest.spyOn(orderRepository, 'list').mockResolvedValueOnce({ isSysAdmin: () => false } as any);

    const result = await service.save(order);

    expect(result).not.toBeFalsy();
    expect(result).toEqual(order);
  });

  it('should list order by id', async () => {
    jest.spyOn(orderRepository, 'insert').mockImplementationOnce(order => Promise.resolve({ ...order } as any));
    jest.spyOn(orderRepository, 'findById').mockResolvedValueOnce({ isSysAdmin: () => false } as any);

    const result = await service.save(order);

    expect(result).not.toBeFalsy();
    expect(result).toEqual({ id: 1, ...order });
  });
});
