import React, { useState, useCallback } from 'react';
import { mount } from 'enzyme';
import useWhenVisible from './useWhenVisible';

describe('utility/useWhenVisible', () => {
  let observeMock: jest.Mock;
  let unobserveMock: jest.Mock;

  const Component = ({ callback }: { callback: () => void }) => {
    const [el, setEl] = useState(null);
    const setElRef = useCallback((node) => {
      if (node !== null) {
        setEl(node);
      }
    }, []);

    useWhenVisible(el, callback);

    return <div ref={setElRef} />;
  };

  beforeEach(() => {
    observeMock = jest.fn();
    unobserveMock = jest.fn();

    window.IntersectionObserver = class {
      observe = observeMock;
      unobserve = unobserveMock;

      constructor(
        callback: ([{ isIntersecting }]: { isIntersecting: boolean }[]) => void,
      ) {
        callback([{ isIntersecting: true }]);
      }
    };
  });

  afterEach(() => {
    delete window.IntersectionObserver;
  });

  it('can subcribe to an IntersectionObserver', async () => {
    mount(<Component callback={() => {}} />);

    expect(observeMock).toHaveBeenCalled();
    expect(unobserveMock).not.toHaveBeenCalled();
  });

  it('can unsubcribe to an IntersectionObserver', () => {
    const wrapper = mount(<Component callback={() => {}} />);

    wrapper.unmount();

    expect(observeMock).toHaveBeenCalled();
    expect(unobserveMock).toHaveBeenCalled();
  });

  it('can call the callback', () => {
    const callback = jest.fn();

    mount(<Component callback={callback} />);

    expect(callback).toHaveBeenCalled();
  });

  it('does nothing if not given a DOM element', () => {
    const OtherComponent = () => {
      useWhenVisible(null, () => {});

      return <div />;
    };

    mount(<OtherComponent />);

    expect(observeMock).not.toHaveBeenCalled();
  });
});
