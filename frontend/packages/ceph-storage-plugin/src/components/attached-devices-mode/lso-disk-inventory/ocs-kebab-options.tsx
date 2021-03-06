import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { TableData } from '@console/internal/components/factory';
import { KebabOption, Kebab } from '@console/internal/components/utils';
import { diskReplacementModal } from './disk-replacement-modal';
import { OCSDiskList, OCSColumnStateAction } from './state-reducer';

export const OCSKebabOptions: React.FC<OCSKebabOptionsProps> = React.memo(
  ({ diskName, alertsMap, replacementMap, isRebalancing, dispatch }) => {
    const { t } = useTranslation();

    const kebabOptions: KebabOption[] = [
      {
        // t('ceph-storage-plugin~Start Disk Replacement')
        labelKey: t('ceph-storage-plugin~Start Disk Replacement'),
        callback: () =>
          diskReplacementModal({
            diskName,
            alertsMap,
            replacementMap,
            isRebalancing,
            dispatch,
          }),
      },
    ];

    return (
      <TableData className={Kebab.columnClass}>
        {/* Enables the options for the disk with failures */}
        <Kebab options={kebabOptions} isDisabled={!alertsMap[diskName]} />
      </TableData>
    );
  },
);

type OCSKebabOptionsProps = {
  diskName: string;
  alertsMap: OCSDiskList;
  replacementMap: OCSDiskList;
  isRebalancing: boolean;
  dispatch: React.Dispatch<OCSColumnStateAction>;
};
