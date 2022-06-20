export interface ICommand {
  execute(): void;
  success?: boolean;
}
