import { Test, TestingModule } from "@nestjs/testing";
import { CreateBookService } from "./create-book.service";

describe("CreateBookService", () => {
  let service: CreateBookService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CreateBookService],
    }).compile();

    service = module.get<CreateBookService>(CreateBookService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
