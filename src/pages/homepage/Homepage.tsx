
import { ToolbarsOfDetails } from '../../shared/components';
import { BaseLayoutOfPage } from '../../shared/layouts';

export const Homepage  = () => {
  return (
    <BaseLayoutOfPage title="home page" toolbars={(<ToolbarsOfDetails />)}>
      Test
    </BaseLayoutOfPage>

  );
};
