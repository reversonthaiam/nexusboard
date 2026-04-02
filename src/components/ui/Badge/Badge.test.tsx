import { render, screen } from "@testing-library/react";
import { Badge } from "./Badge";

describe("Badge", () => {
  it("renderiza o badge corretamente", () => {
    render(<Badge variant="todo">texto aqui</Badge>)
    expect(screen.getByText("texto aqui")).toBeInTheDocument();
  });

  it('aplica cor para todos', () => {
    render(<Badge variant="todo">texto aqui</Badge>)
    const btn = screen.getByText('texto aqui')
    expect(btn.className).toContain('bg-[#f5e6ef]')
  })
});
