# Calculator
### Task
- [Requirements](https://docs.google.com/document/d/1j8DnTnRSNoRBdYtKu3Rgk1STLso4X5Rev2-oEyxMsK8/)
- [Deployment](https://calculator-twentysixhugs.netlify.app/)

### How to run the app
1. Clone the repository on your local machine
2. Run `cd calculator` to move into the directory
3. Run `npm i` to install all dependencies
4. Switch to `dev` branch if you plan to perform modifications 
5. Run `npm start`. You'll see a new tab in the browser with the app running.

### Folder structure/Project information
- The project heavily utilizes the Command pattern for working with Calculator API. It helps abstract away operations logic. It decouples API from consumer modules, which allows to easily perform API modifications without having to rewrite consumer implementation. For instance, if you want to alter the `calculator.getOperand()` method, you'll need to change the implementation of `GetOperandCommand.ts`, but not the modules that actually call this method (I.e. the ones that render the expression to the DOM and need to know what the operand is). Apart from that, it allows you to chain several API calls which may be painful to change from the consumer.
- There's only one Calculator instance shared across the app, it should be used for performing all commands. It is exported from `Calculator.ts`.
- New commands that perform math operations should be added to `modules/dom/init/initOperations.ts`. If the goal is to add a new command, `initDoubleOperandOperation.ts` and `initImmediateOperation.ts` implementation should not be changed. Otherwise, open-closed principle is violated and bugs may arise. `initOperations.ts` is used exactly for adding new commands.
- New commands implementation should be saved in `commands` folder.
- New math functions (the ones that perform calculation, not the commands that abstract it) should be added to `math/` to facilitate testing and separate calculation logic from `Calculator.ts` logic.
- New DOM modules should be added to `dom/init/`, their name should start with `init`. If possible, these modules should be reusable. For example, `initDoubleOperandOperation.ts` is command-agnostic. It accepts a command as a parameter, and a DOM selector associated with it.
- New DOM selectors should be added to enums in `constants.ts`.
