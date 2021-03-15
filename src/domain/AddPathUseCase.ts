import { Path } from "./model /Path";
import { AddPathRepository } from "./repository/AddPathRepository";

export class AddPathUseCase {
  constructor(private readonly addPathRepository: AddPathRepository) {}

  async execute(path: Path): Promise<void> {
    await this.addPathRepository.add(path);
  }
}
