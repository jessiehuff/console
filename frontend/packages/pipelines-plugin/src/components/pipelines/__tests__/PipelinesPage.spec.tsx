import * as React from 'react';
import { shallow } from 'enzyme';
import { referenceForModel } from '@console/internal/module/k8s';
import CreateProjectListPage from '@console/dev-console/src/components/projects/CreateProjectListPage';
import { PipelineModel } from '../../../models';
import { PipelinesPage } from '../PipelinesPage';
import PipelinesResourceList from '../PipelinesResourceList';

jest.mock('react-i18next', () => {
  const reactI18next = require.requireActual('react-i18next');
  return {
    ...reactI18next,
    useTranslation: () => ({ t: (key) => key }),
  };
});

describe('Pipeline List', () => {
  it('Should render a PipelineResourcelist', () => {
    const pipelinePageProps: React.ComponentProps<typeof PipelinesPage> = {
      history: null,
      location: null,
      match: {
        isExact: true,
        path: `/k8s/ns/:ns/${referenceForModel(PipelineModel)}`,
        url: 'k8s/ns/my-project/tekton.dev~v1alpha1~Pipeline',
        params: {
          ns: 'my-project',
        },
      },
    };
    const pipelineWrapperNS = shallow(<PipelinesPage {...pipelinePageProps} />);
    expect(pipelineWrapperNS.find(PipelinesResourceList).exists()).toBe(true);
  });

  it('Should render ProjecListPage when no namespace is selected', () => {
    const pipelinePagePropsWNS: React.ComponentProps<typeof PipelinesPage> = {
      history: null,
      location: null,
      match: {
        isExact: true,
        path: `/k8s/ns/:ns/${referenceForModel(PipelineModel)}`,
        url: 'k8s/ns/all-projects/tekton.dev~v1alpha1~Pipeline',
        params: {
          ns: undefined,
        },
      },
    };
    const pipelineWrapperWNS = shallow(<PipelinesPage {...pipelinePagePropsWNS} />);
    expect(pipelineWrapperWNS.find(CreateProjectListPage).exists()).toBe(true);
  });
});
