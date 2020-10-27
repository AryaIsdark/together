import React from 'react';
import useWindowResize from './useWindowResize';
import { render, cleanup } from '@testing-library/react';

interface Props {
  callback: Function;
}

const FooComponent = ({ callback }: Props) => {
  useWindowResize(callback);

  return <div>Hello, World!</div>;
};

describe('useWindowResize', () => {
  afterEach(cleanup);

  it('should execute a callback when window is resized', () => {
    const fooFun = jest.fn();
    render(<FooComponent callback={fooFun} />);

    expect(fooFun).not.toHaveBeenCalled();

    window.dispatchEvent(new Event('resize'));

    expect(fooFun).toHaveBeenCalled();
  });

  it('should NOT execute a callback after the component has unmounted', () => {
    const fooFun = jest.fn();
    const { unmount } = render(<FooComponent callback={fooFun} />);

    window.dispatchEvent(new Event('resize'));

    unmount();

    window.dispatchEvent(new Event('resize'));

    expect(fooFun).toHaveBeenCalledTimes(1);
  });
});
