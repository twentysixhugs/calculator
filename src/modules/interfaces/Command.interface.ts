export interface ICommand {
  execute(): void;
  result?: unknown;
}
