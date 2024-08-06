import { screen } from "@testing-library/dom";
import { render } from "@testing-library/react";
import App from "./App.tsx";

describe('App', function () {
    it('all ok', async () => {
        await render(
            <App />
        )
        expect(screen.getByText("Vite + React"))
    });
});
