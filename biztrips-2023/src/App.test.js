import {logRoles, render, screen} from "@testing-library/react";
import App from "./App";
//import useFetch from "./services/useFetch";
//import {getBusinessTrips} from "./services/tripsService";
/*it("ret without crashing", () => {
  shallow(<App />);
});*/

/*it("renders Account header", () => {
  const wrapper = shallow(<App />);
  const welcome = <h1>Welcome to biztrips</h1>;
  expect(wrapper.contains(welcome)).toEqual(true);
});*/

/*test('App renders a heading', () => {
  render(<App />)

  screen.getByRole('heading', {
    name: "Welcome to biztrips 2024 - Juhui",
  })

});*/

/*describe("SearchForm", () => {
  test("renders SearchForm", () => {
    render(<renderTrip/>);
    expect(screen.getByRole("heading", { name: /location search/i })
    ).toBeVisible();

    expect(screen.getByRole("textbox", { name: /choose an origin \(optional\)/i })
    ).toBeVisible();

    expect(screen.getByRole("textbox", { name: /choose a destination/i})
    ).toBeVisible();

    expect(screen.getByRole("button", { name: /search/i })
    ).toBeVisible();
  });
});*/
//
// test('the fetch fails with an error', async () => {
//   await expect(getBusinessTrips()).rejects.toMatch('error');
// });

// test('the data is peanut butter', async () => {
//   await expect(getBusinessTrips()).resolves.toContain('San Francisco World Trade Center on new Server/IOT/Client ');
// });

//
// test('the data is peanut butter', async () => {
//   await expect(useFetch()).resolves.toBe('peanut butter');
// });

//----
const sum = function sum(a, b) {
  return a + b;
};
test("adds 1 + 2 to equal 3", () => {
  expect(sum(1, 2)).toBe(3);
});

//----
test("two plus two is four", () => {
  expect(2 + 2).toBe(4);
});
