import expect from 'expect';
import { items } from 'reducers/items';

const initialState = {
  items: [],
};

describe('Items reducer:', () => {
  it('should return the initial state', () => {
    expect(
      items(undefined, {})
    ).toEqual(initialState);
  });

  const stateAfterAdd = {
    items: [{
      text: 'test',
      numb: 1,
    }],
  };

  it('should handle ADD', () => {
    expect(
      items(initialState, {
        type: 'ADD',
        text: 'test',
      })
    ).toEqual(stateAfterAdd);
  });

  it('should handle DELETE', () => {
    expect(
      items(initialState, {
        type: 'DELETE',
      })
    ).toEqual(initialState);
  });
});

