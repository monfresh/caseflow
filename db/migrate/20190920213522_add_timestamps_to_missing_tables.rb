class AddTimestampsToMissingTables < ActiveRecord::Migration[5.1]
  def change
    add_column :api_keys, :created_at, :datetime
    add_column :api_keys, :updated_at, :datetime
    add_column :api_views, :updated_at, :datetime
    add_column :appeal_series, :created_at, :datetime
    add_column :appeal_series, :updated_at, :datetime
    add_column :appeals, :created_at, :datetime
    add_column :appeals, :updated_at, :datetime
    add_column :board_grant_effectuations, :created_at, :datetime
    add_column :board_grant_effectuations, :updated_at, :datetime
    add_column :cached_appeal_attributes, :created_at, :datetime
    add_column :cached_appeal_attributes, :updated_at, :datetime
    add_column :certification_cancellations, :created_at, :datetime
    add_column :certification_cancellations, :updated_at, :datetime
    add_column :claimants, :created_at, :datetime
    add_column :claimants, :updated_at, :datetime
    add_column :claims_folder_searches, :updated_at, :datetime
    add_column :decision_issues, :updated_at, :datetime
    add_column :distributed_cases, :created_at, :datetime
    add_column :distributed_cases, :updated_at, :datetime
    add_column :docket_tracers, :created_at, :datetime
    add_column :docket_tracers, :updated_at, :datetime
    add_column :document_views, :created_at, :datetime
    add_column :document_views, :updated_at, :datetime
    add_column :documents, :created_at, :datetime
    add_column :documents, :updated_at, :datetime
    add_column :documents_tags, :created_at, :datetime
    add_column :documents_tags, :updated_at, :datetime
    add_column :end_product_establishments, :created_at, :datetime
    add_column :end_product_establishments, :updated_at, :datetime
    add_column :hearing_appeal_stream_snapshots, :updated_at, :datetime
    add_column :hearing_issue_notes, :created_at, :datetime
    add_column :hearing_issue_notes, :updated_at, :datetime
    add_column :hearing_task_associations, :created_at, :datetime
    add_column :hearing_task_associations, :updated_at, :datetime
    add_column :higher_level_reviews, :created_at, :datetime
    add_column :higher_level_reviews, :updated_at, :datetime
    add_column :intakes, :created_at, :datetime
    add_column :intakes, :updated_at, :datetime
    add_column :legacy_appeals, :created_at, :datetime
    add_column :legacy_appeals, :updated_at, :datetime
    add_column :organizations, :created_at, :datetime
    add_column :organizations, :updated_at, :datetime
    add_column :ramp_closed_appeals, :created_at, :datetime
    add_column :ramp_closed_appeals, :updated_at, :datetime
    add_column :ramp_elections, :created_at, :datetime
    add_column :ramp_elections, :updated_at, :datetime
    add_column :ramp_issues, :created_at, :datetime
    add_column :ramp_issues, :updated_at, :datetime
    add_column :ramp_refilings, :created_at, :datetime
    add_column :ramp_refilings, :updated_at, :datetime
    add_column :record_synced_by_jobs, :created_at, :datetime
    add_column :record_synced_by_jobs, :updated_at, :datetime
    add_column :special_issue_lists, :created_at, :datetime
    add_column :special_issue_lists, :updated_at, :datetime
    add_column :supplemental_claims, :created_at, :datetime
    add_column :supplemental_claims, :updated_at, :datetime
    add_column :transcriptions, :created_at, :datetime
    add_column :transcriptions, :updated_at, :datetime
    add_column :veterans, :created_at, :datetime
    add_column :veterans, :updated_at, :datetime
    add_column :worksheet_issues, :created_at, :datetime
    add_column :worksheet_issues, :updated_at, :datetime
  end
end
