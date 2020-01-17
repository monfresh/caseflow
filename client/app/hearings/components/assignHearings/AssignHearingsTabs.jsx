import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import React from 'react';
import _ from 'lodash';
import moment from 'moment';

import { getIndexOfDocketLine, docketCutoffLineStyle } from './AssignHearingsDocketLine';
import { getQueryParams } from '../../../util/QueryParamsUtil';
import AssignHearingsTable from './AssignHearingsTable';
import QUEUE_CONFIG, {
  LEGACY_ASSIGN_HEARINGS_TAB_NAME
} from '../../../../constants/QUEUE_CONFIG.json';
import TabWindow from '../../../components/TabWindow';
import UpcomingHearingsTable from './UpcomingHearingsTable';

// Gets the tab index based off the tab parameter in the query string.
// The indexes are based on the ordering of the tabs in the AssignHearingsTabs component.
const getCurrentTabIndex = () => {
  const tabParam = getQueryParams(window.location.search)[QUEUE_CONFIG.TAB_NAME_REQUEST_PARAM];

  if (tabParam === LEGACY_ASSIGN_HEARINGS_TAB_NAME) {
    return 1;
  } else if (tabParam === QUEUE_CONFIG.AMA_ASSIGN_HEARINGS_TAB_NAME) {
    return 2;
  }

  return 0;
};

export class AssignHearingsTabs extends React.PureComponent {

  amaDocketCutoffLineStyle = (appeals) => {
    const endOfNextMonth = moment().add(1, 'months').
      endOf('month');
    const indexOfLine = getIndexOfDocketLine(appeals, endOfNextMonth);

    return docketCutoffLineStyle(indexOfLine, endOfNextMonth.format('MMMM YYYY'));
  }

  render() {
    const {
      selectedHearingDay,
      selectedRegionalOffice,
      displayPowerOfAttorneyColumn,
      room,
      defaultTabIndex
    } = this.props;

    const hearingsForSelected = _.get(selectedHearingDay, 'hearings', {});
    const availableSlots = _.get(selectedHearingDay, 'totalSlots', 0) - Object.keys(hearingsForSelected).length;

    // Remove when pagination lands (#11757)
    return (
      <div className="usa-width-three-fourths">
        {!_.isNil(selectedHearingDay) &&
          <h1>
            {`${moment(selectedHearingDay.scheduledFor).format('ddd M/DD/YYYY')}
              ${room} (${availableSlots} slots remaining)`}
          </h1>
        }
        <TabWindow
          name="scheduledHearings-tabwindow"
          defaultPage={defaultTabIndex}
          tabs={[
            {
              label: 'Scheduled Veterans',
              page: <UpcomingHearingsTable
                selectRegionalOffice={selectedRegionalOffice}
                selectedHearingDay={selectedHearingDay}
                hearings={hearingsForSelected}
              />
            },
            {
              label: 'Legacy Veterans Waiting',
              page: <AssignHearingsTable
                selectedHearingDay={selectedHearingDay}
                selectedRegionalOffice={selectedRegionalOffice}
                displayPowerOfAttorneyColumn={displayPowerOfAttorneyColumn}
                tabName={QUEUE_CONFIG.LEGACY_ASSIGN_HEARINGS_TAB_NAME}
                key={QUEUE_CONFIG.LEGACY_ASSIGN_HEARINGS_TAB_NAME}
              />
            },
            {
              label: 'AMA Veterans Waiting',
              page: <AssignHearingsTable
                selectedHearingDay={selectedHearingDay}
                selectedRegionalOffice={selectedRegionalOffice}
                displayPowerOfAttorneyColumn={displayPowerOfAttorneyColumn}
                tabName={QUEUE_CONFIG.AMA_ASSIGN_HEARINGS_TAB_NAME}
                key={QUEUE_CONFIG.AMA_ASSIGN_HEARINGS_TAB_NAME}
              />
            }
          ]}
        />
      </div>
    );
  }
}

AssignHearingsTabs.propTypes = {
  defaultTabIndex: PropTypes.number,
  selectedHearingDay: PropTypes.shape({
    hearings: PropTypes.object,
    id: PropTypes.number,
    regionalOffice: PropTypes.string,
    regionalOfficeKey: PropTypes.string,
    requestType: PropTypes.string,
    room: PropTypes.string,
    scheduledFor: PropTypes.string,
    totalSlots: PropTypes.number
  }),
  selectedRegionalOffice: PropTypes.string,
  room: PropTypes.string,
  // Appeal ID => Attorney Name Array
  powerOfAttorneyNamesForAppeals: PropTypes.objectOf(PropTypes.string),
  // Remove when pagination lands (#11757)
  displayPowerOfAttorneyColumn: PropTypes.bool
};

AssignHearingsTabs.defaultProps = {
  defaultTabIndex: getCurrentTabIndex(),
  powerOfAttorneyNamesForAppeals: {}
};

const mapStateToProps = (state) => {
  const powerOfAttorneyNamesForAppeals = _.mapValues(
    _.get(state, 'queue.appealDetails', {}),
    (val) => _.get(val, 'powerOfAttorney.representative_name')
  );

  return { powerOfAttorneyNamesForAppeals };
};

export default connect(mapStateToProps)(AssignHearingsTabs);
