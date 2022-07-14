import { Test, TestingModule } from "@nestjs/testing";
import { CreateBookController } from "./create-book.controller";

describe("CreateBookController", () => {
  let controller: CreateBookController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CreateBookController],
    }).compile();

    controller = module.get<CreateBookController>(CreateBookController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});
