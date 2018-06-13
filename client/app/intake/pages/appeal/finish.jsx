import React from 'react';
import { connect } from 'react-redux';
import Button from '../../../components/Button';
import CancelButton from '../../components/CancelButton';
import { RatedIssuesUnconnected, RatedIssueCounter } from '../../components/RatedIssues';
import NonRatedIssues from './nonRatedIssues';
import { Redirect } from 'react-router-dom';
import { setIssueSelected } from '../../actions/common';
import { completeIntake } from '../../actions/ama';
import { bindActionCreators } from 'redux';
import { REQUEST_STATE, PAGE_PATHS, INTAKE_STATES } from '../../constants';
import { getIntakeStatus } from '../../selectors';
import CompleteIntakeErrorAlert from '../../components/CompleteIntakeErrorAlert';

class Finish extends React.PureComponent {
  render() {
    const {
      appeal,
      veteranName,
      requestState,
      completeIntakeErrorCode,
      completeIntakeErrorData
    } = this.props;

    switch (appeal) {
    case INTAKE_STATES.NONE:
      return <Redirect to={PAGE_PATHS.BEGIN} />;
    case INTAKE_STATES.STARTED:
      return <Redirect to={PAGE_PATHS.REVIEW} />;
    case INTAKE_STATES.COMPLETED:
      return <Redirect to={PAGE_PATHS.COMPLETED} />;
    default:
    }

    return <div>
      <h1>Identify issues on { veteranName }'s Notice of Disagreement (VA Form 10182)</h1>

      <p>
        Please select all the issues that best match the Veteran's request on the form.
        The list below includes issues claimed by the Veteran in the last year.
        If you are unable to find one or more issues, enter these in the "other issues" section.
      </p>

      <RatedIssues />
      <NonRatedIssues />

      { requestState === REQUEST_STATE.FAILED &&
        <CompleteIntakeErrorAlert
          completeIntakeErrorCode={completeIntakeErrorCode}
          completeIntakeErrorData={completeIntakeErrorData} />
      }

    </div>;
  }
}

const RatedIssues = connect(
  ({ appeal, intake }) => ({
    intakeId: intake.id,
    reviewState: appeal
  }),
  (dispatch) => bindActionCreators({
    setIssueSelected
  }, dispatch)
)(RatedIssuesUnconnected);

class FinishNextButton extends React.PureComponent {
  handleClick = () => {
    this.props.completeIntake(this.props.intakeId, this.props.appeal).then(
      (completeWasSuccessful) => {
        if (completeWasSuccessful) {
          this.props.history.push('/completed');
        }
      }
    );
  }

  render = () =>
    <Button
      name="finish-intake"
      onClick={this.handleClick}
      loading={this.props.requestState === REQUEST_STATE.IN_PROGRESS}
      legacyStyling={false}
      disabled={!this.props.appeal.selectedRatingCount}
    >
      Establish appeal
    </Button>;
}

const FinishNextButtonConnected = connect(
  ({ appeal, intake }) => ({
    requestState: appeal.requestStatus.completeIntake,
    intakeId: intake.id,
    appeal
  }),
  (dispatch) => bindActionCreators({
    completeIntake
  }, dispatch)
)(FinishNextButton);

const RatedIssueCounterConnected = connect(
  ({ appeal }) => ({
    selectedRatingCount: appeal.selectedRatingCount
  })
)(RatedIssueCounter);

export class FinishButtons extends React.PureComponent {
  render = () =>
    <div>
      <CancelButton />
      <FinishNextButtonConnected history={this.props.history} />
      <RatedIssueCounterConnected />
    </div>
}

export default connect(
  (state) => ({
    veteranName: state.intake.veteran.name,
    appealStatus: getIntakeStatus(state),
    requestState: state.appeal.requestStatus.completeIntake,
    completeIntakeErrorCode: state.appeal.requestStatus.completeIntakeErrorCode,
    completeIntakeErrorData: state.appeal.requestStatus.completeIntakeErrorData
  })
)(Finish);
