# frozen_string_literal: true

class JudgeLegacyDecisionReviewTask < JudgeLegacyTask
  def review_action
    if Constants::DECASS_WORK_PRODUCT_TYPES["OMO_REQUEST"].include?(work_product)
      Constants.TASK_ACTIONS.ASSIGN_OMO.to_h
    else
      Constants.TASK_ACTIONS.JUDGE_LEGACY_CHECKOUT.to_h
    end
  end

  def available_actions(current_user, role)
    #return [] if current_user != assigned_to || !current_user.judge_in_vacols?
    return [] if role != "judge" || current_user != assigned_to


    actions = [
      Constants.TASK_ACTIONS.ADD_ADMIN_ACTION.to_h,
      review_action
    ]

    if appeal.notice_of_death_date
      actions << Constants.TASK_ACTIONS.DEATH_DISMISSAL.to_h
    end

    actions
  end

  def label
    COPY::JUDGE_DECISION_REVIEW_TASK_LABEL
  end
end
