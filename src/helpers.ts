import { pascalCase } from "pascal-case";
import { computed } from "vue";

const mutationFactory = (properties: unknown[]) =>
  properties
    .map((property) => ({
      [`set${pascalCase(property)}`](
        state: { [x: string]: any },
        payload: unknown
      ): void {
        state[property] = payload;
      },
    }))
    .reduce((x, y) => ({ ...x, ...y }));

export const mapAppState = (
  items: unknown[],
  store: { state: { [x: string]: unknown } }
) => {
  return items.reduce(
    (accumulator, currentValue) => ({
      ...accumulator,
      ...{
        [currentValue]: computed(() => store.state[currentValue]),
      },
    }),
    {}
  );
};

export const mapAppGetters = (
  items: any[],
  store: { getters: { [x: string]: any } }
) => {
  return items.reduce(
    (accumulator, currentValue) => ({
      ...accumulator,
      ...{
        [currentValue]: computed(() => store.getters[currentValue]),
      },
    }),
    {}
  );
};

export const mapAppMutations = (
  items: any[],
  store: { commit: (arg0: any, arg1: any) => any }
) => {
  return items.reduce(
    (accumulator, currentValue) => ({
      ...accumulator,
      ...{
        [currentValue]: (payload: any) => store.commit(currentValue, payload),
      },
    }),
    {}
  );
};

export function updateSelectedFont(value: any) {
  document.querySelector("#selectedFontStyle")?.remove();
  const newStyle = document.createElement("style");
  const fontStyle = document.createTextNode(`* { font-family: ${value} }`);
  newStyle.appendChild(fontStyle);
  newStyle.setAttribute("id", "selectedFontStyle");
  document.head.appendChild(newStyle);
}

export default mutationFactory;
