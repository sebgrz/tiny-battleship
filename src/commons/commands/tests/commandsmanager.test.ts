import { ICommand } from "../command";
import { ICommandHandler } from "../commandhandler"
import { CommandsManager } from "../commands-manager"

class TestCommand implements ICommand {
    type = "TestCommand";
}

class NewTestCommand implements ICommand {
    type = "NewTestCommand";
}

class TestCommandHandler implements ICommandHandler<TestCommand> {
    execute = async (command: TestCommand) => {
        commandHandlerResult = `call by ${command.type}`
    };
}

var commandHandlerResult = ""

test("register TestCommandHandler for TestCommand type in CommandsManager", () => {
    let manager = new CommandsManager()
    manager.register(TestCommand, TestCommandHandler)
    expect(manager.maps.size).toEqual(1)
    expect(manager.maps.get("TestCommand")).not.toBeUndefined()
});

test("resolve and execute in CommandsManager previous registered TestCommandHandler", async () => {
    let manager = new CommandsManager()
    manager.register(TestCommand, TestCommandHandler)

    await manager.execute(new TestCommand())

    expect(commandHandlerResult).toBe("call by TestCommand")
})

test("cannot resolve not registerd command in CommandsManager", async () => {
    let manager = new CommandsManager()
    manager.register(TestCommand, TestCommandHandler)

    try {
        await manager.execute(new NewTestCommand())
    } catch (e) {
        expect(e.message).toEqual("commandhandler for type NewTestCommand doesn't exist")
    }
})