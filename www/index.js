import init, {initSync, greet} from "snake_game";
init().then(_ => {
    greet("Fabio");
    console.log("up and running");
})
