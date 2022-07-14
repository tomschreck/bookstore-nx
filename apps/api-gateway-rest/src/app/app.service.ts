import { Inject, Injectable } from "@nestjs/common";
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class AppService {

  constructor(
    @Inject('ADMIN_PORTAL_MICROSERVICE') private readonly client: ClientProxy
  ) { }

  getData(): { message: string } {
    return { message: "Welcome to api-gateway-rest!" };
  }

  createBook(createBookDto) {
    return this.client.send({ role: 'book', cmd: 'create' }, createBookDto);
  }
}
