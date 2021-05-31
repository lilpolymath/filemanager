import React from 'react';
import { render, screen } from '../utils/test-utils';

import FileContent from './FileContent';

describe('FileContent Component', () => {
  it('should render defaults', () => {
    const { container } = render(
      <FileContent />
    );
    expect(container.firstChild).toMatchSnapshot();
  });
});
