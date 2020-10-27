import React from 'react';
import useWindowKey from './useWindowKey';
import { render, fireEvent, cleanup } from '@testing-library/react';

const keys = {
  CORRECT_KEY: 'Escape',
  INCORRECT_KEY: 'Enter',
};

const COMPONENT_STRING = 'Hello, World!';

interface Props {
  callback: (event: KeyboardEvent) => void;
}

const FooComponent = ({ callback }: Props) => {
  useWindowKey(keys.CORRECT_KEY, callback);

  return <div>{COMPONENT_STRING}</div>;
};

describe('useWindowKey', () => {
  afterEach(cleanup);

  it('should execute a callback when correct key is pressed', () => {
    const fooFun = jest.fn();
    const { getByText } = render(<FooComponent callback={fooFun} />);
    const el = getByText(COMPONENT_STRING);

    expect(fooFun).not.toHaveBeenCalled();

    fireEvent.keyDown(el, { key: keys.CORRECT_KEY });

    expect(fooFun).toHaveBeenCalled();
  });

  it('should NOT execute a callback when incorrect key is pressed', () => {
    const fooFun = jest.fn();
    const { getByText } = render(<FooComponent callback={fooFun} />);
    const el = getByText(COMPONENT_STRING);

    fireEvent.keyDown(el, { key: keys.INCORRECT_KEY });

    expect(fooFun).not.toHaveBeenCalled();
  });

  it('should NOT execute a callback after the component has unmounted', () => {
    const fooFun = jest.fn();
    const { getByText, unmount } = render(<FooComponent callback={fooFun} />);
    const el = getByText(COMPONENT_STRING);

    fireEvent.keyDown(el, { key: keys.CORRECT_KEY });
    fireEvent.keyDown(el, { key: keys.CORRECT_KEY });
    fireEvent.keyDown(el, { key: keys.CORRECT_KEY });

    unmount();

    fireEvent.keyDown(el, { key: keys.CORRECT_KEY });

    expect(fooFun).toHaveBeenCalledTimes(3);
  });
});
